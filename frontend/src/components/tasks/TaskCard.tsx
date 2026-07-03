// import { Link } from 'react-router-dom';
// import type { Task } from '../../services/taskService';
// import { TaskStatusBadge } from './TaskStatusBadge';
// import { ChevronRight, Calendar } from 'lucide-react';

// const operationLabels: Record<string, string> = {
//   uppercase: 'Uppercase',
//   lowercase: 'Lowercase',
//   reverse_string: 'Reverse String',
//   word_count: 'Word Count',
// };

// export function TaskCard({ task }: { task: Task }) {
//   return (
//     <Link
//       to={`/dashboard/tasks/${task._id}`}
//       className="card p-5 hover:shadow-md transition-shadow duration-200 block group"
//     >
//       <div className="flex items-start justify-between gap-4">
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-2">
//             <TaskStatusBadge status={task.status} />
//             <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
//               {operationLabels[task.operation] ?? task.operation}
//             </span>
//           </div>
//           <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
//             {task.title}
//           </h3>
//           <p className="text-sm text-gray-500 truncate mt-1">{task.inputText}</p>
//           {task.result && (
//             <p className="text-sm text-green-700 truncate mt-1 font-mono bg-green-50 px-2 py-0.5 rounded">
//               {task.result}
//             </p>
//           )}
//           <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
//             <Calendar size={12} />
//             <span>{new Date(task.createdAt).toLocaleString()}</span>
//           </div>
//         </div>
//         <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-400 flex-shrink-0 mt-1 transition-colors" />
//       </div>
//     </Link>
//   );
// }



import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Task } from '../../services/taskService';
import { TaskStatusBadge } from './TaskStatusBadge';
import { ChevronRight, Calendar } from 'lucide-react';

const operationLabels: Record<string, string> = {
  uppercase: 'Uppercase',
  lowercase: 'Lowercase',
  reverse_string: 'Reverse String',
  word_count: 'Word Count',
};

export function TaskCard({ task }: { task: Task }) {
  return (
    <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
      <Link
        to={`/dashboard/tasks/${task._id}`}
        className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.05] hover:border-white/20"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <TaskStatusBadge status={task.status} />
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-400">
                {operationLabels[task.operation] ?? task.operation}
              </span>
            </div>
            <h3 className="truncate font-semibold text-white transition-colors group-hover:text-blue-400">
              {task.title}
            </h3>
            <p className="mt-1 truncate text-sm text-slate-400">{task.inputText}</p>
            {task.result && (
              <p className="mt-1 truncate rounded-lg bg-emerald-500/10 px-2 py-0.5 font-mono text-sm text-emerald-400">
                {task.result}
              </p>
            )}
            <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={12} />
              <span>{new Date(task.createdAt).toLocaleString()}</span>
            </div>
          </div>
          <ChevronRight
            size={18}
            className="mt-1 flex-shrink-0 text-slate-600 transition-colors group-hover:text-blue-400"
          />
        </div>
      </Link>
    </motion.div>
  );
}