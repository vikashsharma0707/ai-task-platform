// // import { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { taskService, type Task } from '../services/taskService';
// // import { TaskList } from '../components/tasks/TaskList';
// // import { Plus, RefreshCw, CheckCircle, Clock, AlertCircle, Loader } from 'lucide-react';

// // export function DashboardPage() {
// //   const [tasks, setTasks] = useState<Task[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   const fetchTasks = async () => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const data = await taskService.getTasks();
// //       setTasks(data);
// //     } catch {
// //       setError('Failed to load tasks');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { fetchTasks(); }, []);

// //   const stats = {
// //     total: tasks.length,
// //     success: tasks.filter((t) => t.status === 'success').length,
// //     pending: tasks.filter((t) => t.status === 'pending').length,
// //     failed: tasks.filter((t) => t.status === 'failed').length,
// //   };

// //   return (
// //     <div className="page-container">
// //       <div className="flex items-center justify-between mb-8">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
// //           <p className="text-gray-500 text-sm mt-1">Manage and monitor your AI processing tasks for ci cid</p>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <button onClick={fetchTasks} className="btn-secondary flex items-center gap-2">
// //             <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
// //             Refresh
// //           </button>
// //           <Link to="/dashboard/new" className="btn-primary flex items-center gap-2">
// //             <Plus size={16} />
// //             New Task
// //           </Link>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
// //         {[
// //           { label: 'Total Tasks', value: stats.total, icon: <Loader size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
// //           { label: 'Successful', value: stats.success, icon: <CheckCircle size={20} />, color: 'text-green-600', bg: 'bg-green-50' },
// //           { label: 'Pending', value: stats.pending, icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
// //           { label: 'Failed', value: stats.failed, icon: <AlertCircle size={20} />, color: 'text-red-600', bg: 'bg-red-50' },
// //         ].map((stat) => (
// //           <div key={stat.label} className="card p-5">
// //             <div className={`inline-flex p-2 rounded-lg ${stat.bg} ${stat.color} mb-3`}>{stat.icon}</div>
// //             <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
// //             <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {error && (
// //         <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
// //       )}

// //       {loading ? (
// //         <div className="flex justify-center py-16">
// //           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
// //         </div>
// //       ) : (
// //         <TaskList tasks={tasks} />
// //       )}
// //     </div>
// //   );
// // }








// import { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { taskService, type Task } from '../services/taskService';
// import { TaskList } from '../components/tasks/TaskList';
// import {
//   Plus,
//   RefreshCw,
//   CheckCircle2,
//   Clock,
//   AlertCircle,
//   ListChecks,
//   TrendingUp,
//   TrendingDown,
//   Sparkles,
// } from 'lucide-react';

// // ---------------------------------------------------------------------------
// // Design tokens (kept local so this page owns its visual system without
// // touching global Tailwind config). Matches the brief exactly:
// // bg #FAFAFB, cards #FFFFFF, border #E5E7EB, text #111827 / #6B7280,
// // primary #2563EB, success #10B981, warning #F59E0B, danger #EF4444.
// // ---------------------------------------------------------------------------

// type StatTone = 'blue' | 'emerald' | 'amber' | 'red';

// const TONE_STYLES: Record<StatTone, { icon: string; ring: string; bar: string }> = {
//   blue: { icon: 'bg-blue-50 text-blue-600', ring: 'ring-blue-100', bar: 'bg-blue-500' },
//   emerald: { icon: 'bg-emerald-50 text-emerald-600', ring: 'ring-emerald-100', bar: 'bg-emerald-500' },
//   amber: { icon: 'bg-amber-50 text-amber-600', ring: 'ring-amber-100', bar: 'bg-amber-500' },
//   red: { icon: 'bg-red-50 text-red-600', ring: 'ring-red-100', bar: 'bg-red-500' },
// };

// function StatCard({
//   label,
//   value,
//   hint,
//   icon,
//   tone,
//   percent,
// }: {
//   label: string;
//   value: number | string;
//   hint: string;
//   icon: React.ReactNode;
//   tone: StatTone;
//   percent: number;
// }) {
//   const styles = TONE_STYLES[tone];
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -2 }}
//       transition={{ duration: 0.2 }}
//       className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(16,24,40,0.06)]"
//     >
//       <div className="flex items-start justify-between">
//         <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ring-4 ${styles.icon} ${styles.ring}`}>
//           {icon}
//         </div>
//       </div>

//       <p className="mt-4 text-[26px] font-semibold leading-none tracking-tight text-[#111827]">
//         {value}
//       </p>
//       <p className="mt-1.5 text-sm text-[#6B7280]">{label}</p>

//       <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#F3F4F6]">
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
//           transition={{ duration: 0.6, ease: 'easeOut' }}
//           className={`h-full rounded-full ${styles.bar}`}
//         />
//       </div>
//       <p className="mt-2 text-xs text-[#9CA3AF]">{hint}</p>
//     </motion.div>
//   );
// }

// function SkeletonCard() {
//   return (
//     <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
//       <div className="h-9 w-9 animate-pulse rounded-xl bg-[#F3F4F6]" />
//       <div className="mt-4 h-6 w-16 animate-pulse rounded bg-[#F3F4F6]" />
//       <div className="mt-2 h-3 w-24 animate-pulse rounded bg-[#F3F4F6]" />
//       <div className="mt-4 h-1.5 w-full animate-pulse rounded-full bg-[#F3F4F6]" />
//     </div>
//   );
// }

// function SkeletonRow() {
//   return (
//     <div className="flex items-center gap-4 border-b border-[#F3F4F6] px-5 py-4">
//       <div className="h-3 w-1/4 animate-pulse rounded bg-[#F3F4F6]" />
//       <div className="h-3 w-1/6 animate-pulse rounded bg-[#F3F4F6]" />
//       <div className="h-3 w-1/6 animate-pulse rounded bg-[#F3F4F6]" />
//       <div className="ml-auto h-5 w-16 animate-pulse rounded-full bg-[#F3F4F6]" />
//     </div>
//   );
// }

// export function DashboardPage() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState('');

//   const fetchTasks = async (isRefresh = false) => {
//     if (isRefresh) setRefreshing(true);
//     else setLoading(true);
//     setError('');
//     try {
//       const data = await taskService.getTasks();
//       setTasks(data);
//     } catch {
//       setError('Failed to load tasks. Try refreshing.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Derived stats — computed only from fields the original page already
//   // relied on (task.status), so no assumptions are made about fields
//   // (operation, queue position, timestamps) that may not exist on Task yet.
//   const stats = useMemo(() => {
//     const total = tasks.length;
//     const success = tasks.filter((t) => t.status === 'success').length;
//     const pending = tasks.filter((t) => t.status === 'pending').length;
//     const failed = tasks.filter((t) => t.status === 'failed').length;
//     const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
//     return { total, success, pending, failed, successRate };
//   }, [tasks]);

//   return (
//     <div className="min-h-screen bg-[#FAFAFB]">
//       <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-8 md:py-10">
//         {/* Header */}
//         <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">AI Task Dashboard</h1>
//             <p className="mt-1 text-sm text-[#6B7280]">
//               Monitor, process and manage asynchronous AI tasks in real time.
//             </p>
//           </div>
//           <div className="flex items-center gap-2.5">
//             <button
//               onClick={() => fetchTasks(true)}
//               disabled={refreshing}
//               aria-label="Refresh tasks"
//               className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2 text-sm font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#F9FAFB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 disabled:opacity-60"
//             >
//               <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
//               Refresh
//             </button>
//             <Link
//               to="/dashboard/new"
//               className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
//             >
//               <Plus size={15} />
//               New Task
//             </Link>
//           </div>
//         </div>

//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -4 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-6 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
//           >
//             <AlertCircle size={16} />
//             {error}
//           </motion.div>
//         )}

//         {/* KPI cards */}
//         <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
//           {loading ? (
//             Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
//           ) : (
//             <>
//               <StatCard
//                 label="Total Tasks"
//                 value={stats.total}
//                 hint="All tasks submitted"
//                 icon={<ListChecks size={18} />}
//                 tone="blue"
//                 percent={100}
//               />
//               <StatCard
//                 label="Completed"
//                 value={stats.success}
//                 hint={`${stats.successRate}% success rate`}
//                 icon={<CheckCircle2 size={18} />}
//                 tone="emerald"
//                 percent={stats.successRate}
//               />
//               <StatCard
//                 label="Pending"
//                 value={stats.pending}
//                 hint="Waiting to process"
//                 icon={<Clock size={18} />}
//                 tone="amber"
//                 percent={stats.total ? (stats.pending / stats.total) * 100 : 0}
//               />
//               <StatCard
//                 label="Failed"
//                 value={stats.failed}
//                 hint="Needs attention"
//                 icon={<AlertCircle size={18} />}
//                 tone="red"
//                 percent={stats.total ? (stats.failed / stats.total) * 100 : 0}
//               />
//             </>
//           )}
//         </div>

//         {/* Success rate strip */}
//         {!loading && stats.total > 0 && (
//           <div className="mb-8 flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4">
//             <div className="flex items-center gap-3">
//               <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                 <TrendingUp size={17} />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-[#111827]">
//                   {stats.successRate}% of tasks completed successfully
//                 </p>
//                 <p className="text-xs text-[#6B7280]">Based on {stats.total} total tasks</p>
//               </div>
//             </div>
//             {stats.failed > 0 && (
//               <div className="flex items-center gap-1.5 text-xs font-medium text-red-600">
//                 <TrendingDown size={14} />
//                 {stats.failed} failed
//               </div>
//             )}
//           </div>
//         )}

//         {/* Task list */}
//         <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
//           <div className="flex items-center justify-between border-b border-[#F3F4F6] px-5 py-4">
//             <h2 className="text-sm font-semibold text-[#111827]">Tasks</h2>
//             <span className="text-xs text-[#9CA3AF]">
//               {loading ? 'Loading…' : `${stats.total} total`}
//             </span>
//           </div>

//           <AnimatePresence mode="wait">
//             {loading ? (
//               <motion.div key="skeleton" exit={{ opacity: 0 }}>
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <SkeletonRow key={i} />
//                 ))}
//               </motion.div>
//             ) : stats.total === 0 ? (
//               <motion.div
//                 key="empty"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex flex-col items-center justify-center px-6 py-16 text-center"
//               >
//                 <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
//                   <Sparkles size={22} />
//                 </div>
//                 <h3 className="text-base font-semibold text-[#111827]">No AI tasks yet</h3>
//                 <p className="mt-1 max-w-sm text-sm text-[#6B7280]">
//                   Create your first AI processing task to begin.
//                 </p>
//                 <Link
//                   to="/dashboard/new"
//                   className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1D4ED8]"
//                 >
//                   <Plus size={15} />
//                   New Task
//                 </Link>
//               </motion.div>
//             ) : (
//               <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2">
//                 <TaskList tasks={tasks} />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { taskService, type Task } from '../services/taskService';
import { TaskList } from '../components/tasks/TaskList';
import {
  Plus,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  ListChecks,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Dark premium design tokens — same visual language as the auth pages
// (deep navy #0B1220, glass cards, subtle grid + glow). Kept local so this
// page owns its visual system without touching global Tailwind config.
// ---------------------------------------------------------------------------

type StatTone = 'blue' | 'emerald' | 'amber' | 'red';

const TONE_STYLES: Record<StatTone, { icon: string; bar: string; glow: string }> = {
  blue: { icon: 'bg-blue-500/10 text-blue-400', bar: 'bg-blue-500', glow: 'shadow-blue-500/10' },
  emerald: { icon: 'bg-emerald-500/10 text-emerald-400', bar: 'bg-emerald-500', glow: 'shadow-emerald-500/10' },
  amber: { icon: 'bg-amber-500/10 text-amber-400', bar: 'bg-amber-500', glow: 'shadow-amber-500/10' },
  red: { icon: 'bg-red-500/10 text-red-400', bar: 'bg-red-500', glow: 'shadow-red-500/10' },
};

function StatCard({
  label,
  value,
  hint,
  icon,
  tone,
  percent,
}: {
  label: string;
  value: number | string;
  hint: string;
  icon: React.ReactNode;
  tone: StatTone;
  percent: number;
}) {
  const styles = TONE_STYLES[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-shadow hover:shadow-lg ${styles.glow}`}
    >
      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${styles.icon}`}>
        {icon}
      </div>

      <p className="mt-4 text-[26px] font-semibold leading-none tracking-tight text-white">
        {value}
      </p>
      <p className="mt-1.5 text-sm text-slate-400">{label}</p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${styles.bar}`}
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">{hint}</p>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="h-9 w-9 animate-pulse rounded-xl bg-white/5" />
      <div className="mt-4 h-6 w-16 animate-pulse rounded bg-white/5" />
      <div className="mt-2 h-3 w-24 animate-pulse rounded bg-white/5" />
      <div className="mt-4 h-1.5 w-full animate-pulse rounded-full bg-white/5" />
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 border-b border-white/5 px-5 py-4">
      <div className="h-3 w-1/4 animate-pulse rounded bg-white/5" />
      <div className="h-3 w-1/6 animate-pulse rounded bg-white/5" />
      <div className="h-3 w-1/6 animate-pulse rounded bg-white/5" />
      <div className="ml-auto h-5 w-16 animate-pulse rounded-full bg-white/5" />
    </div>
  );
}

export function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch {
      setError('Failed to load tasks. Try refreshing.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Derived stats — computed only from fields the original page already
  // relied on (task.status), so no assumptions are made about fields
  // (operation, queue position, timestamps) that may not exist on Task yet.
  const stats = useMemo(() => {
    const total = tasks.length;
    const success = tasks.filter((t) => t.status === 'success').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const failed = tasks.filter((t) => t.status === 'failed').length;
    const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
    return { total, success, pending, failed, successRate };
  }, [tasks]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1220]">
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      {/* ambient glow */}
      <motion.div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo-500/10 blur-[130px]"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-8 md:px-8 md:py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">AI Task Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">
              Monitor, process and manage asynchronous AI tasks in real time.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchTasks(true)}
              disabled={refreshing}
              aria-label="Refresh tasks"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] disabled:opacity-60"
            >
              <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
            <Link
              to="/dashboard/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/30 transition-colors hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
            >
              <Plus size={15} />
              New Task
            </Link>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 rounded-xl border border-red-900/40 border-l-4 border-l-red-500 bg-red-950/30 px-4 py-3 text-sm text-red-400"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        {/* KPI cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <>
              <StatCard
                label="Total Tasks"
                value={stats.total}
                hint="All tasks submitted"
                icon={<ListChecks size={18} />}
                tone="blue"
                percent={100}
              />
              <StatCard
                label="Completed"
                value={stats.success}
                hint={`${stats.successRate}% success rate`}
                icon={<CheckCircle2 size={18} />}
                tone="emerald"
                percent={stats.successRate}
              />
              <StatCard
                label="Pending"
                value={stats.pending}
                hint="Waiting to process"
                icon={<Clock size={18} />}
                tone="amber"
                percent={stats.total ? (stats.pending / stats.total) * 100 : 0}
              />
              <StatCard
                label="Failed"
                value={stats.failed}
                hint="Needs attention"
                icon={<AlertCircle size={18} />}
                tone="red"
                percent={stats.total ? (stats.failed / stats.total) * 100 : 0}
              />
            </>
          )}
        </div>

        {/* Success rate strip */}
        {!loading && stats.total > 0 && (
          <div className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <TrendingUp size={17} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {stats.successRate}% of tasks completed successfully
                </p>
                <p className="text-xs text-slate-400">Based on {stats.total} total tasks</p>
              </div>
            </div>
            {stats.failed > 0 && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                <TrendingDown size={14} />
                {stats.failed} failed
              </div>
            )}
          </div>
        )}

        {/* Task list */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <h2 className="text-sm font-semibold text-white">Tasks</h2>
            <span className="text-xs text-slate-500">
              {loading ? 'Loading…' : `${stats.total} total`}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="skeleton" exit={{ opacity: 0 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </motion.div>
            ) : stats.total === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center px-6 py-16 text-center"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-base font-semibold text-white">No AI tasks yet</h3>
                <p className="mt-1 max-w-sm text-sm text-slate-400">
                  Create your first AI processing task to begin.
                </p>
                <Link
                  to="/dashboard/new"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/30 transition-colors hover:bg-blue-500"
                >
                  <Plus size={15} />
                  New Task
                </Link>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2">
                <TaskList tasks={tasks} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}