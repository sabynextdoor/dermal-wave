"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { ScanSearch, Bot, Activity, BrainCircuit, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary-500/30">
      <Navbar />

      {/* DYNAMIC HERO SECTION */}
      <section className="relative pt-28 pb-40 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-500/30 dark:bg-primary-500/20 blur-[120px] animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-amber-500/20 dark:bg-amber-500/10 blur-[120px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-[120px] animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary-500/20 bg-primary-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(var(--color-primary-500),0.15)]"
          >
            <SparklesIcon className="text-primary-500 w-4 h-4" />
            <span className="text-sm font-bold tracking-wide text-primary-700 dark:text-primary-300">Next-Gen AI Dermatology</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-center text-foreground mb-8 leading-[1.05]"
          >
            Clinical Precision. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-600 via-primary-500 to-amber-500">
              Instant Analysis.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-foreground/60 text-center mb-12 max-w-3xl font-medium leading-relaxed"
          >
            Empower your skin health with state-of-the-art computer vision. Detect, analyze, and track psoriasis severity instantly with clinical-grade accuracy.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
          >
            <Link href="/analysis" className="relative group overflow-hidden rounded-2xl p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500 via-amber-500 to-primary-500 opacity-70 group-hover:opacity-100 animate-gradient-xy transition-opacity duration-300"></span>
              <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-background/90 backdrop-blur-xl rounded-[15px] font-bold text-lg text-foreground transition-all group-hover:bg-background/70">
                <ScanSearch className="w-5 h-5 text-primary-500" />
                Launch AI Scanner
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <Link href="/dashboard" className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-foreground rounded-2xl font-bold text-lg transition-all border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700">
              Go to Dashboard
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BENTO BOX FEATURES */}
      <section className="py-32 relative bg-zinc-50/50 dark:bg-zinc-900/20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Intelligence at <br/> Every Layer.</h2>
            <p className="text-xl text-foreground/60 max-w-xl">A completely unified architecture designed to map and monitor chronic skin conditions using sophisticated neural networks.</p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]"
          >
            {/* Large Bento Box */}
            <motion.div variants={itemVariants} className="md:col-span-2 glass-card rounded-3xl p-10 relative overflow-hidden group border border-border/50 hover:border-primary-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-primary-500/20 transition-colors duration-700"></div>
              <ScanSearch className="w-12 h-12 text-primary-500 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Computer Vision Analysis</h3>
              <p className="text-foreground/70 text-lg max-w-md relative z-10">
                Our proprietary vision models map the topology of psoriasis plaques, extracting precise severity indicators and measuring affected surface area instantly.
              </p>
              {/* Abstract decorative graphic */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4 group-hover:scale-105 transition-transform duration-700">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" className="text-primary-500" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.6,-46.3C91.4,-33.5,98,-18,97.7,-2.6C97.4,12.8,90.2,28.1,79.8,40.1C69.4,52.1,55.8,60.8,41.9,69.2C28,77.6,14,85.7,0.2,85.4C-13.6,85.1,-27.2,76.4,-41.4,68.4C-55.6,60.4,-70.4,53.1,-80.7,41C-91,28.9,-96.8,11.9,-95.3,-4.2C-93.8,-20.3,-85,-35.5,-74.3,-48.5C-63.6,-61.5,-51,-72.3,-36.8,-79.3C-22.6,-86.3,-6.8,-89.5,7.9,-88.4C22.6,-87.3,45.2,-81.9,44.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
                </svg>
              </div>
            </motion.div>

            {/* Small Bento Box 1 */}
            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-8 relative overflow-hidden group border border-border/50 hover:border-amber-500/30 transition-colors">
              <Bot className="w-10 h-10 text-amber-500 mb-5" />
              <h3 className="text-2xl font-bold mb-3">24/7 Virtual Dermatologist</h3>
              <p className="text-foreground/70">
                Consult with our specialized AI agents tailored to specific dermatological sub-fields for continuous regimen adjustments.
              </p>
            </motion.div>

            {/* Small Bento Box 2 */}
            <motion.div variants={itemVariants} className="glass-card rounded-3xl p-8 relative overflow-hidden group border border-border/50 hover:border-blue-500/30 transition-colors">
              <Activity className="w-10 h-10 text-blue-500 mb-5" />
              <h3 className="text-2xl font-bold mb-3">Longitudinal Tracking</h3>
              <p className="text-foreground/70">
                Plot your flare-up intensity chronologically to identify triggers and measure exactly how well your treatment performs.
              </p>
            </motion.div>

            {/* Wide Bento Box */}
            <motion.div variants={itemVariants} className="md:col-span-2 glass-card rounded-3xl p-10 relative overflow-hidden group border border-border/50 flex flex-col md:flex-row items-center gap-8 justify-between hover:border-primary-500/30 transition-colors">
              <div className="flex-1">
                <BrainCircuit className="w-12 h-12 text-primary-500 mb-6" />
                <h3 className="text-3xl font-bold mb-4">Adaptive Regimen Generation</h3>
                <p className="text-foreground/70 text-lg">
                  Every scan feeds into a closed-loop system that dynamically suggests changes to your active care routine.
                </p>
              </div>
              <div className="w-full md:w-auto shrink-0 flex flex-col gap-3">
                <div className="px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center gap-4 shadow-sm border border-border/50">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  <span className="font-bold">Privacy First Processing</span>
                </div>
                <div className="px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center gap-4 shadow-sm border border-border/50">
                  <Zap className="w-6 h-6 text-amber-500" />
                  <span className="font-bold">Sub-second Inference</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* LIVE SCAN MOCKUP SECTION (Replacing Testimonials) */}
      <section className="py-32 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary-600/40 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Watch the AI <br/> decode your skin.</h2>
              <p className="text-xl text-primary-200/70 mb-10 max-w-lg">
                No guesswork. Our inference engine breaks down your uploaded image into raw severity metrics and immediate action items.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-lg font-bold">Severity Matrix</h4>
                    <p className="text-primary-200/60">Calculates redness, thickness, and scaling individually.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-lg font-bold">Confidence Scoring</h4>
                    <p className="text-primary-200/60">Provides statistical certainty for every detected anomaly.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Animated Mockup Interface */}
            <div className="flex-1 w-full relative">
              <div className="relative rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
                <div className="h-12 border-b border-zinc-800 flex items-center px-6 gap-2 bg-zinc-950/50">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-xs font-mono text-zinc-500">inference_engine_v4.exe</div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between bg-[url('/hero_abstract.png')] bg-cover bg-center bg-no-repeat relative">
                  <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm z-0"></div>
                  
                  {/* Floating Mock Data */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 bg-black/60 backdrop-blur-md border border-zinc-800 rounded-xl p-4 self-start max-w-[200px]"
                  >
                    <div className="text-xs text-primary-400 mb-1 font-mono">SCANNING...</div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="h-full bg-primary-500"
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="relative z-10 bg-black/60 backdrop-blur-md border border-zinc-800 rounded-xl p-5 self-end w-full max-w-sm mt-auto"
                  >
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <div className="text-xs text-zinc-400 mb-1 font-bold tracking-widest uppercase">Result</div>
                        <div className="text-xl font-bold text-white">Moderate Plaque</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-zinc-400 mb-1">CONFIDENCE</div>
                        <div className="text-xl font-bold text-emerald-400">98.4%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-zinc-800/50 rounded-lg p-2 text-center">
                        <div className="text-[10px] text-zinc-400 mb-1">ERYTHEMA</div>
                        <div className="font-mono font-bold text-amber-400">2/4</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-2 text-center">
                        <div className="text-[10px] text-zinc-400 mb-1">INDURATION</div>
                        <div className="font-mono font-bold text-amber-400">2/4</div>
                      </div>
                      <div className="bg-zinc-800/50 rounded-lg p-2 text-center">
                        <div className="text-[10px] text-zinc-400 mb-1">DESQUAMATION</div>
                        <div className="font-mono font-bold text-red-400">3/4</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Activity className="text-primary-600" size={24} />
            <span className="text-xl font-bold text-foreground">Dermal Wave™</span>
          </div>
          <p className="text-foreground/50 text-sm font-medium">© 2026 Dermal Wave AI Inference. All rights reserved.</p>
          <p className="text-foreground/40 text-sm font-medium">Built by <a href="https://github.com/sabynextdoor" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground/70 hover:text-primary-600 transition-colors">Saby</a> (sabynextdoor)</p>
        </div>
      </footer>
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
