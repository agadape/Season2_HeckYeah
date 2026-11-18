import { CATEGORIES, PRIORITIES, PRIORITY_LABEL, type Task } from '@/lib/tasks';

const input =
  'w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900';

/** Category / deadline / priority / notes inputs shared by the add and edit forms. */
export default function TaskFields({ task, idPrefix }: { task?: Task; idPrefix: string }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label htmlFor={`${idPrefix}-category`} className="text-xs font-medium text-slate-600">Kategori</label>
          <select id={`${idPrefix}-category`} name="category" defaultValue={task?.category ?? 'Lainnya'} className={input}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor={`${idPrefix}-due`} className="text-xs font-medium text-slate-600">Deadline (opsional)</label>
          <input id={`${idPrefix}-due`} name="due_date" type="date" defaultValue={task?.due_date ?? ''} className={input} />
        </div>
        <div className="space-y-1">
          <label htmlFor={`${idPrefix}-priority`} className="text-xs font-medium text-slate-600">Prioritas</label>
          <select id={`${idPrefix}-priority`} name="priority" defaultValue={task?.priority ?? 'normal'} className={input}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{PRIORITY_LABEL[p]}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor={`${idPrefix}-notes`} className="text-xs font-medium text-slate-600">Catatan</label>
        <textarea
          id={`${idPrefix}-notes`}
          name="notes"
          rows={3}
          defaultValue={task?.notes ?? ''}
          placeholder="Link, nomor kontak, apa yang udah dicek, dll."
          className={input}
        />
      </div>
    </>
  );
}
