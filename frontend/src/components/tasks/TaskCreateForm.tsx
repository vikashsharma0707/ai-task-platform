// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { taskService, type CreateTaskPayload, type TaskOperation } from '../../services/taskService';
// import { Type, ArrowDown, RotateCcw, Hash } from 'lucide-react';

// const operations: { value: TaskOperation; label: string; description: string; icon: React.ReactNode }[] = [
//   { value: 'uppercase', label: 'Uppercase', description: 'Convert all text to UPPERCASE', icon: <Type size={18} /> },
//   { value: 'lowercase', label: 'Lowercase', description: 'Convert all text to lowercase', icon: <ArrowDown size={18} /> },
//   { value: 'reverse_string', label: 'Reverse String', description: 'Reverse the entire string', icon: <RotateCcw size={18} /> },
//   { value: 'word_count', label: 'Word Count', description: 'Count total words in text', icon: <Hash size={18} /> },
// ];

// export function TaskCreateForm() {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState('');
//   const [inputText, setInputText] = useState('');
//   const [operation, setOperation] = useState<TaskOperation>('uppercase');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim() || !inputText.trim()) {
//       setError('Title and input text are required');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     try {
//       const payload: CreateTaskPayload = { title: title.trim(), inputText: inputText.trim(), operation };
//       const task = await taskService.createTask(payload);
//       navigate(`/dashboard/tasks/${task._id}`);
//     } catch (err: unknown) {
//       setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to create task');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {error && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
//       )}

//       <div>
//         <label className="label">Task Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="input-field"
//           placeholder="e.g. Process customer feedback"
//           maxLength={100}
//           required
//         />
//       </div>

//       <div>
//         <label className="label">Input Text</label>
//         <textarea
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           rows={5}
//           className="input-field resize-none"
//           placeholder="Enter the text you want to process..."
//           required
//         />
//         <p className="mt-1 text-xs text-gray-500">{inputText.length} characters</p>
//       </div>

//       <div>
//         <label className="label">Operation</label>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           {operations.map((op) => (
//             <button
//               key={op.value}
//               type="button"
//               onClick={() => setOperation(op.value)}
//               className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
//                 operation === op.value
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 hover:border-gray-300 bg-white'
//               }`}
//             >
//               <span className={operation === op.value ? 'text-blue-600' : 'text-gray-400'}>{op.icon}</span>
//               <div>
//                 <p className={`font-medium text-sm ${operation === op.value ? 'text-blue-700' : 'text-gray-900'}`}>
//                   {op.label}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-0.5">{op.description}</p>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex gap-3 pt-2">
//         <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary flex-1">
//           Cancel
//         </button>
//         <button type="submit" disabled={loading} className="btn-primary flex-1">
//           {loading ? 'Creating...' : 'Create Task'}
//         </button>
//       </div>
//     </form>
//   );
// }



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { taskService, type CreateTaskPayload, type TaskOperation } from '../../services/taskService';
import { Type, ArrowDown, RotateCcw, Hash, AlertCircle, Loader2 } from 'lucide-react';

const operations: { value: TaskOperation; label: string; description: string; icon: React.ReactNode }[] = [
  { value: 'uppercase', label: 'Uppercase', description: 'Convert all text to UPPERCASE', icon: <Type size={18} /> },
  { value: 'lowercase', label: 'Lowercase', description: 'Convert all text to lowercase', icon: <ArrowDown size={18} /> },
  { value: 'reverse_string', label: 'Reverse String', description: 'Reverse the entire string', icon: <RotateCcw size={18} /> },
  { value: 'word_count', label: 'Word Count', description: 'Count total words in text', icon: <Hash size={18} /> },
];

export function TaskCreateForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [operation, setOperation] = useState<TaskOperation>('uppercase');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !inputText.trim()) {
      setError('Title and input text are required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload: CreateTaskPayload = { title: title.trim(), inputText: inputText.trim(), operation };
      const task = await taskService.createTask(payload);
      navigate(`/dashboard/tasks/${task._id}`);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          placeholder="e.g. Process customer feedback"
          maxLength={100}
          required
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Input Text</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={5}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          placeholder="Enter the text you want to process..."
          required
        />
        <p className="mt-1 text-xs text-slate-500">{inputText.length} characters</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">Operation</label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {operations.map((op) => (
            <button
              key={op.value}
              type="button"
              onClick={() => setOperation(op.value)}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                operation === op.value
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <span className={operation === op.value ? 'text-blue-400' : 'text-slate-500'}>{op.icon}</span>
              <div>
                <p className={`text-sm font-medium ${operation === op.value ? 'text-blue-300' : 'text-white'}`}>
                  {op.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{op.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10"
        >
          Cancel
        </button>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.99 }}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/30 transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? 'Creating...' : 'Create Task'}
        </motion.button>
      </div>
    </form>
  );
}