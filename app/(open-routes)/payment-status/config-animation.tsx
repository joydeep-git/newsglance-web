import { PaymentStatusConfigType, PaymentStatusType } from "@/types/paymentTypes";
import { CheckCircle2, Clock, XCircle } from "lucide-react";


export const STATUS_CONFIG: Record<PaymentStatusType, PaymentStatusConfigType> = {

  SUCCESS: {
    icon: <CheckCircle2 className="w-10 h-10" />,
    title: "Payment Successful",
    description: "Your subscription is now active. You're all set!",
    note: "Visit Settings → Billing to view your subscription validity and transaction history.",
    badgeVariant: "default",
    badgeLabel: "Confirmed",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    ringColor: "ring-emerald-200 dark:ring-emerald-800",
  },
  PENDING: {
    icon: <Clock className="w-10 h-10" />,
    title: "Payment Pending",
    description: "We're verifying your payment. We'll update your account as soon as it's confirmed.",
    note: "This usually takes a few seconds. You can safely close this page — we'll notify you once done.",
    badgeVariant: "secondary",
    badgeLabel: "Processing",
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
    iconColor: "text-amber-600 dark:text-amber-400",
    ringColor: "ring-amber-200 dark:ring-amber-800",
  },
  FAILED: {
    icon: <XCircle className="w-10 h-10" />,
    title: "Payment Failed",
    description: "We couldn't process your payment. Please try again.",
    note: "If any amount was deducted, it will be automatically refunded to your bank within 3–5 business days.",
    badgeVariant: "destructive",
    badgeLabel: "Failed",
    iconBg: "bg-red-50 dark:bg-red-950/40",
    iconColor: "text-red-600 dark:text-red-400",
    ringColor: "ring-red-200 dark:ring-red-800",
  },

};




export const containerVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};


export const iconVariants = {
  hidden: { scale: 0, rotate: -15 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20, delay: 0.15 },
  },
};


export const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + i * 0.07, duration: 0.35, ease: "easeOut" as const },
  }),
};

export const pulseVariants = {
  animate: {
    scale: [1, 1.18, 1],
    opacity: [0.35, 0.08, 0.35],
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const },
  },
};
