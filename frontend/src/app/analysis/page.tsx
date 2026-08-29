"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileImage, ShieldAlert, CheckCircle, Download, ShoppingBag, MessageSquareHeart, ArrowRight, Shirt } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";

export default function AnalysisPage() {
  const [file, setFile] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [results, setResults] = useState<any>(null);
  
  // Patient Intake Context
  const [duration, setDuration] = useState<string>("Just appeared");
  const [symptoms, setSymptoms] = useState<string>("No pain or itch");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getToken } = useAuth();

  const processFile = (selectedFile: File) => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        const MAX = 512;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          const scale = Math.min(MAX / width, MAX / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);
        const jpeg = canvas.toDataURL("image/jpeg", 0.8);
        setFile(jpeg);
        setImageBase64(jpeg.split(",")[1]);
        setMimeType("image/jpeg");
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const startScan = async () => {
    if (!imageBase64) return;
    setIsScanning(true);
    
    try {
      const token = await getToken();
      const data = await apiFetch("/analyze", {
        method: "POST",
        body: JSON.stringify({ imageBase64, mimeType, duration, symptoms }),
        token
      });
      setResults(data);
      setScanComplete(true);
    } catch (err: any) {
      console.error(err);
      setResults({
        reportId: "#DW-ERROR",
        condition: "Analysis could not be completed",
        severity: 0,
        area: "Unknown",
        recommendations: [
          "Please try again in a moment.",
          "Make sure you are signed in — this feature requires a login.",
          err?.message ? `Details: ${err.message}` : undefined,
        ].filter(Boolean) as string[],
      });
      setScanComplete(true);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black print:bg-white">
      <div className="print:hidden"><Navbar /></div>
      
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 print:p-0">
        <div className="mb-8 text-center sm:text-left print:hidden">
          <h1 className="text-3xl font-bold text-foreground">AI Skin Analysis</h1>
          <p className="text-foreground/60 mt-2 max-w-2xl">Upload a clear photo of your skin concern for a clinical-grade AI assessment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 print:block gap-8">
          {/* UPLOAD & SCANNER AREA */}
          <div className="flex flex-col print:hidden">
            <div className="glass-card p-2 h-96 flex flex-col relative overflow-hidden rounded-2xl border-2 border-dashed border-primary-200 dark:border-primary-900/50">
              
              {!file ? (
                <>
                  <input 
                    type="file" 
                    accept="image/jpeg, image/png" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                  />
                  <div 
                    className="flex-1 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                      <UploadCloud size={32} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Drag and drop your image</h3>
                    <p className="text-sm text-foreground/50 mb-6">Or click to browse from your device</p>
                    <span className="text-xs font-medium px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-foreground/60">
                      Supports JPG, PNG (Max 10MB)
                    </span>
                  </div>
                </>
              ) : (
                <div className="relative w-full h-full bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-primary-900/20 flex items-center justify-center">
                    <Image src={file} alt="Uploaded Skin Image" fill className="object-cover" />
                  </div>
                  
                  {isScanning && (
                    <motion.div 
                      className="absolute left-0 right-0 h-1 bg-amber-400 shadow-[0_0_15px_3px_rgba(251,191,36,0.6)] z-20"
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  
                  {isScanning && (
                    <div className="absolute inset-0 bg-primary-900/40 z-10 flex items-center justify-center backdrop-blur-sm">
                      <div className="bg-white/90 dark:bg-black/90 px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                          <ShieldAlert className="text-amber-500" />
                        </motion.div>
                        <span className="font-bold text-foreground">Analyzing biomarkers...</span>
                      </div>
                    </div>
                  )}

                  {scanComplete && (
                    <div className="absolute inset-0 border-4 border-emerald-500 rounded-xl z-10 pointer-events-none"></div>
                  )}
                </div>
              )}
            </div>

            {/* Patient Intake Form */}
            {file && !scanComplete && (
              <div className="mt-6 glass-card p-4 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">How long have you had this?</label>
                  <select 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  >
                    <option value="Just appeared">Just appeared (1-2 days)</option>
                    <option value="A few days">A few days</option>
                    <option value="A few weeks">A few weeks</option>
                    <option value="Months or longer">Months or longer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Are there any symptoms?</label>
                  <select 
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                  >
                    <option value="No pain or itch">No pain or itch</option>
                    <option value="Mild itching">Mild itching</option>
                    <option value="Severe itching">Severe itching</option>
                    <option value="Painful / Tender">Painful or tender to touch</option>
                    <option value="Bleeding / Oozing">Bleeding or oozing</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              {!file ? (
                <button disabled className="bg-zinc-200 dark:bg-zinc-800 text-zinc-400 py-3 px-8 rounded-xl font-bold w-full sm:w-auto">
                  Upload an image to start
                </button>
              ) : !scanComplete && !isScanning ? (
                <button onClick={startScan} className="bg-primary-700 hover:bg-primary-800 text-white py-3 px-8 rounded-xl font-bold w-full sm:w-auto shadow-lg shadow-primary-700/20 transition-all">
                  Analyze Image Now
                </button>
              ) : isScanning ? (
                <button disabled className="bg-amber-500 text-white py-3 px-8 rounded-xl font-bold w-full sm:w-auto flex items-center justify-center gap-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <ShieldAlert size={18} />
                  </motion.div>
                  Processing...
                </button>
              ) : (
                <button onClick={() => { setFile(null); setScanComplete(false); }} className="bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-foreground py-3 px-8 rounded-xl font-bold w-full sm:w-auto transition-colors">
                  Scan Another Image
                </button>
              )}
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              {!scanComplete ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card flex-1 p-8 flex flex-col items-center justify-center text-center border-dashed"
                >
                  <ShieldAlert size={48} className="text-zinc-300 dark:text-zinc-700 mb-4" />
                  <h3 className="text-lg font-bold text-foreground/50">Awaiting Image</h3>
                  <p className="text-sm text-foreground/40 mt-2 max-w-xs">Upload an image and run the analysis to view your AI-generated clinical report.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card flex-1 p-6 sm:p-8 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6 print:mt-10">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <CheckCircle className="text-emerald-500 print:hidden" size={24} />
                        Clinical AI Analysis Report
                      </h2>
                      <p className="text-sm text-foreground/60 mt-1">Report ID: {results?.reportId || "#DW-Unknown"}</p>
                    </div>
                    <button onClick={() => window.print()} className="p-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors flex items-center gap-2 print:hidden">
                      <Download size={18} />
                      <span className="hidden sm:inline text-sm font-bold">Print / Save PDF</span>
                    </button>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-amber-800 dark:text-amber-400 font-bold mb-1">Detected Condition</p>
                    <h3 className="text-xl font-extrabold text-amber-900 dark:text-amber-300">{results?.condition || "Analysis failed to detect"}</h3>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${results?.severity || 0}%` }}></div>
                        </div>
                        <span className="text-xs font-bold">{results?.severity || 0}% Severity</span>
                      </div>
                      <span className="text-xs font-medium text-amber-800/60 dark:text-amber-400/60">Area: {results?.area || "Unknown"}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-foreground">Recommendations</h4>
                    {results?.recommendations?.map((rec: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-border">
                        <CheckCircle size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-foreground/80">{rec}</p>
                      </div>
                    ))}
                    
                    <Link href="/dashboard/consultants" className="block p-4 rounded-xl border border-border hover:border-primary-500 hover:shadow-md transition-all group bg-white dark:bg-zinc-900">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                            <MessageSquareHeart size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-foreground group-hover:text-primary-600 transition-colors">Consult DermAI Specialist</p>
                            <p className="text-xs text-foreground/60">Review this scan with an AI specialist.</p>
                          </div>
                        </div>
                        <ArrowRight size={18} className="text-foreground/40 group-hover:text-primary-600" />
                      </div>
                    </Link>
                  </div>

                  <p className="text-xs text-foreground/40 text-center mt-auto">
                    This analysis is generated by AI and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
