"use client";

import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Send, ArrowLeft, Bot, User, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useAuth } from "@clerk/nextjs";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const consultantId = resolvedParams.id;
  const router = useRouter();
  const { getToken } = useAuth();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello. I am your specialized AI Dermatologist. I am strictly programmed to answer questions only regarding skin diseases, psoriasis, and dermatology. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const token = await getToken();
      const response = await apiFetch("/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newMessages }),
        token
      });

      if (response && response.text) {
        setMessages([...newMessages, { role: "ai", text: response.text }]);
      } else {
        setMessages([...newMessages, { role: "ai", text: "I encountered an error processing your request." }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([...newMessages, { role: "ai", text: "Sorry, I am currently unable to reach my servers. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white dark:bg-black rounded-2xl border border-border overflow-hidden shadow-sm animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border bg-zinc-50 dark:bg-zinc-900/50">
        <Link href="/dashboard/consultants" className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-foreground/60">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
            <Bot size={20} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">AI Dermatologist</h2>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-foreground/60">Strictly focused on skin health</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 flex gap-3 text-sm text-amber-800 dark:text-amber-400 mb-6">
          <ShieldAlert size={20} className="flex-shrink-0" />
          <p>
            <strong>Usage Policy:</strong> This AI is strictly guarded to answer only dermatological inquiries. It will actively refuse to engage in general knowledge, coding, or unrelated chat.
          </p>
        </div>

        {messages.map((msg, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.role === "user" ? "bg-zinc-200 dark:bg-zinc-800" : "bg-primary-100 dark:bg-primary-900/50"}`}>
                {msg.role === "user" ? <User size={16} className="text-foreground/70" /> : <Bot size={16} className="text-primary-600 dark:text-primary-400" />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === "user" ? "bg-primary-700 text-white rounded-tr-sm" : "bg-zinc-100 dark:bg-zinc-900 text-foreground rounded-tl-sm border border-border/50"}`}>
                <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[75%]">
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 bg-primary-100 dark:bg-primary-900/50">
                <Bot size={16} className="text-primary-600 dark:text-primary-400" />
              </div>
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-foreground rounded-tl-sm border border-border/50 flex items-center gap-1">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-white dark:bg-black">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about skin health..."
            className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-full py-3.5 pl-6 pr-14 text-sm focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 w-10 h-10 flex items-center justify-center bg-primary-700 text-white rounded-full hover:bg-primary-800 disabled:opacity-50 disabled:hover:bg-primary-700 transition-colors"
          >
            <Send size={18} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
