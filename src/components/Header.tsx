import { Search } from "lucide-react";

export default function Header({ email }: { email: string }) {
  const initial = (email[0] ?? '?').toUpperCase();
  return (
    <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search scholarships, documents..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div title={email} className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-medium text-sm">
          {initial}
        </div>
      </div>
    </header>
  );
}
