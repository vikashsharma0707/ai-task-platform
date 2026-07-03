import { TaskCreateForm } from '../components/tasks/TaskCreateForm';

export function NewTaskPage() {
  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
          <p className="text-gray-500 text-sm mt-1">Configure and submit a new AI text processing task</p>
        </div>
        <div className="card p-6">
          <TaskCreateForm />
        </div>
      </div>
    </div>
  );
}
