import Link from 'next/link';
import { LayoutGrid, GraduationCap, FileText, Calendar, Compass, Settings, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutGrid, current: true },
  { name: 'Scholarships', href: '/scholarships', icon: Compass, current: false },
  { name: 'Applications', href: '/applications', icon: GraduationCap, current: false },
  { name: 'Documents', href: '/documents', icon: FileText, current: false },
  { name: 'Calendar', href: '/calendar', icon: Calendar, current: false },
];

export default function Sidebar() {
  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-white border-r border-slate-200">
      <div className="h-14 flex items-center px-6 border-b border-slate-200">
        <span className="font-semibold text-base tracking-tight text-slate-900">MasterTracker</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-between py-4 overflow-y-auto">
        <nav className="px-3 space-y-0.5">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                item.current
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-4 w-4 ${
                  item.current ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-500'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="px-3 mt-8">
           <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 px-3">Preferences</div>
           <nav className="space-y-0.5">
              <Link href="/settings" className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <Settings className="mr-3 flex-shrink-0 h-4 w-4 text-slate-400 group-hover:text-slate-500" />
                Settings
              </Link>
              <button className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <LogOut className="mr-3 flex-shrink-0 h-4 w-4 text-slate-400 group-hover:text-slate-500" />
                Log out
              </button>
           </nav>
        </div>
      </div>
    </div>
  );
}
