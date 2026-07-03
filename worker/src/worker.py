"""
RQ worker entry point.

BullMQ (Node.js producer) pushes jobs to Redis with the key pattern:
  bull:{queueName}:{jobId}

RQ (Python consumer) uses a simpler list-based queue. To bridge them, this
worker uses a custom RQ job that reads directly from BullMQ's sorted sets.

For simplicity in local/dev, we poll BullMQ's "wait" list via Redis directly
and dispatch to task_processor. This avoids a Celery dependency while staying
in pure Python + RQ.
"""
import time
import logging
import signal
import sys
from .redis_client import get_redis_connection
from .task_processor import process_task
from .config import QUEUE_NAME

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

_running = True


def _handle_signal(signum, _frame):
    global _running
    logger.info(f"Received signal {signum}, shutting down gracefully...")
    _running = False


signal.signal(signal.SIGTERM, _handle_signal)
signal.signal(signal.SIGINT, _handle_signal)


def run_worker():
    conn = get_redis_connection()
    wait_key = f"bull:{QUEUE_NAME}:wait"
    active_key = f"bull:{QUEUE_NAME}:active"

    logger.info(f"Worker started, listening on queue: {QUEUE_NAME}")

    while _running:
        try:
            # Move job from wait list to active list atomically
            job_id = conn.brpoplpush(wait_key, active_key, timeout=2)
            if not job_id:
                continue

            # Fetch job data from hash
            job_data_key = f"bull:{QUEUE_NAME}:{job_id}"
            task_id = conn.hget(job_data_key, "data")

            if not task_id:
                # Try to parse from JSON data field
                import json
                raw = conn.hget(job_data_key, "data")
                if raw:
                    try:
                        data = json.loads(raw)
                        task_id = data.get("taskId")
                    except Exception:
                        task_id = raw

            if not task_id:
                logger.warning(f"Job {job_id} has no taskId, skipping")
                conn.lrem(active_key, 1, job_id)
                continue

            # If task_id is JSON string
            if task_id.startswith('{'):
                import json
                try:
                    task_id = json.loads(task_id).get("taskId", task_id)
                except Exception:
                    pass

            logger.info(f"Processing job {job_id}, taskId={task_id}")
            process_task(task_id)

            # Move from active to completed
            conn.lrem(active_key, 1, job_id)
            completed_key = f"bull:{QUEUE_NAME}:completed"
            conn.zadd(completed_key, {job_id: time.time()})

        except Exception as exc:
            logger.exception(f"Worker error: {exc}")
            time.sleep(1)

    logger.info("Worker stopped")


if __name__ == "__main__":
    run_worker()
