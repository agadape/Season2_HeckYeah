import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#030305] text-slate-100 overflow-hidden relative selection:bg-indigo-500/30">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />
      
      {/* Floating Sidebar */}
      <div className="p-4 z-10 hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-hidden z-10 pt-4 pr-4 pb-4 pl-0 relative">
        {/* Glassmorphic Container for Main Content */}
        <div className="h-full rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl overflow-y-auto custom-scrollbar relative shadow-2xl">
          {children}
        </div>
      </main>
    </div>
  );
}
