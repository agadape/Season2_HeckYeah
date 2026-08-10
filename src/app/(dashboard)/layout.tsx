import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#FDFBF7] text-slate-800 overflow-hidden relative selection:bg-indigo-500/20">
      {/* Light Mode Dynamic Pastel Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-200/40 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-200/40 rounded-full blur-[150px] -z-10 mix-blend-multiply pointer-events-none" />
      <div className="absolute top-[20%] left-[40%] w-[40vw] h-[40vw] bg-amber-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply pointer-events-none" />
      
      {/* Floating Sidebar */}
      <div className="p-6 z-10 hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-hidden z-10 pt-6 pr-6 pb-6 pl-0 relative">
        {/* Glassmorphic Container for Main Content */}
        <div className="h-full rounded-[2.5rem] bg-white/40 border border-white/80 backdrop-blur-3xl overflow-y-auto custom-scrollbar relative shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
          {children}
        </div>
      </main>
    </div>
  );
}
