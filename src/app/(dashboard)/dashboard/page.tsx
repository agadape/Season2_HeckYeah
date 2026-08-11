import { FileCheck2, CalendarClock, DollarSign, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // Fetch real data for dashboard previews
  const { data: scholarships } = await supabase
    .from('scholarships')
    .select('*')
    .limit(3)
    .order('created_at', { ascending: false });

  const { data: documents } = await supabase
    .from('documents')
    .select('*');

  const { count: activeAppsCount } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .neq('status', 'Archived');

  const data = scholarships || [];
  const docs = documents || [];
  
  // Calculate readiness
  const totalDocs = docs.length;
  const readyDocs = docs.filter(d => d.status === 'ready').length;
  const readiness = totalDocs > 0 ? Math.round((readyDocs / totalDocs) * 100) : 0;

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Overview</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track your Master's scholarship applications and deadlines for the 2027 intake.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Applications" value={activeAppsCount?.toString() || "0"} trend="In pipeline" />
        <MetricCard title="Tracked Scholarships" value={data.length.toString()} trend="Total programs saved" />
        <MetricCard title="Missing Documents" value={(totalDocs - readyDocs).toString()} trend={totalDocs > 0 ? "Action required" : "No documents added"} alert={(totalDocs - readyDocs) > 0} />
        <MetricCard title="Overall Readiness" value={`${readiness}%`} trend="Document completion" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Application Table */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Recently Added Programs</h2>
            <Link href="/scholarships" className="text-sm font-medium text-slate-900 hover:underline">View all</Link>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-slate-200">
                 <thead className="bg-slate-50">
                   <tr>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Program</th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Funding</th>
                     <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-slate-200">
                   {data.length === 0 ? (
                     <tr>
                       <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                         No scholarships added yet.
                       </td>
                     </tr>
                   ) : (
                     data.map((s) => (
                       <TableRow 
                         key={s.id}
                         program={s.name} 
                         university={s.provider || 'Unknown'} 
                         status={s.application_status || 'Not Started'} 
                         funding={s.fully_funded ? 'Fully Funded' : 'Partial'} 
                       />
                     ))
                   )}
                 </tbody>
               </table>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-6">
          
          {/* Document Readiness */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-slate-500" />
              Document Readiness
            </h2>
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">Overall Progress</span>
                    <span className="text-slate-500">{readiness}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-slate-900 h-2 rounded-full transition-all" style={{ width: `${readiness}%` }}></div>
                  </div>
               </div>
               <div className="pt-2 space-y-3">
                  {docs.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">No documents uploaded.</p>
                  ) : (
                    docs.slice(0, 5).map((d) => (
                      <DocItem key={d.id} name={d.name} ready={d.status === 'ready'} />
                    ))
                  )}
               </div>
            </div>
            <Link href="/documents" className="block text-center w-full mt-6 py-2 px-4 border border-slate-200 rounded-md text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors">
              Manage Documents
            </Link>
          </div>

          {/* Upcoming Events/Deadlines */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-slate-500" />
              Timeline
            </h2>
            <div className="space-y-4 text-center">
              <p className="text-sm text-slate-500 py-4">No upcoming deadlines found.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Subcomponents

function MetricCard({ title, value, trend, alert = false }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight text-slate-900">{value}</span>
      </div>
      <p className={`mt-1 text-xs ${alert ? 'text-red-600 font-medium' : 'text-slate-500'}`}>{trend}</p>
    </div>
  );
}

function TableRow({ program, university, status, funding }: any) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-slate-900">{program}</div>
        <div className="text-sm text-slate-500">{university}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
        {funding}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-slate-400 hover:text-slate-900">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}

function DocItem({ name, ready = false }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600 truncate mr-2">{name}</span>
      {ready ? (
        <span className="shrink-0 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Ready</span>
      ) : (
        <span className="shrink-0 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Missing</span>
      )}
    </div>
  );
}
