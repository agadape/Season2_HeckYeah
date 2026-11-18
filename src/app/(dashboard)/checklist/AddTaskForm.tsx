"use client";

import { useRef, useState, useTransition } from 'react';
import { ChevronDown, Loader2, Plus } from 'lucide-react';
import { addTask } from './actions';
import TaskFields from './TaskFields';

export default function AddTaskForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await addTask(formData);
      if (res.error) {
        setError(res.error);
        return;
      }
      setError(null);
      formRef.current?.reset();
      titleRef.current?.focus();
    });
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 space-y-3">
      <div className="flex gap-2">
        <label htmlFor="new-title" className="sr-only">Hal yang harus diingat</label>
        <input
          ref={titleRef}
          id="new-title"
          name="title"
          required
          maxLength={300}
          autoComplete="off"
          placeholder="Tulis apa aja yang nggak boleh lupa… (mis. Cek syarat visa)"
          className="flex-1 min-w-0 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-slate-900 hover:bg-slate-900/90 disabled:opacity-50"
        >
          {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span className="hidden sm:inline">Tambah</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => setShowMore((v) => !v)}
        aria-expanded={showMore}
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900"
      >
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMore ? 'rotate-180' : ''}`} />
        Kategori, deadline, catatan
      </button>

      {/* Kept mounted (just hidden) so defaults still submit when collapsed. */}
      <div className={showMore ? 'space-y-3' : 'hidden'}>
        <TaskFields idPrefix="new" />
      </div>

      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
