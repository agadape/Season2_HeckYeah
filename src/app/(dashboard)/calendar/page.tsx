import { Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function CalendarPage() {
  const supabase = await createClient();
  const { data: deadlines } = await supabase
    .from('deadlines')
    .select('*, scholarships(name)')
    .order('application_deadline', { ascending: true });

  const data = deadlines || [];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Timeline</h1>
        <p className="text-sm text-slate-500 mt-1">
          Chronological view of your upcoming deadlines and milestones.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden p-6">
        {data.length === 0 ? (
          <div className="text-center py-12">
            <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No upcoming events</h3>
            <p className="text-sm text-slate-500">Your calendar is currently clear. Deadlines will appear here once you track scholarships.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-100 ml-3 md:ml-6 space-y-10 py-4">
            {/* Very simple rendering for actual database deadlines */}
            {data.map((d: any) => (
              <TimelineEvent 
                key={d.id}
                title={d.scholarships?.name || 'Unknown Program'} 
                date={d.application_deadline ? new Date(d.application_deadline).toLocaleDateString() : 'TBD'} 
                tag={d.deadline_status || 'Deadline'} 
                tagColor="red" 
                desc={d.notes || 'No description provided.'} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineEvent({ title, date, tag, tagColor, desc }: any) {
  const badgeClasses = tagColor === 'red' 
    ? 'bg-red-50 text-red-700 border-red-200' 
    : 'bg-blue-50 text-blue-700 border-blue-200';

  return (
    <div className="relative pl-6 md:pl-8">
      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300 ring-4 ring-white"></div>
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-5">
        <div className="flex flex-wrap gap-2 justify-between items-start mb-2">
          <h4 className="font-medium text-slate-900 text-base">{title}</h4>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${badgeClasses}`}>
            {tag}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-4">{desc}</p>
        <div className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Clock className="w-4 h-4" />
          {date}
        </div>
      </div>
    </div>
  );
}
