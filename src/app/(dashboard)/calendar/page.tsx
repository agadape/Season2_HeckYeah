import { Calendar as CalendarIcon, Clock, ArrowRight } from 'lucide-react';

export default function CalendarPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Timeline</h1>
        <p className="text-sm text-slate-500 mt-1">
          Chronological view of your upcoming deadlines and milestones.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden p-6">
        <div className="relative border-l-2 border-slate-100 ml-3 md:ml-6 space-y-10 py-4">
          
          <TimelineMonth month="August 2026" />
          <TimelineEvent 
            title="KAUST Fellowship Application Closes" 
            date="Aug 31, 2026" 
            tag="Deadline" 
            tagColor="red" 
            desc="Submit all required documents via the KAUST admissions portal." 
          />

          <TimelineMonth month="September 2026" />
          <TimelineEvent 
            title="IELTS Exam (British Council)" 
            date="Sep 15, 2026" 
            tag="Exam" 
            tagColor="blue" 
            desc="Test location at Jakarta. Results expected in 13 days." 
          />

          <TimelineMonth month="December 2026" />
          <TimelineEvent 
            title="Erasmus Mundus Scholarship" 
            date="Dec 15, 2026" 
            tag="Deadline" 
            tagColor="red" 
            desc="Application deadline for the Fall 2027 intake." 
          />
          
          <TimelineMonth month="March 2027" />
          <TimelineEvent 
            title="Global Korea Scholarship (GKS)" 
            date="Mar 1, 2027" 
            tag="Deadline" 
            tagColor="red" 
            desc="Embassy track application deadline." 
          />

        </div>
      </div>
    </div>
  );
}

function TimelineMonth({ month }: { month: string }) {
  return (
    <div className="relative">
      <div className="absolute -left-[35px] md:-left-[47px] bg-white text-slate-400 p-1">
        <CalendarIcon className="w-5 h-5" />
      </div>
      <h3 className="font-semibold text-slate-900 text-lg mb-2">{month}</h3>
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
