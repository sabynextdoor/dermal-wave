import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Active" | "Pending" | "Delivered" | "Critical";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles = {
    Active: "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 border-primary-200 dark:border-primary-800",
    Pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    Delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    Critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold border", styles[status], className)}>
      {status}
    </span>
  );
}
