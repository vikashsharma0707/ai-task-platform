# Architecture — AI Task Processing Platform

## 1. System Architecture Overview

```
User Browser
     │
     │ HTTPS
     ▼
┌─────────────────────────────────────────────────────┐
│  Nginx Ingress Controller (k8s)                     │
│  /         → frontend service (React SPA)           │
│  /api/*    → backend service (Express REST API)     │
└──────────┬──────────────────────────┬───────────────┘
           │                          │
           ▼                          ▼
┌──────────────────┐       ┌──────────────────────────┐
│  Frontend (React)│       │  Backend (Node/Express)   │
│  Nginx:8080      │       │  Port 5000                │
│  - SPA routing   │       │  - JWT auth               │
│  - Static assets │       │  - REST /api/tasks        │
└──────────────────┘       │  - BullMQ producer        │
                           └──────────┬────────────────┘
                                      │
                      ┌───────────────┴──────────────┐
                      │                              │
                      ▼                              ▼
           ┌──────────────────┐         ┌────────────────────┐
           │  Redis (Queue)   │         │  MongoDB           │
           │  BullMQ queues   │         │  Users + Tasks     │
           │  AOF persistence │         │  Indexes on userId │
           └────────┬─────────┘         │  status, createdAt │
                    │                   └────────────────────┘
                    │ brpoplpush                   ▲
                    ▼                              │ PyMongo direct write
           ┌──────────────────┐                   │
           │  Python Worker   │───────────────────┘
           │  (RQ consumer)   │
           │  HPA: 2–10 pods  │
           │  Operations:     │
           │  uppercase       │
           │  lowercase       │
           │  reverse_string  │
           │  word_count      │
           └──────────────────┘
```

## 2. Worker Scaling Strategy

The Python worker Deployment is governed by a HorizontalPodAutoscaler (HPA):

- **minReplicas: 2** — always-on redundancy
- **maxReplicas: 10** (staging: 3, production: 10)
- **Scale trigger:** CPU utilization ≥ 70% or memory ≥ 80%

Each worker pod runs a blocking `BRPOPLPUSH` loop, atomically moving jobs from the `wait` list to the `active` list. This prevents duplicate processing across pods. When CPU spikes (burst of tasks queued), the HPA adds pods within ~30 seconds.

For custom Redis-queue-length-based scaling, a KEDA `RedisStreamScaler` or a Prometheus-backed HPA can be layered in without changing the worker code.

## 3. 100,000 Tasks/Day Throughput Strategy

**Math:** 100k tasks/day ≈ 1.16 tasks/second average. Redis + Python worker handles this with a single pod. Peak burst (10× average) requires ~12 tasks/second.

**Strategy:**
| Layer | Approach |
|---|---|
| Queue | Redis BRPOPLPUSH — sub-millisecond enqueue, durable with AOF |
| Worker concurrency | Each pod runs a single-threaded loop; scale to 8–10 pods for 100+ tasks/second |
| MongoDB writes | Bulk-write logs at job end (not per-log-entry) for write reduction |
| Indexes | Compound index `{userId, createdAt: -1}` for dashboard queries; `{userId, status}` for status filters |
| Sharding (future) | MongoDB sharded on `userId` for > 10M documents |

## 4. MongoDB Indexing Strategy

```js
// Applied in Task model (Mongoose)
taskSchema.index({ userId: 1, status: 1 });        // filter by user + status
taskSchema.index({ userId: 1, createdAt: -1 });    // dashboard listing (most recent)

// User model
userSchema.index({ email: 1 }, { unique: true });  // login lookup
```

Explain plans should be verified for the primary query:
`db.tasks.find({ userId: <id> }).sort({ createdAt: -1 }).limit(50)`

## 5. Redis Failure Handling

| Scenario | Mitigation |
|---|---|
| Redis restart | AOF persistence (`appendonly yes`) + RDB snapshot (`save 60 1`) |
| Worker crash mid-job | `BRPOPLPUSH` moves job to `active` list; a recovery job re-queues items stuck in `active` > N minutes |
| Redis pod failure | Kubernetes restart policy; PVC preserves AOF log |
| Network partition | BullMQ `maxRetriesPerRequest: null` + exponential backoff (3 attempts, 2s initial) |
| Dead-letter | BullMQ moves exhausted jobs to `failed` sorted set; visible in BullBoard UI |

## 6. Staging vs Production Deployment Strategy

| Parameter | Staging | Production |
|---|---|---|
| Frontend replicas | 1 | 3 (RollingUpdate, maxUnavailable=0) |
| Backend replicas | 1 | 3 (RollingUpdate, maxUnavailable=0) |
| Worker HPA min/max | 1 / 3 | 2 / 10 |
| Backend CPU limit | 500m | 1000m |
| Backend memory limit | 256Mi | 512Mi |
| Log level | debug | warn |
| Rollout strategy | Recreate (faster iteration) | RollingUpdate (zero-downtime) |
| Argo CD sync | Auto (prune + selfHeal) | Auto (prune + selfHeal + retry 5×) |

**GitOps flow:** CI pushes new image tag → updates `overlays/*/kustomization.yaml` in infra repo → Argo CD detects diff within 3 minutes → applies manifests → Kubernetes performs rolling update.
