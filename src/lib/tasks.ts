// Shared (server + client) helpers for the personal checklist.

export const CATEGORIES = [
  'Visa & Paspor',
  'Universitas',
  'Beasiswa',
  'Dokumen',
  'Bahasa',
  'Kontak & Referee',
  'Keuangan',
  'Lainnya',
] as const;
export type Category = (typeof CATEGORIES)[number];

export const PRIORITIES = ['high', 'normal', 'low'] as const;
export type Priority = (typeof PRIORITIES)[number];

export const PRIORITY_LABEL: Record<Priority, string> = {
  high: 'Penting',
  normal: 'Biasa',
  low: 'Santai',
};

export const CATEGORY_STYLE: Record<Category, string> = {
  'Visa & Paspor': 'bg-sky-50 text-sky-700 border-sky-200',
  Universitas: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Beasiswa: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Dokumen: 'bg-amber-50 text-amber-700 border-amber-200',
  Bahasa: 'bg-violet-50 text-violet-700 border-violet-200',
  'Kontak & Referee': 'bg-rose-50 text-rose-700 border-rose-200',
  Keuangan: 'bg-lime-50 text-lime-700 border-lime-200',
  Lainnya: 'bg-slate-100 text-slate-700 border-slate-200',
};

export type Task = {
  id: string;
  title: string;
  notes: string | null;
  category: string;
  priority: Priority;
  due_date: string | null; // YYYY-MM-DD
  done: boolean;
  done_at: string | null;
  created_at: string;
};

export function isCategory(v: unknown): v is Category {
  return typeof v === 'string' && (CATEGORIES as readonly string[]).includes(v);
}

export function isPriority(v: unknown): v is Priority {
  return typeof v === 'string' && (PRIORITIES as readonly string[]).includes(v);
}

export function categoryStyle(c: string) {
  return isCategory(c) ? CATEGORY_STYLE[c] : CATEGORY_STYLE.Lainnya;
}

/** Today as YYYY-MM-DD in Indonesia (WIB), so "overdue" flips at local midnight. */
export function todayWIB(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date());
}

/** Whole days from today (WIB) to the given YYYY-MM-DD. Negative = overdue. */
export function daysUntil(due: string, today = todayWIB()): number {
  const a = Date.UTC(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10));
  const b = Date.UTC(+due.slice(0, 4), +due.slice(5, 7) - 1, +due.slice(8, 10));
  return Math.round((b - a) / 86_400_000);
}

export function dueLabel(due: string, today = todayWIB()): string {
  const d = daysUntil(due, today);
  if (d < 0) return `Telat ${-d} hari`;
  if (d === 0) return 'Hari ini';
  if (d === 1) return 'Besok';
  if (d <= 30) return `${d} hari lagi`;
  return formatDate(due);
}

export function formatDate(due: string): string {
  const [y, m, d] = due.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const PRIORITY_RANK: Record<string, number> = { high: 0, normal: 1, low: 2 };

/** Open tasks: earliest deadline first, undated last; ties broken by priority. */
export function sortOpen(a: Task, b: Task): number {
  if (a.due_date && b.due_date && a.due_date !== b.due_date) return a.due_date < b.due_date ? -1 : 1;
  if (a.due_date && !b.due_date) return -1;
  if (!a.due_date && b.due_date) return 1;
  return (PRIORITY_RANK[a.priority] ?? 1) - (PRIORITY_RANK[b.priority] ?? 1);
}

/** Generic SISGP / University Admissions steps — no personal data. */
export const STARTER_TASKS: { title: string; category: Category; priority: Priority; due_date?: string; notes?: string }[] = [
  { title: 'Urus paspor', category: 'Visa & Paspor', priority: 'high', notes: 'Nama di paspor harus sama persis dengan akun universityadmissions.se.' },
  { title: 'Cek syarat residence permit studi Swedia (Migrationsverket)', category: 'Visa & Paspor', priority: 'normal' },
  { title: 'Submit pilihan prodi di universityadmissions.se', category: 'Universitas', priority: 'high', due_date: '2027-01-15', notes: 'Urutan ranking masih bisa diubah sampai 15 Jan 2027.' },
  { title: 'Bayar application fee SEK 900', category: 'Keuangan', priority: 'high', due_date: '2027-01-15', notes: 'Bayar langsung setelah submit. Telat bayar = gugur SISGP.' },
  { title: 'Catat 8-digit application number UA', category: 'Universitas', priority: 'high', notes: 'Salah nomor di portal SI = diskualifikasi.' },
  { title: 'Cek specific entry requirements tiap prodi vs transkrip', category: 'Universitas', priority: 'high' },
  { title: 'Upload transkrip bahasa Inggris (resmi, bertanda tangan)', category: 'Dokumen', priority: 'normal', due_date: '2027-02-01' },
  { title: 'Upload Statement of enrolment status', category: 'Dokumen', priority: 'normal', due_date: '2027-02-01' },
  { title: 'Daftar tes IELTS', category: 'Bahasa', priority: 'high' },
  { title: 'Upload skor IELTS ke UA', category: 'Bahasa', priority: 'normal', due_date: '2027-02-01' },
  { title: 'Download 3 template SI (CV, proof of work, reference letter)', category: 'Beasiswa', priority: 'high' },
  { title: 'Hitung total jam kerja (min. 3.000 jam, maks. 3 employer)', category: 'Beasiswa', priority: 'high' },
  { title: 'CV di template SI (maks. 3 halaman)', category: 'Beasiswa', priority: 'normal', due_date: '2027-02-24' },
  { title: 'Tulis motivation SI', category: 'Beasiswa', priority: 'normal', due_date: '2027-02-24' },
  { title: 'Hubungi referee 1 (kerja)', category: 'Kontak & Referee', priority: 'high' },
  { title: 'Hubungi referee 2 (civil society)', category: 'Kontak & Referee', priority: 'normal' },
  { title: 'Minta tanda tangan + stempel proof of work & reference', category: 'Kontak & Referee', priority: 'normal', due_date: '2027-02-15' },
  { title: 'Submit aplikasi SISGP (tutup 24 Feb 20:59 WIB)', category: 'Beasiswa', priority: 'high', due_date: '2027-02-20', notes: 'Jangan submit di hari-hari terakhir, portal sering overload.' },
];
