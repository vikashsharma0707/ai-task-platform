// // import mongoose from 'mongoose';
// // import { logger } from '../utils/logger.js';

// // export async function connectDB() {
// //   const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-task-platform';
// //   await mongoose.connect(uri);
// //   logger.info('MongoDB connected');
// // }


// import mongoose from "mongoose";
// import { logger } from "../utils/logger.js";

// export async function connectDB() {

//  const uri =
//   process.env.MONGO_URI ||
//   process.env.MONGODB_URI ||
//   "mongodb://mongodb:27017/aitask"

//   await mongoose.connect(uri);

//   logger.info("MongoDB Connected");
// }



import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export async function connectDB() {
  const uri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    "mongodb://mongodb:27017/aitask";

  await mongoose.connect(uri);

  logger.info("MongoDB Connected");
}