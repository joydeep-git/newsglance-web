import { Lock, LockOpen } from "lucide-react";
import { AiNotAuthStateProps } from "@/types/newsTypes";
import { Button } from "../ui/button";


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

      <Button className="mt-6" size={"sm"} type="button" variant="destructive" onClick={onLogin}>
        Login to unlock <LockOpen />
      </Button>
    </div>
  )
}

export default AiNotAuthState;
