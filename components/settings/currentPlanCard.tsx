import { motion } from "motion/react";
import { Crown, Zap, Newspaper, Headphones, CalendarDays, RefreshCw, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dateUtlity from "@/utils/dateUtility";
import { Separator } from "@/components/ui/separator";



const CurrentPlanCard = ({
  isPremium,
  planExpiryDate,
  newsBalance,
  audioBalance,
  onPurchase,
  isPurchasing,
}: {
  isPremium: boolean;
  planExpiryDate: Date | null;
  newsBalance: number;
  audioBalance: number;
  onPurchase: () => void;
  isPurchasing: boolean;
}) => {

  const expiryStr = dateUtlity.formatDateTime(planExpiryDate || new Date());

  const isExpired = isPremium && planExpiryDate && new Date(planExpiryDate) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card
        className={`overflow-hidden border max-w-lg ${isPremium
          ? "border-amber-300/60 dark:border-amber-700/40"
          : "border-border/60"
          }`}
      >
        {/* Premium gradient banner */}
        {isPremium && (
          <div className="h-1 w-full bg-linear-to-r from-amber-400 via-yellow-300 to-amber-500" />
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">

            <div className="flex items-center gap-2.5 ">
              <div
                className={`p-2 rounded-lg ${isPremium
                  ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                  : "bg-muted text-muted-foreground"
                  }`}
              >
                {isPremium ? (
                  <Crown className="w-5 h-5" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
              </div>
              <div>
                <CardTitle className="text-base leading-tight">
                  {isPremium ? "Premium Plan" : "Free Plan"}
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  {isPremium
                    ? "Full access to all NewsGlance features"
                    : "Limited access — upgrade for more"}
                </CardDescription>
              </div>
            </div>

            <Badge
              variant={isPremium ? "default" : "secondary"}
              className={`text-xs shrink-0 ${isPremium
                ? "bg-amber-500 hover:bg-amber-500 text-white border-0"
                : ""
                }`}
            >
              {isPremium ? (
                <>
                  <Sparkles className="w-3 h-3 mr-1" />
                  Active
                </>
              ) : (
                "Free"
              )}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Balances */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 rounded-lg border bg-muted/30 px-3 py-2.5">
              <Newspaper className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground leading-tight">News Credits</p>
                <p className="text-sm font-semibold text-foreground">{newsBalance}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg border bg-muted/30 px-3 py-2.5">
              <Headphones className="w-4 h-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground leading-tight">Audio Credits</p>
                <p className="text-sm font-semibold text-foreground">{audioBalance}</p>
              </div>
            </div>
          </div>

          {/* Expiry */}
          {isPremium && (
            <div
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs border ${isExpired
                ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
                : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400"
                }`}
            >
              <CalendarDays className="w-3.5 h-3.5 shrink-0" />
              {isExpired ? (
                <span>Plan expired on <strong>{expiryStr}</strong>. Renew to restore access.</span>
              ) : (
                <span>Valid until <strong>{expiryStr}</strong></span>
              )}
            </div>
          )}

          <Separator />

          {/* CTA */}
          {isPremium && !isExpired ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              You&apos;re on Premium. Contact support for plan changes.
            </div>
          ) : (
            <Button
              onClick={onPurchase}
              disabled={isPurchasing}
              className={`w-full gap-2 ${isPremium
                ? ""
                : "bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0"
                }`}
              variant={isPremium ? "default" : "default"}
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Setting up payment...
                </>
              ) : isPremium ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Renew Plan
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4" />
                  Upgrade to Premium
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};


export default CurrentPlanCard;