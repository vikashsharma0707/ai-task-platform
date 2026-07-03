// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { getRedisClient } from './config/redis.js';
// import { logger } from './utils/logger.js';

// // Load environment variables
// dotenv.config();

// const app = express();

// // ====================== CORS CONFIGURATION ======================
// const corsOptions = {
//   origin: '*',                    // Sab origins allow (development ke liye)
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: [
//     'Content-Type',
//     'Authorization',
//     'X-Requested-With',
//     'Accept',
//     'Origin'
//   ],
//   exposedHeaders: ['Content-Length', 'Authorization']
// };

// app.use(cors(corsOptions));
// // ============================================================

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Health Check
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'AI Task Platform Backend is running' });
// });

// // API Routes
// app.use('/api/auth', authRoutes);      // ← apne routes import karo
// app.use('/api/tasks', taskRoutes);
// app.use('/api', otherRoutes);          // baaki routes

// // 404 Handler
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'Route not found' });
// });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   logger.error('Unhandled error:', err);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error'
//   });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     // Redis Connection
//     const redis = getRedisClient();
//     await redis.ping();
//     logger.info('Redis connected');

//     app.listen(PORT, () => {
//       logger.info(`🚀 Server running on http://localhost:${PORT}`);
//       logger.info(`📍 CORS enabled for all origins`);
//     });
//   } catch (error) {
//     logger.error('Failed to start server:', error);
//     process.exit(1);
//   }
// };

// startServer();

// // Graceful Shutdown
// process.on('SIGTERM', () => {
//   logger.info('SIGTERM received, shutting down gracefully');
//   process.exit(0);
// });




import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(helmet());

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;