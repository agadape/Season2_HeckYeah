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
    <div className="w-[280px] h-full flex flex-col relative rounded-[2.5rem] bg-white/50 border border-white/80 backdrop-blur-2xl px-6 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
      <div className="mb-12 px-2 flex items-center space-x-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-400 rounded-2xl blur-md opacity-40 group-hover:opacity-80 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-indigo-500 to-purple-500 w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-md ring-2 ring-white">
            <Flame size={24} className="text-white fill-white/20" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight">MasterTracker</h1>
          <p className="text-[11px] uppercase tracking-widest text-indigo-500 font-bold">Vision 2027</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 relative z-10">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                item.active 
                  ? 'bg-white/80 text-indigo-700 shadow-sm border border-white/80' 
                  : 'text-slate-500 hover:text-indigo-600 hover:bg-white/40'
              }`}
            >
              {item.active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.4)]"></div>
              )}
              <Icon size={20} className={`transition-transform duration-300 ${item.active ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-semibold text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-200/50">
        <div className="flex items-center space-x-4 px-2">
           <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-200 to-indigo-200 p-[3px] shadow-sm">
              <div className="w-full h-full rounded-full bg-white border border-white/50 flex items-center justify-center">
                 <User size={20} className="text-slate-700" />
              </div>
           </div>
           <div>
              <p className="text-base font-bold text-slate-800">Anya Chen</p>
              <p className="text-xs font-semibold text-slate-500">Free Plan</p>
           </div>
        </div>
      </div>
    </div>
  );
}
