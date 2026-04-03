import { Loader2 } from "lucide-react"
import { motion } from "motion/react";

const LoadingView = () => {

  return (
    <motion.div
        className="flex flex-col items-center gap-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center ring-2 ring-border">
          <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Verifying Payment
          </h1>
          <p className="text-sm text-muted-foreground">
            Please wait while we confirm your transaction...
          </p>
        </div>
      </motion.div>
  )

}

export default LoadingView;