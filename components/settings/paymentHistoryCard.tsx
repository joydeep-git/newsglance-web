import { useState } from "react";
import { motion } from "motion/react";
import { RefreshCw, ReceiptText, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { usePaymentHistory } from "@/hooks/paymentHooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentHistoryRow from "./paymentHistoryRow";


const PaymentHistoryCard = () => {

  const { data, isLoading, isError, refetch, isFetching } = usePaymentHistory();
  const [showAll, setShowAll] = useState(false);

  const transactions = data?.data ?? [];
  const visible = showAll ? transactions : transactions.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
    >
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ReceiptText className="w-4 h-4 text-muted-foreground" />
              <CardTitle className="text-base">Payment History</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs gap-1.5"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
          <CardDescription>All your subscription transactions</CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <AlertCircle className="w-8 h-8 text-muted-foreground/50" />
              <div>
                <p className="text-sm font-medium text-foreground">Failed to load transactions</p>
                <p className="text-xs text-muted-foreground mt-0.5">Check your connection and try again</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </Button>
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <ReceiptText className="w-8 h-8 text-muted-foreground/40" />
              <div>
                <p className="text-sm font-medium text-foreground">No transactions yet</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your payment history will appear here after your first purchase.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div>
                {visible.map((tx) => (
                  <PaymentHistoryRow key={tx.id} tx={tx} />
                ))}
              </div>

              {transactions.length > 5 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3 gap-1.5 text-xs text-muted-foreground"
                  onClick={() => setShowAll((v) => !v)}
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" />
                      Show all {transactions.length} transactions
                    </>
                  )}
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};


export default PaymentHistoryCard;