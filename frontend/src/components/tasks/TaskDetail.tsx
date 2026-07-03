// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import type { Task } from '../../services/taskService';
// import { taskService } from '../../services/taskService';
// import { TaskStatusBadge } from './TaskStatusBadge';
// import { Play, Trash2, ArrowLeft, Clock, Terminal } from 'lucide-react';

// const operationLabels: Record<string, string> = {
//   uppercase: 'Uppercase',
//   lowercase: 'Lowercase',
//   reverse_string: 'Reverse String',
//   word_count: 'Word Count',
// };

// export function TaskDetail({ task, onUpdate }: { task: Task; onUpdate: (t: Task) => void }) {
//   const navigate = useNavigate();
//   const [runLoading, setRunLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleRun = async () => {
//     setError('');
//     setRunLoading(true);
//     try {
//       const updated = await taskService.runTask(task._id);
//       onUpdate(updated);
//     } catch (err: unknown) {
//       setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to run task');
//     } finally {
//       setRunLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete this task?')) return;
//     setDeleteLoading(true);
//     try {
//       await taskService.deleteTask(task._id);
//       navigate('/dashboard');
//     } catch {
//       setError('Failed to delete task');
//       setDeleteLoading(false);
//     }
//   };

//   const canRun = task.status === 'pending' || task.status === 'failed';

//   return (
//     <div className="space-y-6">
//       <button
//         onClick={() => navigate('/dashboard')}
//         className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
//       >
//         <ArrowLeft size={16} /> Back to Dashboard
//       </button>

//       {error && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
//       )}

//       <div className="card p-6">
//         <div className="flex items-start justify-between gap-4 flex-wrap">
//           <div>
//             <div className="flex items-center gap-3 mb-2">
//               <TaskStatusBadge status={task.status} />
//               <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
//                 {operationLabels[task.operation] ?? task.operation}
//               </span>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
//             <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
//               <Clock size={13} />
//               Created {new Date(task.createdAt).toLocaleString()}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             {canRun && (
//               <button
//                 onClick={handleRun}
//                 disabled={runLoading}
//                 className="btn-primary flex items-center gap-2"
//               >
//                 <Play size={16} />
//                 {runLoading ? 'Queuing...' : 'Run Task'}
//               </button>
//             )}
//             <button
//               onClick={handleDelete}
//               disabled={deleteLoading}
//               className="btn-danger flex items-center gap-2"
//             >
//               <Trash2 size={16} />
//               {deleteLoading ? 'Deleting...' : 'Delete'}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="card p-6">
//           <h2 className="font-semibold text-gray-900 mb-3">Input Text</h2>
//           <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono max-h-60 overflow-auto">
//             {task.inputText}
//           </pre>
//         </div>

//         <div className="card p-6">
//           <h2 className="font-semibold text-gray-900 mb-3">Result</h2>
//           {task.result ? (
//             <pre className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800 whitespace-pre-wrap font-mono max-h-60 overflow-auto">
//               {task.result}
//             </pre>
//           ) : (
//             <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-20 flex items-center justify-center">
//               <p className="text-sm text-gray-400 italic">
//                 {task.status === 'running' ? 'Processing...' : 'Run the task to see results'}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="card p-6">
//         <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//           <Terminal size={16} className="text-gray-500" />
//           Execution Logs
//         </h2>
//         {task.logs.length === 0 ? (
//           <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-500 font-mono">
//             No logs yet. Run the task to see execution logs.
//           </div>
//         ) : (
//           <div className="bg-gray-900 rounded-lg p-4 space-y-1 max-h-80 overflow-auto">
//             {task.logs.map((log, i) => (
//               <div key={i} className="flex gap-3 font-mono text-xs">
//                 <span className="text-gray-500 flex-shrink-0">
//                   {new Date(log.timestamp).toLocaleTimeString()}
//                 </span>
//                 <span className="text-green-400">{log.message}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task } from '../../services/taskService';
import { taskService } from '../../services/taskService';
import { TaskStatusBadge } from './TaskStatusBadge';
import { Play, Trash2, ArrowLeft, Clock, Terminal, AlertCircle, Loader2 } from 'lucide-react';

const operationLabels: Record<string, string> = {
  uppercase: 'Uppercase',
  lowercase: 'Lowercase',
  reverse_string: 'Reverse String',
  word_count: 'Word Count',
};

export function TaskDetail({ task, onUpdate }: { task: Task; onUpdate: (t: Task) => void }) {
  const navigate = useNavigate();
  const [runLoading, setRunLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    setError('');
    setRunLoading(true);
    try {
      const updated = await taskService.runTask(task._id);
      onUpdate(updated);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to run task');
    } finally {
      setRunLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    setDeleteLoading(true);
    try {
      await taskService.deleteTask(task._id);
      navigate('/dashboard');
    } catch {
      setError('Failed to delete task');
      setDeleteLoading(false);
    }
  };

  const canRun = task.status === 'pending' || task.status === 'failed';

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-200"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2.5 overflow-hidden rounded-xl border border-red-900/40 border-l-4 border-l-red-500 bg-red-950/30 px-4 py-3 text-sm text-red-400"
          >
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <TaskStatusBadge status={task.status} />
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-400">
                {operationLabels[task.operation] ?? task.operation}
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">{task.title}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <Clock size={13} />
              Created {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {canRun && (
              <button
                onClick={handleRun}
                disabled={runLoading}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/30 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {runLoading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                {runLoading ? 'Queuing…' : 'Run Task'}
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="flex items-center gap-2 rounded-lg border border-red-900/40 bg-red-500/10 px-3.5 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 size={16} />
              {deleteLoading ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="mb-3 font-semibold text-white">Input Text</h2>
          <pre className="max-h-60 overflow-auto whitespace-pre-wrap rounded-lg border border-white/10 bg-black/20 p-4 font-mono text-sm text-slate-300">
            {task.inputText}
          </pre>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
          <h2 className="mb-3 font-semibold text-white">Result</h2>
          {task.result ? (
            <pre className="max-h-60 overflow-auto whitespace-pre-wrap rounded-lg border border-emerald-900/40 bg-emerald-500/10 p-4 font-mono text-sm text-emerald-400">
              {task.result}
            </pre>
          ) : (
            <div className="flex h-20 items-center justify-center rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-sm italic text-slate-500">
                {task.status === 'running' ? 'Processing…' : 'Run the task to see results'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
        <h2 className="mb-3 flex items-center gap-2 font-semibold text-white">
          <Terminal size={16} className="text-slate-400" />
          Execution Logs
        </h2>
        {task.logs.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-sm text-slate-500">
            No logs yet. Run the task to see execution logs.
          </div>
        ) : (
          <div className="max-h-80 space-y-1 overflow-auto rounded-lg border border-white/10 bg-black/30 p-4">
            {task.logs.map((log, i) => (
              <div key={i} className="flex gap-3 font-mono text-xs">
                <span className="flex-shrink-0 text-slate-500">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-emerald-400">{log.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}