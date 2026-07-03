// import { createClient } from 'ioredis';
// import { logger } from '../utils/logger.js';

// let redisClient;

// export function getRedisClient() {
//   if (!redisClient) {
//     redisClient = new createClient({
//       host: process.env.REDIS_HOST || 'localhost',
//       port: parseInt(process.env.REDIS_PORT || '6379'),
//       password: process.env.REDIS_PASSWORD || undefined,
//       maxRetriesPerRequest: null,
//     });
//     redisClient.on('connect', () => logger.info('Redis connected'));
//     redisClient.on('error', (err) => logger.error('Redis error', { err: err.message }));
//   }
//   return redisClient;
// }




import Redis from 'ioredis';
import { logger } from '../utils/logger.js';

let redisClient;

export function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: null,        // BullMQ ke liye zaroori
      enableReadyCheck: true,
    });

    redisClient.on('connect', () => {
      logger.info('✅ Redis connected successfully');
    });

    redisClient.on('error', (err) => {
      logger.error('❌ Redis error', { message: err.message });
    });

    redisClient.on('ready', () => {
      logger.info('Redis client is ready');
    });
  }
  return redisClient;
}

// Optional: Graceful shutdown ke liye
export async function closeRedisConnection() {
  if (redisClient) {
    await redisClient.quit();
    logger.info('Redis connection closed');
  }
}