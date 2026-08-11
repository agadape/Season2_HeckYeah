import { Search, Plus, Filter, FileText, CheckCircle2, AlertCircle, UploadCloud, MoreVertical } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function DocumentsPage() {
  const supabase = await createClient();
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false });

  const data = documents || [];

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

      {data.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">No documents yet</h3>
          <p className="text-sm text-slate-500 mb-4">Start uploading your CV, transcripts, and certificates.</p>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 h-9 px-4 py-2 gap-2 shadow-sm">
            <UploadCloud className="w-4 h-4" />
            Upload First Document
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map(doc => (
            <DocCard 
              key={doc.id}
              title={doc.name} 
              type={doc.document_type || 'General'} 
              updated={new Date(doc.updated_at).toLocaleDateString()} 
              status={doc.status || 'draft'} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DocCard({ title, type, updated, status }: any) {
  const isReady = status === 'ready' || status === 'Verified';
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
