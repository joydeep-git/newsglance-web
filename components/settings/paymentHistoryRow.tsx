import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PaymentHistoryType, PaymentMetaType, PaymentStatusType } from "@/types/paymentTypes";
import dateUtlity from "@/utils/dateUtility";



const PaymentHistoryRow = ({ tx }: { tx: PaymentHistoryType }) => {


  const statusMeta: Record<PaymentStatusType, PaymentMetaType> = {
    SUCCESS: {
      label: "Success",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      badge: "default",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    PENDING: {
      label: "Pending",
      icon: <Clock className="w-3.5 h-3.5" />,
      badge: "secondary",
      color: "text-amber-600 dark:text-amber-400",
    },
    FAILED: {
      label: "Failed",
      icon: <XCircle className="w-3.5 h-3.5" />,
      badge: "destructive",
      color: "text-red-600 dark:text-red-400",
    },
  };

  const meta = statusMeta[tx.status];

  const formatCurrency = (amount: number, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  }

  return (
    <div className="flex items-center gap-3 py-3 text-sm border-b border-border/50 last:border-0">
      {/* Icon */}
      <div className={`shrink-0 ${meta.color}`}>{meta.icon}</div>

      {/* Order info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate leading-tight">
          {tx.plan ?? "Premium Subscription"}
        </p>
        <p className="text-xs text-muted-foreground font-mono mt-0.5 truncate">
          {tx.orderId}
        </p>
      </div>

      {/* Date */}
      <div className="hidden sm:block shrink-0 text-right">
        <p className="text-xs text-muted-foreground">{dateUtlity.formatDateTime(tx.createdAt)}</p>
      </div>

      {/* Amount + badge */}
      <div className="shrink-0 text-right space-y-1">
        <p className="font-semibold text-foreground text-sm">
          {formatCurrency(tx.amount, tx.currency)}
        </p>
        <Badge variant={meta.badge} className="text-[10px] px-2 py-0 gap-1">
          {meta.icon}
          {meta.label}
        </Badge>
      </div>
    </div>
  );
};


export default PaymentHistoryRow;