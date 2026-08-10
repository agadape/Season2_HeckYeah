import Link from 'next/link';
import { Home, Search, BookOpen, Calendar, FileText, Settings, User, Scale, Flame } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, active: true },
  { name: 'Scholarships', href: '/scholarships', icon: Search },
  { name: 'Applications', href: '/applications', icon: BookOpen },
  { name: 'Deadlines', href: '/calendar', icon: Calendar },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Compare', href: '/compare', icon: Scale },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="w-[260px] h-full flex flex-col relative rounded-[2rem] bg-white/[0.01] border border-white/5 backdrop-blur-xl px-4 py-8 shadow-2xl">
      <div className="mb-10 px-2 flex items-center space-x-3">
        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-500 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg ring-1 ring-white/20">
            <Flame size={20} className="text-white fill-white/20" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">MasterTracker</h1>
          <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-semibold">Vision 2027</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 relative z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                item.active 
                  ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
              )}
              <Icon size={18} className={`transition-transform duration-300 ${item.active ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-medium text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center space-x-3 px-2">
           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0a0a0f] border border-white/10 flex items-center justify-center">
                 <User size={16} className="text-emerald-400" />
              </div>
           </div>
           <div>
              <p className="text-sm font-medium text-slate-200">Indonesian</p>
              <p className="text-xs text-slate-500">IS Major</p>
           </div>
        </div>
      </div>
    </div>
  );
}
