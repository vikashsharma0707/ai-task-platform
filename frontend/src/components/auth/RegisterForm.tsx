// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { Mail, Lock, User, Eye, EyeOff, Cpu } from 'lucide-react';

// export function RegisterForm() {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password.length < 8) {
//       setError('Password must be at least 8 characters');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     try {
//       await register(name, email, password);
//       navigate('/dashboard');
//     } catch (err: unknown) {
//       const msg = err instanceof Error ? err.message : 'Registration failed';
//       setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
//             <Cpu size={28} className="text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-white">AI Task Platform</h1>
//           <p className="text-slate-400 mt-1 text-sm">Create your account to get started</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">Create account</h2>

//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="label">Full name</label>
//               <div className="relative">
//                 <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="input-field pl-9"
//                   placeholder="Jane Smith"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="label">Email address</label>
//               <div className="relative">
//                 <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="input-field pl-9"
//                   placeholder="you@example.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="label">Password <span className="text-gray-400 font-normal">(min 8 chars)</span></label>
//               <div className="relative">
//                 <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="input-field pl-9 pr-9"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 mt-2">
//               {loading ? 'Creating account...' : 'Create account'}
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-600 mt-6">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Cpu,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  Moon,
  Sun,
} from 'lucide-react';
import { AuthHero } from './AuthHero';
import { PasswordStrength } from './PasswordStrength';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);

  const emailTouched = email.length > 0;
  const emailValid = EMAIL_RE.test(email);
  const confirmTouched = confirmPassword.length > 0;
  const confirmMatches = confirmPassword === password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Existing validation, unchanged:
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    // Additional client-side UX checks (do not touch the register() call itself):
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreed) {
      setError('Please accept the Terms & Conditions to continue');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0B1220]">
        <AuthHero />

        <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[40%] lg:px-10">
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] transition-colors hover:bg-[#F9FAFB] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-[430px]"
          >
            <div className="mb-8 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20"
              >
                <Cpu size={22} className="text-white" />
              </motion.div>
              <h1 className="text-lg font-semibold text-[#111827] dark:text-white">AI Task Platform</h1>
            </div>

            <div className="rounded-[24px] border border-[#E5E7EB] bg-white/80 p-8 shadow-[0_8px_30px_rgba(16,24,40,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
              <h2 className="text-xl font-semibold tracking-tight text-[#111827] dark:text-white">
                Create account
              </h2>
              <p className="mt-1 text-sm text-[#6B7280] dark:text-slate-400">
                Create your AI Platform account.
              </p>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 flex items-start gap-2.5 overflow-hidden rounded-xl border border-red-100 border-l-4 border-l-red-500 bg-red-50 px-3.5 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400"
                  >
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-slate-300">
                    Full name
                  </label>
                  <div className="relative">
                    <User size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                      id="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Smith"
                      className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-10 pr-3.5 text-sm text-[#111827] outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-slate-300">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={emailTouched && !emailValid}
                      className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-10 pr-9 text-sm text-[#111827] outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                    {emailTouched && emailValid && (
                      <CheckCircle2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#10B981]" />
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-10 pr-10 text-sm text-[#111827] outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-600/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition-colors hover:text-[#6B7280]"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={showPassword ? 'off' : 'on'}
                          initial={{ opacity: 0, rotate: -45 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 45 }}
                          transition={{ duration: 0.15 }}
                          className="flex"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                  </div>
                  <PasswordStrength password={password} />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-slate-300">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      aria-invalid={confirmTouched && !confirmMatches}
                      className={`h-11 w-full rounded-xl border bg-white pl-10 pr-10 text-sm text-[#111827] outline-none transition-all placeholder:text-[#9CA3AF] focus:ring-4 dark:bg-white/5 dark:text-white ${
                        confirmTouched && !confirmMatches
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-[#E5E7EB] focus:border-[#2563EB] focus:ring-blue-600/10 dark:border-white/10'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition-colors hover:text-[#6B7280]"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {confirmTouched && !confirmMatches && (
                    <p className="mt-1.5 text-xs text-red-600">Passwords do not match</p>
                  )}
                </div>

                <label className="flex select-none items-start gap-2 text-sm text-[#6B7280] dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" className="font-medium text-[#2563EB] hover:text-[#1D4ED8]">
                      Terms &amp; Conditions
                    </Link>
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    'Create account'
                  )}
                </motion.button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#E5E7EB] dark:bg-white/10" />
                <span className="text-xs text-[#9CA3AF]">OR</span>
                <div className="h-px flex-1 bg-[#E5E7EB] dark:bg-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.87z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.09A12 12 0 0 0 12 24z" />
                    <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.63H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.37z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.63l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-[#6B7280] dark:text-slate-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-[#2563EB] hover:text-[#1D4ED8]">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[#9CA3AF] dark:text-slate-500">
              <ShieldCheck size={13} />
              Protected with JWT &amp; bcrypt
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}