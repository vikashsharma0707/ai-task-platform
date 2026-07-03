import { Queue } from 'bullmq';
import { getRedisClient } from '../config/redis.js';

let taskQueue;

export function getTaskQueue() {
  if (!taskQueue) {
    taskQueue = new Queue('tasks', {
      connection: getRedisClient(),
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: 100,
        removeOnFail: 50,
      },
    });
  }
  return taskQueue;
}

export async function addTaskToQueue(taskId) {
  const queue = getTaskQueue();
  await queue.add('process-task', { taskId }, { jobId: taskId });
}
