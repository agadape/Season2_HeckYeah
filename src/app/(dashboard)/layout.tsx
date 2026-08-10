import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#FDFDFD] text-slate-900 overflow-hidden font-sans selection:bg-slate-200">
      {/* Sidebar */}
      <div className="hidden md:block w-64 border-r border-slate-200/60 bg-white z-10 flex-shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
