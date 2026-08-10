import { FileText, Briefcase, BellRing, CheckCircle, GraduationCap } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">What scholarships should I care about right now?</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Scholarships" value="47" subtitle="In database" icon={<Briefcase size={20} />} />
        <KpiCard title="Fully Funded" value="21" subtitle="Opportunities" icon={<CheckCircle size={20} />} />
        <KpiCard title="Top Priority" value="8" subtitle="S & A tier" icon={<GraduationCap size={20} />} />
        <KpiCard title="Upcoming Deadlines" value="5" subtitle="Next 30 days" icon={<BellRing size={20} />} className="border-orange-200 bg-orange-50" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recommended Scholarships */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Recommended for You</h2>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">Fully Funded</span>
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded">S Priority</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">KAUST Fellowship</h3>
              <p className="text-sm text-slate-500">Saudi Arabia • Master's • 2027</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">92</div>
                <div className="text-xs text-slate-500">Fit Score</div>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Upcoming Deadlines</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
            <DeadlineItem name="KAUST Fellowship" date="Aug 31, 2026" days={21} country="Saudi Arabia" />
            <DeadlineItem name="Erasmus Mundus" date="Dec 15, 2026" days={128} country="Europe" />
          </div>
        </div>

      </div>
    </div>
  );
}

function KpiCard({ title, value, subtitle, icon, className = "" }: any) {
  return (
    <div className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="text-slate-400">{icon}</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
      </div>
    </div>
  );
}

function DeadlineItem({ name, date, days, country }: any) {
  const isUrgent = days < 30;
  return (
    <div className="flex items-start justify-between border-b border-slate-100 last:border-0 pb-3 last:pb-0">
      <div>
        <h4 className="font-semibold text-sm text-slate-900">{name}</h4>
        <p className="text-xs text-slate-500">{country}</p>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-slate-900">{date}</div>
        <div className={`text-xs font-semibold ${isUrgent ? 'text-orange-600' : 'text-slate-500'}`}>
          {days} days left
        </div>
      </div>
    </div>
  );
}
