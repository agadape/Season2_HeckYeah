"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, GraduationCap, FileText, Calendar, Compass, Settings, LogOut, ListChecks } from 'lucide-react';
import { logout } from '@/app/auth-actions';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutGrid },
  { name: 'Checklist', href: '/checklist', icon: ListChecks },
  { name: 'Scholarships', href: '/scholarships', icon: Compass },
  { name: 'Applications', href: '/applications', icon: GraduationCap },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-white border-r border-slate-200">
      <div className="h-14 flex items-center px-6 border-b border-slate-200">
        <span className="font-semibold text-base tracking-tight text-slate-900">MasterTracker</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-between py-4 overflow-y-auto">
        <nav className="px-3 space-y-0.5">
          {navigation.map((item) => {
            const isCurrent = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isCurrent
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-4 w-4 ${
                    isCurrent ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="px-3 mt-8">
           <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 px-3">Preferences</div>
           <nav className="space-y-0.5">
              <Link 
                href="/settings" 
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === '/settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Settings className={`mr-3 flex-shrink-0 h-4 w-4 ${pathname === '/settings' ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-500'}`} />
                Settings
              </Link>
              <form action={logout}>
                <button type="submit" className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  <LogOut className="mr-3 flex-shrink-0 h-4 w-4 text-slate-400 group-hover:text-slate-500" />
                  Log out
                </button>
              </form>
           </nav>
        </div>
      </div>
    </div>
  );
}
