import { Link } from 'react-router-dom';
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
    <Link
      to={`/dashboard/tasks/${task._id}`}
      className="card p-5 hover:shadow-md transition-shadow duration-200 block group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <TaskStatusBadge status={task.status} />
            <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
              {operationLabels[task.operation] ?? task.operation}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {task.title}
          </h3>
          <p className="text-sm text-gray-500 truncate mt-1">{task.inputText}</p>
          {task.result && (
            <p className="text-sm text-green-700 truncate mt-1 font-mono bg-green-50 px-2 py-0.5 rounded">
              {task.result}
            </p>
          )}
          <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
            <Calendar size={12} />
            <span>{new Date(task.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-400 flex-shrink-0 mt-1 transition-colors" />
      </div>
    </Link>
  );
}
