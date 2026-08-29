import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black">
      <Navbar />
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <footer className="border-t border-border/50 bg-zinc-50 dark:bg-black py-3 px-6 text-center">
        <p className="text-foreground/40 text-xs font-medium">
          Dermal Wave — crafted by{" "}
          <a href="https://github.com/sabynextdoor" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground/60 hover:text-primary-600 transition-colors">
            Saby
          </a>
          {" "}(sabynextdoor)
        </p>
      </footer>
    </div>
  );
}
