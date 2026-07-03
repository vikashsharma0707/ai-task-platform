import { Task } from '../models/Task.js';
import { addTaskToQueue } from '../queues/taskQueue.js';
import { logger } from '../utils/logger.js';

export async function createTask(req, res) {
  const { title, inputText, operation } = req.body;
  if (!title || !inputText || !operation) {
    return res.status(400).json({ message: 'title, inputText and operation are required' });
  }
  const task = await Task.create({ title, inputText, operation, userId: req.user._id });
  res.status(201).json(task);
}

export async function getTasks(req, res) {
  const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 }).lean();
  res.json(tasks);
}

export async function getTask(req, res) {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
}

export async function runTask(req, res) {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (task.status === 'running') {
    return res.status(409).json({ message: 'Task is already running' });
  }

  task.status = 'pending';
  task.result = null;
  task.logs = [];
  await task.save();

  await addTaskToQueue(task._id.toString());
  logger.info('Task queued', { taskId: task._id });

  res.json(task);
}

export async function deleteTask(req, res) {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
}
