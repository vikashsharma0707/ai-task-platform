import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { taskService, type Task } from '../services/taskService';
import { TaskList } from '../components/tasks/TaskList';
import { Plus, RefreshCw, CheckCircle, Clock, AlertCircle, Loader } from 'lucide-react';

export function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const stats = {
    total: tasks.length,
    success: tasks.filter((t) => t.status === 'success').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    failed: tasks.filter((t) => t.status === 'failed').length,
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and monitor your AI processing tasks for ci cid</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchTasks} className="btn-secondary flex items-center gap-2">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <Link to="/dashboard/new" className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            New Task
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Tasks', value: stats.total, icon: <Loader size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Successful', value: stats.success, icon: <CheckCircle size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending', value: stats.pending, icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Failed', value: stats.failed, icon: <AlertCircle size={20} />, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className={`inline-flex p-2 rounded-lg ${stat.bg} ${stat.color} mb-3`}>{stat.icon}</div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
}


