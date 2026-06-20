import Image from "next/image";
import Link from "next/link";
import { AIConsultant } from "@/lib/data/mockData";
import { Bot, Star, ArrowRight } from "lucide-react";

interface AIConsultantCardProps {
  consultant: AIConsultant;
}

export function AIConsultantCard({ consultant }: AIConsultantCardProps) {
  return (
    <div className="glass-card overflow-hidden group flex flex-col h-full">
      <div className="relative h-48 w-full bg-primary-100 dark:bg-primary-900/30 overflow-hidden">
        {/* Placeholder for real AI image generation, falling back to a gradient/icon if missing */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-700 opacity-20 group-hover:scale-105 transition-transform duration-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <Bot size={64} className="text-primary-600 dark:text-primary-300 drop-shadow-md" />
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-foreground">{consultant.name}</h3>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{consultant.specialty}</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-md text-xs font-bold">
            <Star size={12} className="fill-current" />
            <span>{consultant.precision}%</span>
          </div>
        </div>
        
        <p className="text-sm text-foreground/70 mt-2 mb-4 flex-1 line-clamp-2">
          {consultant.description}
        </p>
        
        <Link href={`/dashboard/consultants/${consultant.id}`} className="w-full flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          <span>Chat Now</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
