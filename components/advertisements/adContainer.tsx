import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";


const AdContainer = ({ children, className }: { children: ReactNode; className?: string; }) => {

  return (
    <div className={cn(`my-3 border border-project relative`, className)}>

      <Badge className="bg-project -left-1 rounded-none absolute -top-2 z-50">
        Ad
      </Badge>

      {children}

    </div>
  )

}

export default AdContainer;