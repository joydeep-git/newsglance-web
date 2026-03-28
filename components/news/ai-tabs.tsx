import SummerizeNews from "./summerizeNewsTab";
import AudioNews from "./audioNews";
import { Sparkles } from "lucide-react";

const AiTabs = () => {


  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">

      {/* Header */}
      <div className="px-4 py-3 border-b border-border/60 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-project" />
        <span className="text-sm font-semibold">AI Features</span>
      </div>

      {/* Summarize */}
      <SummerizeNews />


      {/* Audio */}
      <AudioNews />

    </div>
  );
}

export default AiTabs;
