"use client";

import { useState, useTransition } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { addStarterTasks } from './actions';

export default function StarterButton({ count }: { count: number }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const res = await addStarterTasks();
            if (res.error) setError(res.error);
          })
        }
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 disabled:opacity-50"
      >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        Isi {count} langkah SISGP + universityadmissions
      </button>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
