import { PaymentStatusType } from "@/types/paymentTypes";
import { contentVariants, iconVariants, pulseVariants, STATUS_CONFIG } from "./config-animation";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";


const StatusView = ({ status }: { status: PaymentStatusType }) => {


  const config = STATUS_CONFIG[status];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        className="flex flex-col items-center gap-5 text-center"
        initial="hidden"
        animate="visible"
      >
        {/* Icon with pulsing ring */}
        <motion.div variants={iconVariants} className="relative">
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className={`absolute inset-0 rounded-full ${config.iconBg} ring-4 ${config.ringColor}`}
          />
          <div
            className={`relative w-20 h-20 rounded-full flex items-center justify-center ring-2 ${config.ringColor} ${config.iconBg} ${config.iconColor}`}
          >
            {status === "PENDING" ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                {config.icon}
              </motion.div>
            ) : (
              config.icon
            )}
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div custom={0} variants={contentVariants}>
          <Badge
            variant={config.badgeVariant}
            className="text-xs px-3 py-0.5 rounded-full"
          >
            {config.badgeLabel}
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1}
          variants={contentVariants}
          className="text-xl font-semibold text-foreground tracking-tight"
        >
          {config.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          custom={2}
          variants={contentVariants}
          className="text-sm text-muted-foreground leading-relaxed max-w-[280px]"
        >
          {config.description}
        </motion.p>

        {/* Contextual note */}
        <motion.p
          custom={3}
          variants={contentVariants}
          className="text-xs text-muted-foreground/75 leading-relaxed max-w-[280px] bg-muted/50 rounded-lg px-3 py-2 border border-border/40"
        >
          {config.note}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};


export default StatusView;