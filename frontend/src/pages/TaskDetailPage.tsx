import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { taskService, type Task } from '../services/taskService';
import { TaskDetail } from '../components/tasks/TaskDetail';

export function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTask = useCallback(async () => {
    if (!id) return;
    try {
      const data = await taskService.getTask(id);
      setTask(data);
    } catch {
      setError('Task not found');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTask();
    // Poll while task is running
    const interval = setInterval(async () => {
      if (!id) return;
      try {
        const data = await taskService.getTask(id);
        setTask(data);
        if (data.status === 'success' || data.status === 'failed') {
          clearInterval(interval);
        }
      } catch { /* ignore poll errors */ }
    }, 2000);
    return () => clearInterval(interval);
  }, [id, fetchTask]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="page-container">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error || 'Task not found'}</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <TaskDetail task={task} onUpdate={setTask} />
    </div>
  );
}
