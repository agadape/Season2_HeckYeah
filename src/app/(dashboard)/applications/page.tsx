import { Plus, MoreHorizontal, MessageSquare, Paperclip, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function ApplicationsPage() {
  const supabase = await createClient();
  
  const { data: applications } = await supabase
    .from('applications')
    .select('*, scholarships(name, provider, intake_year)');

  const data = applications || [];
  
  // For Kanban board, we group by status
  const prep = data.filter(a => a.status === 'Not Started' || a.status === 'Drafting SOP');
  const review = data.filter(a => a.status === 'Submitted' || a.status === 'Under Review');
  const interview = data.filter(a => a.status === 'Interview');
  const decided = data.filter(a => a.status === 'Accepted' || a.status === 'Rejected');

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Application Pipeline</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your active applications through each stage.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-9 px-4 py-2 gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          New Application
        </button>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full">
          
          <KanbanColumn title="Preparation" count={prep.length}>
            {prep.length === 0 && <EmptyZone />}
            {prep.map(a => (
              <KanbanCard key={a.id} title={a.scholarships?.name} university={a.scholarships?.provider} date={a.scholarships?.intake_year} status={a.status} />
            ))}
          </KanbanColumn>
          
          <KanbanColumn title="Under Review" count={review.length}>
            {review.length === 0 && <EmptyZone />}
            {review.map(a => (
              <KanbanCard key={a.id} title={a.scholarships?.name} university={a.scholarships?.provider} date={a.scholarships?.intake_year} status={a.status} />
            ))}
          </KanbanColumn>
          
          <KanbanColumn title="Interview" count={interview.length}>
            {interview.length === 0 && <EmptyZone />}
            {interview.map(a => (
              <KanbanCard key={a.id} title={a.scholarships?.name} university={a.scholarships?.provider} date={a.scholarships?.intake_year} status={a.status} />
            ))}
          </KanbanColumn>
          
          <KanbanColumn title="Decided" count={decided.length}>
            {decided.length === 0 && <EmptyZone />}
            {decided.map(a => (
              <KanbanCard key={a.id} title={a.scholarships?.name} university={a.scholarships?.provider} date={a.scholarships?.intake_year} status={a.status} />
            ))}
          </KanbanColumn>

        </div>
      </div>
    </div>
  );
}

function EmptyZone() {
  return (
    <div className="h-24 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-sm text-slate-400 bg-slate-50/50">
      No applications
    </div>
  );
}

function KanbanColumn({ title, count, children }: any) {
  return (
    <div className="w-80 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-slate-900">{title}</h3>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

function KanbanCard({ title, university, date, comments = 0, attachments = 0, status = null }: any) {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm cursor-pointer hover:border-slate-300 transition-colors group">
      {status && (
        <div className="mb-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {status}
          </span>
        </div>
      )}
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-sm text-slate-900 leading-tight">{title || 'Unknown'}</h4>
        <button className="text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-slate-500 mb-4">{university || 'Unknown'}</p>
      
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {date || 'TBD'}
        </div>
      </div>
    </div>
  );
}
