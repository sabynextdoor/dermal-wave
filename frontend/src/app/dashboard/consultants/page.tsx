"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { AIConsultant } from "@/lib/data/mockData";
import { AIConsultantCard } from "@/components/ui/AIConsultantCard";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "@clerk/nextjs";

export default function ConsultantsPage() {
  const [consultants, setConsultants] = useState<AIConsultant[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then(token => {
      apiFetch("/consultants", { token })
        .then((data) => setConsultants(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    });
  }, [getToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Activity size={32} className="text-primary-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Consultants</h1>
        <p className="text-foreground/60 mt-1">Connect with specialized AI dermatologists for your specific needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultants.map((consultant) => (
          <AIConsultantCard key={consultant.id} consultant={consultant} />
        ))}
      </div>
    </div>
  );
}
