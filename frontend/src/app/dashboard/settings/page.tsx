"use client";

import { UserProfile, SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl w-full">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-foreground/60 mt-1">Manage your account, security, and profile details.</p>
      </div>

      <div className="w-full overflow-hidden rounded-2xl glass-card">
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "w-full",
              cardBox: "w-full shadow-none border-none",
              card: "w-full shadow-none border-none bg-transparent rounded-none",
              navbar: "border-r border-border",
              headerTitle: "text-foreground font-bold",
              headerSubtitle: "text-foreground/60",
              profileSectionTitleText: "text-foreground font-bold",
              profileSectionPrimaryButton: "text-primary-600 hover:text-primary-700 hover:bg-primary-50",
            }
          }}
        />
      </div>

      <div className="glass-card p-6 border-red-500/20">
        <h2 className="text-xl font-bold mb-2 text-red-500">Danger Zone</h2>
        <p className="text-sm text-foreground/60 mb-6">Log out of your account securely from this device.</p>
        <SignOutButton>
          <button className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 px-6 py-2.5 rounded-xl font-bold transition-all">
            <LogOut size={16} /> Log Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
