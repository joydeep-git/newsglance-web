import { Button } from "@/components/ui/button";
import { RefreshCw, XCircle } from "lucide-react";
import { motion } from "motion/react";

const ErrorView = ({ onRetry }: { onRetry: () => void }) => {

  return (
    <motion.div className="flex flex-col items-center gap-5 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center ring-2 ring-red-200 dark:ring-red-800">
        <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
      </div>
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          Verification Failed
        </h1>
        <p className="text-sm text-muted-foreground">
          Unable to retrieve your payment status. Please try again.
        </p>
      </div>
      <Button variant="outline" size="sm" className="gap-2 mt-1" onClick={onRetry}>
        <RefreshCw className="w-3.5 h-3.5" />
        Retry
      </Button>
    </motion.div>
  )

}


export default ErrorView;