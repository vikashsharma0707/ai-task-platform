// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { Cpu, LogOut, LayoutDashboard, Plus } from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth';

// export function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center gap-8">
//             <Link to="/dashboard" className="flex items-center gap-2 text-blue-600 font-bold text-lg">
//               <Cpu size={22} />
//               <span>AI Task Platform</span>
//             </Link>
//             <div className="hidden sm:flex items-center gap-1">
//               <Link
//                 to="/dashboard"
//                 className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   isActive('/dashboard')
//                     ? 'bg-blue-50 text-blue-700'
//                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
//                 }`}
//               >
//                 <LayoutDashboard size={16} />
//                 Dashboard
//               </Link>
//               <Link
//                 to="/dashboard/new"
//                 className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   isActive('/dashboard/new')
//                     ? 'bg-blue-50 text-blue-700'
//                     : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
//                 }`}
//               >
//                 <Plus size={16} />
//                 New Task
//               </Link>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="hidden sm:flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
//                 {user?.name?.[0]?.toUpperCase() ?? 'U'}
//               </div>
//               <span className="text-sm text-gray-700 font-medium">{user?.name}</span>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//             >
//               <LogOut size={16} />
//               <span className="hidden sm:inline">Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }





import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Cpu, LogOut, LayoutDashboard, Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1220]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm shadow-blue-600/30">
                <Cpu size={16} className="text-white" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-white">AI Task Platform</span>
            </Link>

            <div className="hidden items-center gap-1 sm:flex">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <Link
                to="/dashboard/new"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/dashboard/new')
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Plus size={16} />
                New Task
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="hidden items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3.5 sm:flex">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-semibold text-white">
                {user?.name?.[0]?.toUpperCase() ?? 'U'}
              </div>
              <span className="text-sm font-medium text-slate-200">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}