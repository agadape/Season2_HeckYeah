"use client";

import { useOptimistic, useState, useTransition } from 'react';
import { Check, Loader2, StickyNote, Trash2 } from 'lucide-react';
import { categoryStyle, daysUntil, dueLabel, formatDate, PRIORITY_LABEL, type Task } from '@/lib/tasks';
import { deleteTask, toggleTask, updateTask } from './actions';
import TaskFields from './TaskFields';

export default function TaskItem({ task, today }: { task: Task; today: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [done, setOptimisticDone] = useOptimistic(task.done);

  const days = task.due_date ? daysUntil(task.due_date, today) : null;
  const overdue = !done && days !== null && days < 0;
  const soon = !done && days !== null && days >= 0 && days <= 7;

  function toggle() {
    startTransition(async () => {
      setOptimisticDone(!done);
      const res = await toggleTask(task.id, !done);
      if (res.error) setError(res.error);
    });
  }

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateTask(task.id, formData);
      if (res.error) setError(res.error);
      else {
        setError(null);
        setOpen(false);
      }
    });
  }

  function remove() {
    if (!confirm(`Hapus "${task.title}"? Ini nggak bisa di-undo.`)) return;
    startTransition(async () => {
      const res = await deleteTask(task.id);
      if (res.error) setError(res.error);
    });
  }

  return (
    <li className={`bg-white border rounded-lg shadow-sm ${overdue ? 'border-red-200' : 'border-slate-200'}`}>
      <div className="flex items-start gap-3 p-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={done ? `Tandai belum selesai: ${task.title}` : `Tandai selesai: ${task.title}`}
          aria-pressed={done}
          className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
            done ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 hover:border-slate-900'
          }`}
        >
          {done && <Check className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex-1 min-w-0 text-left"
        >
          <span className={`block text-sm font-medium break-words ${done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
            {task.title}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded border ${categoryStyle(task.category)}`}>
              {task.category}
            </span>
            {task.due_date && (
              <span
                className={`text-[11px] font-medium px-1.5 py-0.5 rounded border ${
                  overdue
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : soon
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                {done ? formatDate(task.due_date) : dueLabel(task.due_date, today)}
              </span>
            )}
            {task.priority === 'high' && !done && (
              <span className="text-[11px] font-medium px-1.5 py-0.5 rounded border bg-slate-900 text-white border-slate-900">
                {PRIORITY_LABEL.high}
              </span>
            )}
            {task.notes && <StickyNote className="w-3.5 h-3.5 text-slate-400" aria-label="Ada catatan" />}
          </span>
          {task.notes && !open && (
            <span className="mt-1 block text-xs text-slate-500 truncate">{task.notes}</span>
          )}
        </button>

        {pending && <Loader2 className="w-4 h-4 mt-0.5 animate-spin text-slate-400 shrink-0" />}
      </div>

      {open && (
        <form onSubmit={save} className="border-t border-slate-100 p-3 space-y-3">
          <div className="space-y-1">
            <label htmlFor={`${task.id}-title`} className="text-xs font-medium text-slate-600">Judul</label>
            <input
              id={`${task.id}-title`}
              name="title"
              required
              maxLength={300}
              defaultValue={task.title}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <TaskFields task={task} idPrefix={task.id} />
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={remove}
              disabled={pending}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={pending}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-slate-900 hover:bg-slate-900/90 disabled:opacity-50"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      )}

      {error && <p role="alert" className="px-3 pb-3 text-sm text-red-600">{error}</p>}
    </li>
  );
}
