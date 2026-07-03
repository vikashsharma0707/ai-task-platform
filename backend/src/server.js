// import 'dotenv/config';
// import { connectDB } from './config/db.js';
// import { logger } from './utils/logger.js';
// import app from './app.js';

// const PORT = process.env.PORT || 5000;

// async function start() {
//   await connectDB();
//   app.listen(PORT, () => {
//     logger.info(`Backend running on port ${PORT}`);
//   });
// }

// start().catch((err) => {
//   logger.error('Failed to start server', { err: err.message });
//   process.exit(1);
// });





// import dotenv from 'dotenv';
// dotenv.config();

// import app from './app.js';

// import mongoose from 'mongoose';
// import { getRedisClient } from './config/redis.js';
// import { logger } from './utils/logger.js';

// const PORT = process.env.PORT || 5000;

// async function start() {
//     try {

//         await mongoose.connect(process.env.MONGO_URI);

//         logger.info("MongoDB connected");

//         const redis = getRedisClient();
//         await redis.ping();

//         logger.info("Redis connected");

//         app.listen(PORT, () => {
//             logger.info(`Backend running on port ${PORT}`);
//         });

//     } catch (err) {
//         logger.error(err);
//         process.exit(1);
//     }
// }

// start();






import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { getRedisClient } from "./config/redis.js";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    // MongoDB
    await connectDB();

    // Redis
    const redis = getRedisClient();
    await redis.ping();
    logger.info("Redis connected");

    // Start server
    app.listen(PORT, () => {
      logger.info(`Backend running on port ${PORT}`);
    });

  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

start();