// import { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import { taskService, type Task } from '../services/taskService';
// import { TaskDetail } from '../components/tasks/TaskDetail';

// export function TaskDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const [task, setTask] = useState<Task | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchTask = useCallback(async () => {
//     if (!id) return;
//     try {
//       const data = await taskService.getTask(id);
//       setTask(data);
//     } catch {
//       setError('Task not found');
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchTask();
//     // Poll while task is running
//     const interval = setInterval(async () => {
//       if (!id) return;
//       try {
//         const data = await taskService.getTask(id);
//         setTask(data);
//         if (data.status === 'success' || data.status === 'failed') {
//           clearInterval(interval);
//         }
//       } catch { /* ignore poll errors */ }
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [id, fetchTask]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
//       </div>
//     );
//   }

//   if (error || !task) {
//     return (
//       <div className="page-container">
//         <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error || 'Task not found'}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       <TaskDetail task={task} onUpdate={setTask} />
//     </div>
//   );
// }



import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
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
      <div className="flex min-h-screen items-center justify-center bg-[#0B1220]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-blue-500" />
          <p className="text-sm text-slate-500">Loading task…</p>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-[#0B1220] px-6 py-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center gap-2.5 rounded-xl border border-red-900/40 border-l-4 border-l-red-500 bg-red-950/30 px-4 py-3 text-sm text-red-400">
            <AlertCircle size={16} />
            {error || 'Task not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] px-6 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-[1400px]">
        <TaskDetail task={task} onUpdate={setTask} />
      </div>
    </div>
  );
}