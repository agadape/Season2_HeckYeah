import Link from 'next/link';
import { Home, Search, BookOpen, Calendar, FileText, Settings, User, Scale } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, active: true },
  { name: 'Scholarships', href: '/scholarships', icon: Search },
  { name: 'Applications', href: '/applications', icon: BookOpen },
  { name: 'Deadlines', href: '/calendar', icon: Calendar },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Compare', href: '/compare', icon: Scale },
];

const secondaryItems = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col py-6 px-4">
      <div className="mb-10 px-2 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center font-bold text-white shadow-sm">
          S2
        </div>
        <div>
          <h1 className="text-base font-semibold text-slate-900 tracking-tight">MasterTracker</h1>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <p className="px-2 text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Main Menu</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-slate-100 text-slate-900 font-medium' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
            >
              <Icon size={18} className={item.active ? "text-slate-900" : "text-slate-400"} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <nav className="space-y-1 mb-6">
          <p className="px-2 text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Preferences</p>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
              >
                <Icon size={18} className="text-slate-400" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center space-x-3 px-3 py-3 rounded-xl border border-slate-200 bg-white shadow-sm">
           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <User size={14} className="text-slate-600" />
           </div>
           <div>
              <p className="text-sm font-medium text-slate-900">Anya Chen</p>
              <p className="text-xs text-slate-500">Free Plan</p>
           </div>
        </div>
      </div>
    </div>
  );
}
