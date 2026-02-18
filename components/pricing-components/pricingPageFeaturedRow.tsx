import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";




function PricingPageFeatureRow({ text, included, }: { text: string; included: boolean; }) {

  // animation position control
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };


  // const isPremium = useAppSelector((state) => state.auth.user?.isPremium);


  return (
    <motion.li
      variants={item}
      className={cn(
        "flex items-center gap-3 text-sm",
        included ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {included ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
          <Check className="h-3 w-3" />
        </span>
      ) : (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <X className="h-3 w-3" />
        </span>
      )}
      <span className={!included ? "line-through" : ""}>{text}</span>
    </motion.li>
  );
}

export default PricingPageFeatureRow;