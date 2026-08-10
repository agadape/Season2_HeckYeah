import { FileText, Briefcase, BellRing, CheckCircle, GraduationCap, Target, ArrowUpRight, Zap, MapPin, Calendar, Clock, Globe } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-10 min-h-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white/80 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Application Season 2027
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
            Welcome back, Anya!
          </h1>
          <p className="text-slate-600 mt-4 text-lg font-medium max-w-xl leading-relaxed">
            You're tracking <strong className="text-slate-900 font-bold">47</strong> scholarships. Your next major deadline is in <strong className="text-rose-500 font-bold">21 days</strong>. Keep the momentum going!
          </p>
        </div>
        
        <button className="group flex items-center gap-2 bg-slate-900 text-white px-7 py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]">
          <Zap size={18} className="text-amber-400 fill-amber-400/50 group-hover:scale-110 transition-transform" />
          <span>Discover New</span>
        </button>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* KPI 1 */}
        <BentoCard className="bg-gradient-to-br from-indigo-50/50 to-white/30 border-indigo-100 hover:border-indigo-200 hover:bg-white/60">
           <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 border border-indigo-100 text-indigo-600 shadow-sm">
             <Briefcase size={28} />
           </div>
           <div className="text-5xl font-extrabold text-slate-900 mb-2 tracking-tighter">47</div>
           <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total Scholarships</div>
        </BentoCard>

        {/* KPI 2 */}
        <BentoCard className="bg-gradient-to-br from-emerald-50/50 to-white/30 border-emerald-100 hover:border-emerald-200 hover:bg-white/60">
           <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 border border-emerald-100 text-emerald-600 shadow-sm">
             <CheckCircle size={28} />
           </div>
           <div className="text-5xl font-extrabold text-slate-900 mb-2 tracking-tighter">21</div>
           <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Fully Funded</div>
        </BentoCard>

        {/* Action / Progress Bento - Spans 2 cols */}
        <BentoCard className="md:col-span-2 lg:col-span-2 flex flex-col justify-between overflow-hidden relative group bg-white/40">
           {/* Visual Aid Decor */}
           <div className="absolute -right-10 -top-10 w-48 h-48 bg-gradient-to-br from-purple-200/60 to-indigo-200/60 rounded-full blur-[40px] group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
           
           <div className="flex justify-between items-start relative z-10">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Application Readiness</h3>
                <p className="text-slate-500 text-sm font-medium">Based on required documents</p>
              </div>
              <div className="bg-white border border-slate-200 px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 shadow-sm">
                 Phase 1
              </div>
           </div>

           <div className="mt-10 relative z-10">
              <div className="flex justify-between text-sm mb-3 font-bold">
                 <span className="text-indigo-600">Preparation</span>
                 <span className="text-slate-800">65%</span>
              </div>
              <div className="w-full h-4 bg-slate-200/50 rounded-full overflow-hidden border border-white/50 shadow-inner">
                 <div className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 w-[65%] rounded-full shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 w-full opacity-50" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem'}}></div>
                 </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <div className="flex -space-x-3">
                   {['IELTS', 'CV', 'SOP'].map((doc, i) => (
                      <div key={i} className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-[10px] font-extrabold text-slate-700 relative z-10 hover:z-20 hover:-translate-y-1 transition-transform shadow-sm">
                         {doc}
                      </div>
                   ))}
                   <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-200 border-dashed flex items-center justify-center text-slate-400 relative z-0 hover:border-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer font-bold text-lg">
                      +
                   </div>
                </div>
                <button className="text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1 group/btn">
                  Update Docs <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
           </div>
        </BentoCard>

        {/* Priority Scholarships List - Spans 2 cols */}
        <BentoCard className="md:col-span-3 lg:col-span-3 flex flex-col p-0 overflow-hidden group bg-white/40">
          <div className="p-6 border-b border-white/60 flex justify-between items-center bg-white/30 backdrop-blur-md">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 border border-amber-200 shadow-sm">
                   <Target size={20} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Top Priority Matches</h3>
             </div>
             <Link href="/scholarships" className="text-sm font-bold text-slate-500 hover:text-indigo-600 bg-white/50 px-4 py-2 rounded-lg border border-white/80 transition-colors shadow-sm">View all →</Link>
          </div>
          
          <div className="divide-y divide-slate-200/50">
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
        <BentoCard className="md:col-span-3 lg:col-span-1 bg-gradient-to-b from-rose-50/50 to-white/30 border-rose-100 flex flex-col overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/40 rounded-full blur-[30px] -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-8 relative z-10">
             <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-rose-500 border border-rose-100 shadow-sm relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></div>
                <BellRing size={24} className="text-rose-500" />
             </div>
             <div>
                <h3 className="text-lg font-extrabold text-slate-900">Deadlines</h3>
                <p className="text-xs text-rose-500 font-bold uppercase tracking-wider">Critical timeline</p>
             </div>
          </div>

          <div className="flex-1 space-y-6 relative before:absolute before:inset-y-0 before:left-[13px] before:w-[2px] before:bg-gradient-to-b before:from-rose-300 before:via-amber-200 before:to-transparent z-10">
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
    <div className={`rounded-[2rem] bg-white/50 border border-white/80 backdrop-blur-2xl p-7 hover:bg-white/80 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 ${className}`}>
      {children}
    </div>
  );
}

function PriorityRow({ name, country, degree, score, tags, deadline }: any) {
  return (
    <div className="p-6 hover:bg-white/60 transition-colors group cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5">
      <div className="flex items-start gap-5">
         <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm items-center justify-center relative overflow-hidden shrink-0 group-hover:border-indigo-200 group-hover:shadow-md transition-all">
            <Globe className="text-slate-400 w-8 h-8 group-hover:text-indigo-500 transition-colors" />
         </div>
         <div>
            <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-3">
               {name}
               <span className="bg-indigo-100 text-indigo-600 text-[10px] font-extrabold px-2 py-0.5 rounded border border-indigo-200 shadow-sm uppercase tracking-wider">S TIER</span>
            </h4>
            <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-2 text-xs text-slate-500 font-bold">
               <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {country}</span>
               <span className="flex items-center gap-1.5"><GraduationCap size={14} className="text-slate-400"/> {degree}</span>
               <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400"/> {deadline}</span>
            </div>
            <div className="flex gap-2 mt-4">
               {tags.map((tag: string, i: number) => (
                 <span key={i} className="text-[10px] font-bold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm">
                    {tag}
                 </span>
               ))}
            </div>
         </div>
      </div>
      
      <div className="flex md:flex-col items-center justify-between md:justify-center gap-6 shrink-0 px-2">
         <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-1">
               <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400">{score}</span>
               <span className="text-xs font-bold text-emerald-600/50">/100</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Fit Score</span>
         </div>
         <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-indigo-500 group-hover:border-indigo-400 group-hover:shadow-[0_4px_15px_rgba(99,102,241,0.3)] transition-all duration-500 group-hover:rotate-45 group-hover:scale-110">
            <ArrowUpRight size={20} className="text-slate-400 group-hover:text-white transition-colors" />
         </div>
      </div>
    </div>
  );
}

function DeadlineTimeline({ name, date, days, status }: any) {
  const isUrgent = status === 'urgent';
  const color = isUrgent ? 'text-rose-600' : status === 'warning' ? 'text-amber-600' : 'text-slate-600';
  const bgColor = isUrgent ? 'bg-rose-500' : status === 'warning' ? 'bg-amber-500' : 'bg-slate-400';
  const shadowColor = isUrgent ? 'rgba(244,63,94,0.4)' : status === 'warning' ? 'rgba(245,158,11,0.4)' : 'rgba(148,163,184,0.4)';
  
  return (
    <div className="relative pl-10 group">
       <div className={`absolute left-0 top-2 w-[8px] h-[8px] rounded-full ring-4 ring-white ${bgColor} z-10 group-hover:scale-150 transition-transform`} style={{boxShadow: `0 0 10px ${shadowColor}`}}></div>
       <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:bg-slate-50 hover:border-slate-200 hover:shadow-md transition-all duration-300">
          <h4 className="font-extrabold text-slate-900 mb-1.5 text-sm">{name}</h4>
          <div className="flex items-center justify-between text-xs">
             <span className="text-slate-500 font-bold">{date}</span>
             <span className={`font-black px-2.5 py-1 rounded-lg ${isUrgent ? 'bg-rose-50' : status === 'warning' ? 'bg-amber-50' : 'bg-slate-100'} ${color} border ${isUrgent ? 'border-rose-100' : status === 'warning' ? 'border-amber-100' : 'border-slate-200'}`}>
                {days} days
             </span>
          </div>
       </div>
    </div>
  );
}
