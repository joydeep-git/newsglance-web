"use client";

import { useVerifyPayment } from "@/hooks/paymentHooks";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Loader2, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoadingView from "./loading-view";
import ErrorView from "./error-view";
import StatusView from "./status-view";
import { containerVariants } from "./config-animation";
import { useAppDispatch } from "@/redux/store";
import { setUser } from "@/redux/slices/authSlice";
import { confettiFireworks } from "@/components/celebration-confetti";



const PaymentStatus = () => {

  const router = useRouter();

  const dispatch = useAppDispatch();

  const order_id = useSearchParams().get("id");

  const { data, isLoading, isError, refetch } = useVerifyPayment(order_id!);

  const paymentStatus = data?.data?.paymentStatus;

  const isResolved = !isLoading && !!paymentStatus;

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError || !order_id) return <ErrorView onRetry={() => refetch()} />;
    if (paymentStatus) return <StatusView status={paymentStatus} />;
    return <LoadingView />;
  };


  useEffect(() => {
    if (paymentStatus === "SUCCESS" && data?.data?.user) {
      dispatch(setUser(data?.data.user));
      confettiFireworks();
    }
  }, [paymentStatus, data]);



  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center ring-2 ring-border">
          <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
        </div>
      </div>
    } >

      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm"
        >
          <Card className="shadow-lg border-border/60">
            <CardContent className="pt-8 pb-6 px-6 flex flex-col items-center gap-6">

              {/* Status area */}
              {renderContent()}

              {/* Order ID block */}
              {order_id && isResolved && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="w-full"
                >
                  <Separator className="mb-4" />
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <ReceiptText className="w-3.5 h-3.5 shrink-0" />
                      Order ID
                    </span>
                    <span className="font-mono bg-muted px-2 py-1.5 rounded text-foreground/70 break-all leading-relaxed">
                      {order_id}
                    </span>
                  </div>
                </motion.div>
              )}

            </CardContent>

            <CardFooter className="px-6 pb-6 pt-0 flex flex-col gap-2">
              <motion.div
                className="w-full flex flex-col gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
              >
                {/* Go to Billing — shown on success */}
                <Button
                  className="w-full"
                  onClick={() => router.push("/settings?tab=subscription")}>
                  Go to Subscription
                </Button>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => router.push("/")}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

    </Suspense>
  )
};

export default PaymentStatus;