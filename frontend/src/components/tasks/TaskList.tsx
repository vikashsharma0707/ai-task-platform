import { TaskCard } from './TaskCard';
import type { Task } from '../../services/taskService';
import { ClipboardList } from 'lucide-react';

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-2xl mb-4">
          <ClipboardList size={24} className="text-gray-400" />
        </div>
        <h3 className="text-gray-900 font-semibold">No tasks yet</h3>
        <p className="text-gray-500 text-sm mt-1">Create your first task to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
