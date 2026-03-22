import { ChevronRight, Headphones, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const AiTabs = ({ title }: { title: string }) => {

  const [summaryOpen, setSummaryOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 border-b border-border/60 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-project" />
        <span className="text-sm font-semibold">AI Features</span>
        <span className="ml-auto text-[10px] bg-project/10 text-project font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Beta</span>
      </div>

      {/* Summarize */}
      <div className="p-4 border-b border-border/60">

        <Button onClick={() => setSummaryOpen((v) => !v)} className="w-full flex items-center gap-3 group" >

          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-project/10 text-project shrink-0 group-hover:bg-project group-hover:text-white transition-colors">
            <Sparkles className="h-4 w-4" />
          </div>

          <div className="text-left flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Summarize</p>
            <p className="text-[11px] text-muted-foreground">60-80 word summary</p>
          </div>

          <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${summaryOpen ? "rotate-90" : ""}`} />

        </Button>


        {summaryOpen && (
          <div className="mt-3 rounded-lg bg-muted/60 border border-border/40 p-3">
            <p className="text-xs text-muted-foreground italic text-center py-4">
              AI summarization coming soon.<br />
              <span className="text-project font-medium">Backend integration in progress.</span>
            </p>
          </div>
        )}

      </div>


      {/* Audio */}
      <div className="p-4">

        <Button className="w-full flex items-center gap-3 group opacity-60 cursor-not-allowed">

          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted shrink-0">
            <Headphones className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="text-left flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Listen to Article</p>
            <p className="text-[11px] text-muted-foreground">Generate audio · coming soon</p>
          </div>

        </Button>

      </div>

    </div>
  );
}

export default AiTabs;
