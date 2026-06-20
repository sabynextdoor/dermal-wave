import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTrackerProps {
  currentStage: number; // 0-5
}

const STAGES = [
  "Scan",
  "Consult AI",
  "Prescribe",
  "Craft",
  "Ship",
  "Wear"
];

export function OrderTracker({ currentStage }: OrderTrackerProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-200 dark:bg-zinc-800 z-0 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-600 transition-all duration-500 z-0 rounded-full"
          style={{ width: `${(currentStage / (STAGES.length - 1)) * 100}%` }}
        ></div>
        
        {/* Stages */}
        {STAGES.map((stage, index) => {
          const isCompleted = index < currentStage;
          const isCurrent = index === currentStage;
          
          return (
            <div key={stage} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
                  isCompleted ? "bg-primary-600 text-white" : 
                  isCurrent ? "bg-amber-500 text-white shadow-[0_0_0_4px_rgba(245,158,11,0.2)]" : 
                  "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                )}
              >
                {isCompleted ? <CheckCircle2 size={16} /> : 
                 isCurrent ? <Clock size={16} /> : 
                 <Circle size={10} className="fill-current" />}
              </div>
              <span className={cn(
                "text-xs font-bold hidden sm:block absolute -bottom-6 whitespace-nowrap",
                isCompleted || isCurrent ? "text-foreground" : "text-foreground/40"
              )}>
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
