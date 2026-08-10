import { FileText, Briefcase, BellRing, CheckCircle, GraduationCap, Target, ArrowRight, Plus, Calendar, Clock, Globe } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/60">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="text-slate-500 mt-2 text-base">
            Track and manage your scholarship journey. You have <strong className="text-slate-900">4</strong> upcoming deadlines.
          </p>
        </div>
        
        <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
          <Plus size={16} />
          <span>New Application</span>
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Total Tracked" value="47" subtitle="Scholarships" />
        <KpiCard title="Fully Funded" value="21" subtitle="Opportunities" />
        <KpiCard title="In Progress" value="3" subtitle="Applications" />
        <KpiCard title="Missing Docs" value="8" subtitle="Required files" alert />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Main Feed: Priority Scholarships */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Priority Matches</h2>
            <Link href="/scholarships" className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="space-y-4">
             <PriorityCard 
                name="KAUST Fellowship"
                country="Saudi Arabia"
                degree="Master's (Research)"
                score={92}
                deadline="Aug 31, 2026"
             />
             <PriorityCard 
                name="Erasmus Mundus (EMJM)"
                country="Europe"
                degree="Joint Master's"
                score={88}
                deadline="Dec 15, 2026"
             />
             <PriorityCard 
                name="MEXT Scholarship"
                country="Japan"
                degree="Master's"
                score={85}
                deadline="May 2027"
             />
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          
          {/* Readiness */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Readiness</h2>
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
               <div className="flex justify-between items-end mb-2">
                 <span className="text-sm font-medium text-slate-700">Profile Completion</span>
                 <span className="text-xl font-semibold text-slate-900">65%</span>
               </div>
               <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
                  <div className="h-full bg-slate-900 w-[65%] rounded-full"></div>
               </div>
               
               <div className="space-y-3">
                  <DocItem name="Passport" status="ready" />
                  <DocItem name="Academic Transcript" status="ready" />
                  <DocItem name="IELTS Certificate" status="ready" />
                  <DocItem name="Statement of Purpose" status="missing" />
                  <DocItem name="Recommendation Letters" status="missing" />
               </div>
            </div>
          </div>

          {/* Deadlines */}
          <div>
             <h2 className="text-lg font-semibold text-slate-900 mb-4">Deadlines</h2>
             <div className="bg-white border border-slate-200 rounded-xl p-0 shadow-sm divide-y divide-slate-100">
                <DeadlineRow name="KAUST Fellowship" date="Aug 31" days={21} urgent />
                <DeadlineRow name="Erasmus Mundus" date="Dec 15" days={128} />
                <DeadlineRow name="GKS" date="Mar 01" days={200} />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Subcomponents

function KpiCard({ title, value, subtitle, alert = false }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <h3 className="text-sm font-medium text-slate-500 mb-3">{title}</h3>
      <div>
        <div className={`text-3xl font-semibold ${alert ? 'text-red-600' : 'text-slate-900'}`}>{value}</div>
        <div className="text-sm text-slate-500 mt-1">{subtitle}</div>
      </div>
    </div>
  );
}

function PriorityCard({ name, country, degree, score, deadline }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
         <div className="flex items-center gap-2 mb-1">
            <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-0.5 rounded">Fully Funded</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium px-2 py-0.5 rounded">High Match</span>
         </div>
         <h4 className="text-base font-semibold text-slate-900">{name}</h4>
         <p className="text-sm text-slate-500 mt-1 flex items-center gap-3">
            <span>{country}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{degree}</span>
         </p>
      </div>
      
      <div className="flex items-center gap-6 text-right">
         <div className="hidden sm:block">
            <div className="text-sm font-medium text-slate-900">{deadline}</div>
            <div className="text-xs text-slate-500">Deadline</div>
         </div>
         <div>
            <div className="text-2xl font-semibold text-slate-900">{score}</div>
            <div className="text-xs text-slate-500">Fit Score</div>
         </div>
      </div>
    </div>
  );
}

function DocItem({ name, status }: any) {
  const isReady = status === 'ready';
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600 flex items-center gap-2">
         {isReady ? <CheckCircle size={14} className="text-emerald-500" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />}
         {name}
      </span>
      <span className={`text-xs font-medium ${isReady ? 'text-emerald-600' : 'text-slate-400'}`}>
         {isReady ? 'Ready' : 'Missing'}
      </span>
    </div>
  );
}

function DeadlineRow({ name, date, days, urgent = false }: any) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
       <div>
          <h4 className="text-sm font-medium text-slate-900">{name}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{date}</p>
       </div>
       <div className={`text-xs font-semibold px-2.5 py-1 rounded-md ${urgent ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-600'}`}>
          {days} days
       </div>
    </div>
  );
}
