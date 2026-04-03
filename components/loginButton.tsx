import React from "react";
import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const LoginButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-sm border bg-background p-1 px-5 text-center font-semibold",
        className,
      )}
      {...props}
    >

      <div className="block">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-project transition-all duration-300 group-hover:scale-[100.8]"></div>
          <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 font-jakarta">
            Login
          </span>
        </div>
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-100">
          <span className="font-jakarta">Login</span>
          <ChevronsRight className="size-5" />
        </div>
      </div>
    </button>
  );
});

LoginButton.displayName = "LoginButton";
