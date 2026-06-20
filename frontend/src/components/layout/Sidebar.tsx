"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanSearch, Pill, Shirt, ShoppingBag, MessageSquareHeart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Analysis", href: "/analysis", icon: ScanSearch },
    { name: "AI Consultants", href: "/dashboard/consultants", icon: MessageSquareHeart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card hidden lg:flex flex-col h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-6">
        <h2 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-4">Menu</h2>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400" 
                    : "text-foreground/70 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground"
                )}
              >
                <Icon size={20} className={isActive ? "text-primary-600 dark:text-primary-400" : "text-foreground/50"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-border">
        {/* Removed dummy Skin Score alert widget. Replace with real API data later if needed. */}
      </div>
    </aside>
  );
}
