import { Garment } from "@/lib/data/mockData";
import { Shirt, ShoppingBag } from "lucide-react";

interface GarmentCardProps {
  garment: Garment;
}

export function GarmentCard({ garment }: GarmentCardProps) {
  return (
    <div className="glass-card overflow-hidden group flex flex-col h-full">
      <div className="relative h-56 w-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center p-6 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
        <Shirt size={64} className="text-zinc-300 dark:text-zinc-600 group-hover:text-primary-400 transition-colors duration-300" />
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur text-xs font-bold px-2.5 py-1 rounded-full shadow-sm text-foreground">
          {garment.gender}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-foreground line-clamp-1">{garment.name}</h3>
          <p className="font-bold text-lg text-primary-700 dark:text-primary-400">${garment.price.toFixed(2)}</p>
        </div>
        
        <p className="text-sm font-medium text-foreground/60 mb-3">{garment.fabric}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {garment.benefits.map((benefit, idx) => (
            <span key={idx} className="bg-primary-50 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200 text-xs px-2 py-1 rounded-md font-medium">
              {benefit}
            </span>
          ))}
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 text-white py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          <ShoppingBag size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
