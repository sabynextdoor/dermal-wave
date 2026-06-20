import Image from "next/image";
import { Medicine } from "@/lib/data/mockData";
import { ShoppingCart, Pill } from "lucide-react";

interface ProductCardProps {
  product: Medicine;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="glass-card overflow-hidden group flex flex-col h-full">
      <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center p-6">
        <Pill size={48} className="text-zinc-400 group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs font-bold text-primary-600 dark:text-primary-400 mb-1 tracking-wider uppercase">
          {product.type}
        </div>
        <h3 className="font-bold text-lg text-foreground mb-1">{product.name}</h3>
        <p className="text-xl font-bold text-foreground mt-auto mb-4">${product.price.toFixed(2)}</p>
        
        <button className="w-full flex items-center justify-center gap-2 border-2 border-primary-700 text-primary-700 dark:text-primary-400 dark:border-primary-500 hover:bg-primary-700 hover:text-white dark:hover:bg-primary-500 dark:hover:text-zinc-950 py-2.5 rounded-xl font-medium transition-colors">
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
