"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Bot, ArrowRight, MessageSquareHeart, ScanSearch } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { apiFetch } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = await getToken();
        const data = await apiFetch("/dashboard", { token });
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [getToken]);

  const quickActions = [
    { label: "Chat with AI", icon: <MessageSquareHeart />, href: "/dashboard/consultants", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
    { label: "New Scan", icon: <ScanSearch />, href: "/analysis", color: "bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Activity size={32} className="text-primary-500" />
        </motion.div>
      </div>
    );
  }

  if (!dashboardData) {
    return <div className="text-center p-8 text-red-500">Failed to load dashboard data. Ensure backend is running.</div>;
  }

  const { scoreData, stats, activities, user } = dashboardData;
  const firstName = user?.name?.split(' ')[0] || 'there';

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity />;
      case 'ScanSearch': return <ScanSearch />;
      case 'Bot': return <Bot />;
      case 'MessageSquareHeart': return <MessageSquareHeart />;
      default: return <Activity />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {firstName}</h1>
        <p className="text-foreground/60 mt-1">Here is your daily skin health overview.</p>
      </div>

      {/* STATS GRID */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 ${stat.color}`}>
                  {renderIcon(stat.iconName)}
                </div>
              </div>
              <p className="text-foreground/60 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
              <p className="text-xs font-medium text-foreground/50 mt-1">{stat.trend}</p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* SKIN SCORE CHART */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Skin Score Trend</h2>
              <StatusBadge status="Active" />
            </div>
            {scoreData && scoreData.length > 0 ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scoreData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#525252" opacity={0.2} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#0F6E56" 
                      strokeWidth={4} 
                      dot={{ fill: '#0F6E56', strokeWidth: 2, r: 4 }} 
                      activeDot={{ r: 6, fill: '#f59e0b', strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-foreground/50">
                <p>No scans yet. Upload a photo to start tracking.</p>
              </div>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, idx) => (
              <Link key={idx} href={action.href}>
                <div className="glass-card p-5 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary-500 transition-colors h-full">
                  <div className={`p-3 rounded-full mb-3 group-hover:scale-110 transition-transform ${action.color}`}>
                    {action.icon}
                  </div>
                  <span className="font-bold text-sm">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div className="space-y-6">

          {/* ACTIVITY FEED */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-bold mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {activities.map((act: any, idx: number) => (
                <div key={idx} className="flex gap-4 relative">
                  {idx !== activities.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-zinc-200 dark:bg-zinc-800"></div>
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    act.type === 'system' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                    act.type === 'user' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {act.type === 'system' ? <ScanSearch size={14} /> : act.type === 'user' ? <Activity size={14} /> : <Bot size={14} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{act.title}</h4>
                    <p className="text-xs text-foreground/50 mb-1">{act.time}</p>
                    <p className="text-sm text-foreground/70">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
