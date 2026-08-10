import { Search, Plus, Filter, FileText, CheckCircle2, AlertCircle, UploadCloud, MoreVertical } from 'lucide-react';

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Document Center</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your transcripts, SOPs, and recommendation letters.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-9 px-4 py-2 gap-2 shadow-sm">
          <UploadCloud className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DocCard 
          title="Academic Transcript (S1)" 
          type="Official Document" 
          updated="Oct 12, 2024" 
          status="ready" 
        />
        <DocCard 
          title="IELTS Test Report Form" 
          type="Certificate" 
          updated="Nov 5, 2024" 
          status="ready" 
        />
        <DocCard 
          title="Master CV / Resume" 
          type="Personal" 
          updated="2 days ago" 
          status="ready" 
        />
        <DocCard 
          title="Statement of Purpose (KAUST)" 
          type="Essay" 
          updated="1 week ago" 
          status="draft" 
        />
        <DocCard 
          title="Letter of Rec 1 (Prof. Budi)" 
          type="Reference" 
          updated="Pending" 
          status="missing" 
        />
        <DocCard 
          title="Letter of Rec 2 (Manager)" 
          type="Reference" 
          updated="Pending" 
          status="missing" 
        />
      </div>
    </div>
  );
}

function DocCard({ title, type, updated, status }: any) {
  const isReady = status === 'ready';
  const isDraft = status === 'draft';
  
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${isReady ? 'bg-emerald-50 text-emerald-600' : isDraft ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
          <FileText className="w-6 h-6" />
        </div>
        <button className="text-slate-400 hover:text-slate-900 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      <div className="mb-4 flex-1">
        <h3 className="font-semibold text-slate-900 text-sm mb-1">{title}</h3>
        <p className="text-xs text-slate-500">{type}</p>
      </div>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-medium">
          {isReady ? (
            <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> <span className="text-emerald-700">Verified</span></>
          ) : isDraft ? (
            <><AlertCircle className="w-4 h-4 text-amber-500" /> <span className="text-amber-700">Draft</span></>
          ) : (
            <><AlertCircle className="w-4 h-4 text-red-500" /> <span className="text-red-700">Missing</span></>
          )}
        </div>
        <span className="text-xs text-slate-400">{updated}</span>
      </div>
    </div>
  );
}
