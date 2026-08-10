import { FileText, Briefcase, BellRing, CheckCircle, GraduationCap, Flame, Target, ArrowUpRight, Zap, MapPin, Calendar, Clock, Globe } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-10 min-h-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Application Season 2027
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500">
            Welcome back, Future Master!
          </h1>
          <p className="text-slate-400 mt-3 text-lg font-light max-w-xl">
            You're tracking <strong className="text-white font-medium">47</strong> scholarships. Your next major deadline is in <strong className="text-orange-400 font-medium">21 days</strong>. Keep the momentum going!
          </p>
        </div>
        
        <button className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          <Zap size={18} className="text-indigo-600 fill-indigo-600/20" />
          <span>Discover New</span>
        </button>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* KPI 1 */}
        <BentoCard className="bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20 hover:border-indigo-500/40">
           <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
             <Briefcase size={24} />
           </div>
           <div className="text-5xl font-bold text-white mb-2 tracking-tighter">47</div>
           <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Total Scholarships</div>
        </BentoCard>

        {/* KPI 2 */}
        <BentoCard className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20 hover:border-emerald-500/40">
           <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
             <CheckCircle size={24} />
           </div>
           <div className="text-5xl font-bold text-white mb-2 tracking-tighter">21</div>
           <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Fully Funded</div>
        </BentoCard>

        {/* Action / Progress Bento - Spans 2 cols */}
        <BentoCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-between overflow-hidden relative group">
           {/* Visual Aid Decor */}
           <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] group-hover:bg-purple-500/40 transition-colors duration-700"></div>
           
           <div className="flex justify-between items-start relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Application Readiness</h3>
                <p className="text-slate-400 text-sm">Based on required documents</p>
              </div>
              <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-slate-300 backdrop-blur-md">
                 Phase 1
              </div>
           </div>

           <div className="mt-8 relative z-10">
              <div className="flex justify-between text-sm mb-2 font-medium">
                 <span className="text-purple-400">Preparation</span>
                 <span className="text-white">65%</span>
              </div>
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5 inset-shadow-sm">
                 <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[65%] rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="flex -space-x-3">
                   {['IELTS', 'CV', 'SOP'].map((doc, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-[#111] border-2 border-[#1a1a24] flex items-center justify-center text-[10px] font-bold text-slate-300 relative z-10 hover:z-20 hover:-translate-y-1 transition-transform shadow-lg">
                         {doc}
                      </div>
                   ))}
                   <div className="w-10 h-10 rounded-full bg-white/5 border-2 border-white/10 border-dashed flex items-center justify-center text-slate-400 relative z-0 hover:border-white/30 hover:text-white transition-colors cursor-pointer">
                      +
                   </div>
                </div>
                <button className="text-sm font-semibold text-white hover:text-purple-400 transition-colors flex items-center gap-1 group/btn">
                  Update Docs <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
           </div>
        </BentoCard>

        {/* Priority Scholarships List - Spans 2 cols */}
        <BentoCard className="md:col-span-3 lg:col-span-3 flex flex-col p-0 overflow-hidden group border-white/5">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                   <Target size={18} />
                </div>
                <h3 className="text-xl font-bold text-white">Top Priority Matches</h3>
             </div>
             <Link href="/scholarships" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">View all →</Link>
          </div>
          
          <div className="divide-y divide-white/5">
             <PriorityRow 
                name="KAUST Fellowship"
                country="Saudi Arabia"
                degree="Master's (Research)"
                score={92}
                tags={['Fully Funded', 'No Exp Needed']}
                deadline="TBD 2026"
             />
             <PriorityRow 
                name="Erasmus Mundus (EMJM)"
                country="Europe (Multiple)"
                degree="Joint Master's"
                score={88}
                tags={['Fully Funded', 'High Prestige']}
                deadline="Dec 15, 2026"
             />
             <PriorityRow 
                name="MEXT Scholarship"
                country="Japan"
                degree="Master's"
                score={85}
                tags={['Fully Funded', 'Language Required']}
                deadline="May 2027"
             />
          </div>
        </BentoCard>

        {/* Upcoming Deadlines Widget */}
        <BentoCard className="md:col-span-3 lg:col-span-1 bg-gradient-to-b from-red-950/20 to-transparent border-red-500/10 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <BellRing size={20} className="animate-pulse" />
             </div>
             <div>
                <h3 className="text-lg font-bold text-white">Deadlines</h3>
                <p className="text-xs text-red-400/80 font-medium">Critical timeline</p>
             </div>
          </div>

          <div className="flex-1 space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-gradient-to-b before:from-red-500/50 before:via-orange-500/20 before:to-transparent">
             <DeadlineTimeline name="KAUST Fellowship" date="Aug 31, 2026" days={21} status="urgent" />
             <DeadlineTimeline name="Erasmus Mundus" date="Dec 15, 2026" days={128} status="warning" />
             <DeadlineTimeline name="GKS" date="Mar 01, 2027" days={200} status="normal" />
          </div>
        </BentoCard>

      </div>
    </div>
  );
}

// Subcomponents

function BentoCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl p-6 hover:bg-white/[0.04] hover:border-white/10 hover:shadow-2xl hover:shadow-black/50 transition-all duration-500 ${className}`}>
      {children}
    </div>
  );
}

function PriorityRow({ name, country, degree, score, tags, deadline }: any) {
  return (
    <div className="p-6 hover:bg-white/[0.03] transition-colors group cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
         <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-black/40 border border-white/5 items-center justify-center relative overflow-hidden shrink-0 shadow-inner group-hover:border-indigo-500/30 transition-colors">
            <Globe className="text-slate-600 w-6 h-6 group-hover:text-indigo-400 transition-colors" />
         </div>
         <div>
            <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
               {name}
               <span className="bg-indigo-500/10 text-indigo-400 text-[9px] font-bold px-2 py-0.5 rounded border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]">S TIER</span>
            </h4>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 text-xs text-slate-400 font-medium">
               <span className="flex items-center gap-1"><MapPin size={12} /> {country}</span>
               <span className="flex items-center gap-1"><GraduationCap size={12} /> {degree}</span>
               <span className="flex items-center gap-1"><Clock size={12} /> {deadline}</span>
            </div>
            <div className="flex gap-2 mt-3">
               {tags.map((tag: string, i: number) => (
                 <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {tag}
                 </span>
               ))}
            </div>
         </div>
      </div>
      
      <div className="flex md:flex-col items-center justify-between md:justify-center gap-6 shrink-0 px-2">
         <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-1">
               <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">{score}</span>
               <span className="text-xs font-bold text-emerald-500/50">/100</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Fit Score</span>
         </div>
         <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:border-indigo-400 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-500 group-hover:rotate-45 group-hover:scale-110">
            <ArrowUpRight size={18} className="text-slate-400 group-hover:text-white transition-colors" />
         </div>
      </div>
    </div>
  );
}

function DeadlineTimeline({ name, date, days, status }: any) {
  const isUrgent = status === 'urgent';
  const color = isUrgent ? 'text-red-400' : status === 'warning' ? 'text-orange-400' : 'text-slate-400';
  const bgColor = isUrgent ? 'bg-red-500' : status === 'warning' ? 'bg-orange-500' : 'bg-slate-500';
  const shadowColor = isUrgent ? 'rgba(239,68,68,0.5)' : status === 'warning' ? 'rgba(249,115,22,0.3)' : 'rgba(148,163,184,0.2)';
  
  return (
    <div className="relative pl-8 group">
       <div className={`absolute left-0 top-1.5 w-[6px] h-[6px] rounded-full ring-4 ring-[#0a0a0f] ${bgColor} z-10 group-hover:scale-150 transition-transform`} style={{boxShadow: `0 0 10px ${shadowColor}`}}></div>
       <div className="bg-black/20 border border-white/5 rounded-2xl p-4 hover:bg-white/5 hover:border-white/10 transition-all duration-300">
          <h4 className="font-bold text-white mb-1 text-sm">{name}</h4>
          <div className="flex items-center justify-between text-xs">
             <span className="text-slate-400 font-medium">{date}</span>
             <span className={`font-bold px-2 py-0.5 rounded-full bg-white/5 ${color} border border-white/5`}>
                {days} days
             </span>
          </div>
       </div>
    </div>
  );
}
