import Link from 'next/link';
import { Home, Search, BookOpen, Calendar, FileText, Settings, User, Scale } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
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
    <div className="w-64 bg-slate-950 text-slate-100 flex flex-col h-screen p-4 border-r border-slate-800">
      <div className="mb-8 px-4 flex items-center space-x-2">
        <div className="bg-indigo-500 w-8 h-8 rounded flex items-center justify-center font-bold">
          S2
        </div>
        <h1 className="text-xl font-bold tracking-tight">MasterTracker</h1>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium text-slate-300 hover:text-white"
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-4 py-4 text-xs text-slate-500">
        MVP v1.0
      </div>
    </div>
  );
}
