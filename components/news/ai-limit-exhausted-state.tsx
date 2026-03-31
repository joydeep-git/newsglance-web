import { Clock, Zap } from "lucide-react";
import Link from "next/link";


const AiLimitExhaustedState = ({ description }: { description: string; }) => {

  return (
    <div className="flex flex-col gap-3 py-1">
      <div className="flex items-start gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 shrink-0 mt-0.5">
          <Clock className="h-4 w-4 text-amber-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Daily limit reached</p>
          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-project text-white hover:bg-project/90 transition-colors"
        >
          <Zap className="h-3 w-3" />
          Upgrade to Plus+
        </Link>
        <span className="text-xs text-muted-foreground">Resets at midnight</span>
      </div>
    </div>
  )

}

export default AiLimitExhaustedState;
