import { ExternalLink, MoreHorizontal, ArrowRight, FileCheck2, CalendarClock, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
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
        <MetricCard title="Active Applications" value="4" trend="+1 from last week" />
        <MetricCard title="Upcoming Deadlines" value="2" trend="Next in 14 days" />
        <MetricCard title="Missing Documents" value="8" trend="Action required" alert />
        <MetricCard title="Total Funding Potential" value="$125,000" trend="Fully funded tracks" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Application Table */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Priority Scholarships</h2>
            <Link href="/scholarships" className="text-sm font-medium text-slate-900 hover:underline">View all</Link>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-slate-200">
                 <thead className="bg-slate-50">
                   <tr>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Program</th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Deadline</th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Funding</th>
                     <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-slate-200">
                   <TableRow 
                     program="KAUST Fellowship" 
                     university="KAUST, Saudi Arabia" 
                     status="In Progress" 
                     deadline="Aug 31, 2026" 
                     funding="Fully Funded" 
                   />
                   <TableRow 
                     program="Erasmus Mundus" 
                     university="Multiple, Europe" 
                     status="Not Started" 
                     deadline="Dec 15, 2026" 
                     funding="Fully Funded" 
                   />
                   <TableRow 
                     program="MEXT Scholarship" 
                     university="University of Tokyo, Japan" 
                     status="Drafting SOP" 
                     deadline="May 1, 2027" 
                     funding="Fully Funded" 
                   />
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
                    <span className="text-slate-500">65%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-slate-900 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
               </div>
               <div className="pt-2 space-y-3">
                  <DocItem name="Academic Transcript" ready />
                  <DocItem name="IELTS Certificate" ready />
                  <DocItem name="CV / Resume" ready />
                  <DocItem name="Statement of Purpose" />
                  <DocItem name="Recommendation Letters" />
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
            <div className="space-y-4">
              <TimelineItem date="Aug 31, 2026" title="KAUST Application Closes" urgent />
              <TimelineItem date="Sep 15, 2026" title="IELTS Test Date" />
              <TimelineItem date="Dec 15, 2026" title="Erasmus Mundus Deadline" />
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

function TableRow({ program, university, status, deadline, funding }: any) {
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
        {deadline}
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
      <span className="text-sm text-slate-600">{name}</span>
      {ready ? (
        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Ready</span>
      ) : (
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Missing</span>
      )}
    </div>
  );
}

function TimelineItem({ date, title, urgent = false }: any) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-2 h-2 rounded-full mt-1.5 ${urgent ? 'bg-red-500' : 'bg-slate-300'}`}></div>
        <div className="w-px h-full bg-slate-200 mt-1"></div>
      </div>
      <div className="pb-4">
        <p className={`text-sm font-medium ${urgent ? 'text-red-600' : 'text-slate-900'}`}>{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{date}</p>
      </div>
    </div>
  );
}
