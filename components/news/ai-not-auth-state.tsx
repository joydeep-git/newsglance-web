import { Lock } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { AiNotAuthStateProps } from "@/types/newsTypes";


const AiNotAuthState = ({ onLogin, description }: AiNotAuthStateProps) => {


  return (
    <div className="flex flex-col items-start gap-3 py-1">
      <div className="flex items-center gap-2.5 text-muted-foreground">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted border border-border/60">
          <Lock className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Sign in required</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <RainbowButton variant="outline" size="sm" onClick={onLogin}>
        <Lock className="h-3.5 w-3.5" />
        Login to unlock
      </RainbowButton>
    </div>
  )
}

export default AiNotAuthState;
