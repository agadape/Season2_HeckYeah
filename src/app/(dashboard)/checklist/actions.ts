"use server";

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { isCategory, isPriority, STARTER_TASKS } from '@/lib/tasks';

type Result = { error?: string };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

async function authed() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

function refresh() {
  revalidatePath('/checklist');
  revalidatePath('/dashboard');
}

function readFields(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const notes = String(formData.get('notes') ?? '').trim();
  const category = formData.get('category');
  const priority = formData.get('priority');
  const due = String(formData.get('due_date') ?? '');

  if (!title) return { error: 'Judul wajib diisi.' } as const;
  if (title.length > 300) return { error: 'Judul kepanjangan (maks. 300 karakter).' } as const;
  if (due && !DATE_RE.test(due)) return { error: 'Format tanggal salah.' } as const;

  return {
    fields: {
      title,
      notes: notes || null,
      category: isCategory(category) ? category : 'Lainnya',
      priority: isPriority(priority) ? priority : 'normal',
      due_date: due || null,
    },
  } as const;
}

export async function addTask(formData: FormData): Promise<Result> {
  const { supabase, user } = await authed();
  if (!user) return { error: 'Belum login.' };

  const parsed = readFields(formData);
  if ('error' in parsed) return { error: parsed.error };

  const { error } = await supabase.from('tasks').insert({ ...parsed.fields, user_id: user.id });
  if (error) return { error: error.message };
  refresh();
  return {};
}

export async function updateTask(id: string, formData: FormData): Promise<Result> {
  const { supabase, user } = await authed();
  if (!user) return { error: 'Belum login.' };

  const parsed = readFields(formData);
  if ('error' in parsed) return { error: parsed.error };

  const { error } = await supabase.from('tasks').update(parsed.fields).eq('id', id);
  if (error) return { error: error.message };
  refresh();
  return {};
}

export async function toggleTask(id: string, done: boolean): Promise<Result> {
  const { supabase, user } = await authed();
  if (!user) return { error: 'Belum login.' };

  const { error } = await supabase
    .from('tasks')
    .update({ done, done_at: done ? new Date().toISOString() : null })
    .eq('id', id);
  if (error) return { error: error.message };
  refresh();
  return {};
}

export async function deleteTask(id: string): Promise<Result> {
  const { supabase, user } = await authed();
  if (!user) return { error: 'Belum login.' };

  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) return { error: error.message };
  refresh();
  return {};
}

export async function addStarterTasks(): Promise<Result> {
  const { supabase, user } = await authed();
  if (!user) return { error: 'Belum login.' };

  const { count } = await supabase.from('tasks').select('id', { count: 'exact', head: true });
  if ((count ?? 0) > 0) return { error: 'Checklist sudah ada isinya.' };

  const rows = STARTER_TASKS.map((t) => ({
    user_id: user.id,
    title: t.title,
    category: t.category,
    priority: t.priority,
    due_date: t.due_date ?? null,
    notes: t.notes ?? null,
  }));
  const { error } = await supabase.from('tasks').insert(rows);
  if (error) return { error: error.message };
  refresh();
  return {};
}
