// import { TaskCreateForm } from '../components/tasks/TaskCreateForm';

// export function NewTaskPage() {
//   return (
//     <div className="page-container">
//       <div className="max-w-2xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
//           <p className="text-gray-500 text-sm mt-1">Configure and submit a new AI text processing task</p>
//         </div>
//         <div className="card p-6">
//           <TaskCreateForm />
//         </div>
//       </div>
//     </div>
//   );
// }






import { TaskCreateForm } from '../components/tasks/TaskCreateForm';

export function NewTaskPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] px-6 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Create New Task</h1>
          <p className="mt-1 text-sm text-slate-400">Configure and submit a new AI text processing task</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
          <TaskCreateForm />
        </div>
      </div>
    </div>
  );
}