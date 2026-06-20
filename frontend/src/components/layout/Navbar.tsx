"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Activity } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow ring-2 ring-primary-500/20 bg-primary-900 flex-shrink-0">
                <Image src="/logo.png" alt="Dermal Wave Logo" fill className="object-cover" />
              </div>
              <span className="text-xl font-bold text-primary-800 dark:text-primary-100 hidden sm:block">
                Dermal Wave
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/analysis" className="text-sm font-medium hover:text-primary-600 transition-colors">
              AI Analysis
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary-600 transition-colors">
              Dashboard
            </Link>
            
            <div className="flex items-center gap-4 pl-4 border-l border-border">
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 text-foreground/60 hover:text-primary-600 transition-colors rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/50 w-9 h-9 flex items-center justify-center"
              >
                {mounted ? (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />}
              </button>
              
              {isSignedIn ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm font-bold bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-foreground/60 w-9 h-9 flex items-center justify-center"
            >
              {mounted ? (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground/80 hover:text-primary-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass border-t border-border"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-50 dark:hover:bg-primary-900/50 hover:text-primary-600">
              Home
            </Link>
            <Link href="/analysis" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-50 dark:hover:bg-primary-900/50 hover:text-primary-600">
              AI Analysis
            </Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-50 dark:hover:bg-primary-900/50 hover:text-primary-600">
              Dashboard
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
