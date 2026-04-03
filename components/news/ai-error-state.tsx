import { AiErrorStateProps } from "@/types/newsTypes";
import { AlertTriangle, RefreshCcw } from "lucide-react";


const AiErrorState = ({ message, onRetry }: AiErrorStateProps) => {

  return (
    <div className="flex flex-col gap-2.5 py-1">
      <div className="flex items-start gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-destructive/10 border border-destructive/20 shrink-0">
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </div>
        <div>
          <p className="text-sm font-semibold text-destructive">Generation failed</p>
          <p className="text-xs text-muted-foreground mt-0.5">{message}</p>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border/60 bg-background hover:bg-muted transition-colors w-fit"
      >
        <RefreshCcw className="h-3 w-3" />
        Try again
      </button>
    </div>
  )
}

export default AiErrorState;
