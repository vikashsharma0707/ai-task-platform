import express from 'express';
import { createTask, getTasks, getTask, runTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/:id/run', runTask);
router.delete('/:id', deleteTask);

export default router;
