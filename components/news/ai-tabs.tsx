"use client";

import { useState } from "react";
import SummerizeNews from "./summerizeNewsTab";
import AudioNews from "./audioNews";
import { Sparkles, FileText, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "summary", label: "Summarize", icon: FileText },
  { id: "audio",   label: "Audio",     icon: Headphones },
] as const;

type TabId = (typeof TABS)[number]["id"];

const AiTabs = () => {

  const [activeTab, setActiveTab] = useState<TabId>("summary");

  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">


      <div className="px-5 py-4 border-b border-border/60 bg-linear-to-r from-project/5 via-transparent to-transparent flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-project/10">
            <Sparkles className="h-3.5 w-3.5 text-project" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">AI Features</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Powered by {activeTab === "summary" ? "Gemini" : "AWS Polly" }</p>
          </div>
        </div>

        
        {/* tab selector */}
        <div className="flex items-center gap-1 bg-muted/60 rounded-lg p-1 border border-border/40">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                activeTab === id
                  ? "bg-background shadow-sm text-foreground border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          ))}
        </div>
      </div>

      
      <div className="transition-all">
        {activeTab === "summary" ? <SummerizeNews /> : <AudioNews />}
      </div>

    </div>
  );
};

export default AiTabs;
