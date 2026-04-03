"use client";

import { useState, KeyboardEvent } from "react";
import { Search, TrendingUp, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";


const trendingTopics = [
  "AI Regulation",
  "Federal Reserve",
  "Olympic Legacy",
  "Climate Summit",
  "Tech M&A",
  "Elections 2025",
  "Stock Market",
  "Cricket World Cup",
];


export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const submitSearch = (raw: string) => {
    const term = raw.trim();
    if (!term) return;
    // Replace spaces with + for clean URL params
    const encoded = term.replace(/\s+/g, "+");
    router.push(`/?search=${encoded}`);
    handleClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitSearch(query);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        showCloseButton={false}
        className="p-0 gap-0 max-w-2xl w-full overflow-hidden rounded-2xl shadow-2xl"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Search News</DialogTitle>

        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search stories, topics, sections…"
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full hover:bg-accent/60 transition-colors text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => submitSearch(query)}
            disabled={!query.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-project text-white text-xs font-semibold hover:bg-project/85 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Search className="h-3.5 w-3.5" />
            Search
          </button>
        </div>

        {/* Trending Topics */}
        <div className="px-4 py-4">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            <TrendingUp className="h-3.5 w-3.5" />
            Trending Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => submitSearch(topic)}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-accent/70 hover:bg-project hover:text-white transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
