"use client";

import { load } from "@cashfreepayments/cashfree-js";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/store";
import { useCreatePaymentProduct } from "@/hooks/paymentHooks";
import { Skeleton } from "@/components/ui/skeleton";
import CurrentPlanCard from "./currentPlanCard";
import PaymentHistoryCard from "./paymentHistoryCard";



const SubscriptionSettings = () => {

  const { refetch: createOrder, isLoading: isPurchasing } = useCreatePaymentProduct();

  const { user } = useAppSelector((state) => state.auth);

  const isPremium = user?.isPremium ?? false;

  const checkout = async (paymentSessionId: string) => {
    const cashfree = await load({ mode: "sandbox" });
    cashfree.checkout({ paymentSessionId, redirectTarget: "_self" });
  };

  const handlePurchase = async () => {
    if (isPremium && !(user?.planExpiryDate && new Date(user.planExpiryDate) < new Date())) {
      toast.info("You already have an active Premium plan.");
      return;
    }

    const res = await createOrder();
    if (!res.isSuccess || !res.data?.data?.payment_session_id) {
      toast.error("Failed to start payment. Please try again.");
      return;
    }

    checkout(res.data.data.payment_session_id);
  };

  if (!user) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Subscription & Billing
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your plan, view benefits, and track payment history.
        </p>
      </div>

      {/* Plan card */}
      <CurrentPlanCard
        isPremium={isPremium}
        planExpiryDate={user?.planExpiryDate}
        newsBalance={user.newsBalance}
        audioBalance={user.audioBalance}
        onPurchase={handlePurchase}
        isPurchasing={isPurchasing}
      />

      {/* Payment History */}
      <PaymentHistoryCard />
    </div>
  );
};

export default SubscriptionSettings;
