import { Search, Plus, Filter, MoreHorizontal, MapPin, GraduationCap, DollarSign, Clock } from 'lucide-react';

export default function ScholarshipsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Scholarships Directory</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse, filter, and manage all your prospective Master's programs.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 h-9 px-4 py-2 gap-2">
          <Plus className="w-4 h-4" />
          Add Program
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search programs or universities..." 
            className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-9 px-4 py-2 gap-2 shadow-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Program & University</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Funding</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Deadline</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <ScholarshipRow 
                program="KAUST Fellowship" 
                university="King Abdullah University of Science and Technology" 
                location="Saudi Arabia"
                funding="Fully Funded" 
                deadline="Aug 31, 2026" 
                status="In Progress"
              />
              <ScholarshipRow 
                program="Erasmus Mundus (EMJM)" 
                university="Multiple Consortiums" 
                location="Europe"
                funding="Fully Funded" 
                deadline="Dec 15, 2026" 
                status="Not Started"
              />
              <ScholarshipRow 
                program="MEXT Scholarship" 
                university="University of Tokyo" 
                location="Japan"
                funding="Fully Funded" 
                deadline="May 1, 2027" 
                status="Drafting SOP"
              />
              <ScholarshipRow 
                program="Fulbright Foreign Student" 
                university="Various Universities" 
                location="USA"
                funding="Fully Funded" 
                deadline="Feb 15, 2026" 
                status="Submitted"
              />
              <ScholarshipRow 
                program="Chevening Scholarship" 
                university="Various Universities" 
                location="UK"
                funding="Fully Funded" 
                deadline="Nov 7, 2025" 
                status="Archived"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ScholarshipRow({ program, university, location, funding, deadline, status }: any) {
  let statusStyle = "bg-slate-100 text-slate-800 border-slate-200";
  if (status === "In Progress" || status === "Drafting SOP") statusStyle = "bg-blue-50 text-blue-700 border-blue-200";
  if (status === "Submitted") statusStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Archived") statusStyle = "bg-slate-100 text-slate-500 border-slate-200 opacity-70";

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white">
            <GraduationCap className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-900">{program}</div>
            <div className="text-sm text-slate-500">{university}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-slate-500 gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          {location}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-slate-500 gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-medium">{funding}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-slate-500 gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {deadline}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-md hover:bg-slate-100">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
