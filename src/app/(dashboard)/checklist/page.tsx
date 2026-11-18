import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { CATEGORIES, daysUntil, sortOpen, STARTER_TASKS, todayWIB, type Task } from '@/lib/tasks';
import AddTaskForm from './AddTaskForm';
import StarterButton from './StarterButton';
import TaskItem from './TaskItem';

type View = 'aktif' | 'selesai' | 'semua';

export default async function ChecklistPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const view: View = params.view === 'selesai' || params.view === 'semua' ? params.view : 'aktif';
  const cat = typeof params.cat === 'string' && (CATEGORIES as readonly string[]).includes(params.cat) ? params.cat : null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tasks')
    .select('id, title, notes, category, priority, due_date, done, done_at, created_at')
    .order('created_at', { ascending: true });

  const all = (data ?? []) as Task[];
  const today = todayWIB();

  const inCat = cat ? all.filter((t) => t.category === cat) : all;
  const open = inCat.filter((t) => !t.done).sort(sortOpen);
  const finished = inCat
    .filter((t) => t.done)
    .sort((a, b) => (b.done_at ?? '').localeCompare(a.done_at ?? ''));

  const overdue = open.filter((t) => t.due_date && daysUntil(t.due_date, today) < 0);
  const thisWeek = open.filter((t) => t.due_date && daysUntil(t.due_date, today) >= 0 && daysUntil(t.due_date, today) <= 7);
  const later = open.filter((t) => t.due_date && daysUntil(t.due_date, today) > 7);
  const undated = open.filter((t) => !t.due_date);

  const openAll = all.filter((t) => !t.done);
  const doneCount = all.length - openAll.length;
  const progress = all.length ? Math.round((doneCount / all.length) * 100) : 0;

  const href = (next: { view?: View; cat?: string | null }) => {
    const sp = new URLSearchParams();
    const v = next.view ?? view;
    const c = next.cat === undefined ? cat : next.cat;
    if (v !== 'aktif') sp.set('view', v);
    if (c) sp.set('cat', c);
    const qs = sp.toString();
    return qs ? `/checklist?${qs}` : '/checklist';
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Checklist</h1>
        <p className="text-sm text-slate-500 mt-1">
          Semua yang harus diingat, di satu tempat. {all.length > 0 && `${doneCount} dari ${all.length} selesai.`}
        </p>
        {all.length > 0 && (
          <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Progres checklist">
            <div className="bg-slate-900 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {error && (
        <div role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
          Gagal ambil data: {error.message}. Sudah jalankan migration <code>004_tasks.sql</code> di Supabase?
        </div>
      )}

      <AddTaskForm />

      {all.length === 0 && !error ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-lg p-6 text-center space-y-3">
          <p className="text-sm text-slate-600">Checklist masih kosong. Mulai dari nol, atau isi langsung dengan langkah standar:</p>
          <StarterButton count={STARTER_TASKS.length} />
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <div className="flex gap-1 border-b border-slate-200" role="tablist" aria-label="Tampilan">
              {(['aktif', 'selesai', 'semua'] as View[]).map((v) => (
                <Link
                  key={v}
                  href={href({ view: v })}
                  role="tab"
                  aria-selected={view === v}
                  className={`px-3 py-2 text-sm font-medium capitalize -mb-px border-b-2 ${
                    view === v ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {v} {v === 'aktif' ? `(${openAll.length})` : v === 'selesai' ? `(${doneCount})` : `(${all.length})`}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Chip href={href({ cat: null })} active={!cat} label="Semua kategori" />
              {CATEGORIES.filter((c) => all.some((t) => t.category === c)).map((c) => (
                <Chip
                  key={c}
                  href={href({ cat: c })}
                  active={cat === c}
                  label={`${c} · ${all.filter((t) => t.category === c && !t.done).length}`}
                />
              ))}
            </div>
          </div>

          {view !== 'selesai' && (
            <>
              <Section title="Telat" tone="red" tasks={overdue} today={today} />
              <Section title="7 hari ke depan" tone="amber" tasks={thisWeek} today={today} />
              <Section title="Nanti" tasks={later} today={today} />
              <Section title="Tanpa deadline" tasks={undated} today={today} />
              {open.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-6">Nggak ada yang pending di sini. 🎉</p>
              )}
            </>
          )}
          {view !== 'aktif' && <Section title="Selesai" tasks={finished} today={today} />}
        </>
      )}
    </div>
  );
}

function Chip({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
        active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
      }`}
    >
      {label}
    </Link>
  );
}

function Section({ title, tasks, today, tone }: { title: string; tasks: Task[]; today: string; tone?: 'red' | 'amber' }) {
  if (tasks.length === 0) return null;
  const color = tone === 'red' ? 'text-red-700' : tone === 'amber' ? 'text-amber-700' : 'text-slate-500';
  return (
    <section className="space-y-2">
      <h2 className={`text-xs font-semibold uppercase tracking-wider ${color}`}>
        {title} · {tasks.length}
      </h2>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} today={today} />
        ))}
      </ul>
    </section>
  );
}
