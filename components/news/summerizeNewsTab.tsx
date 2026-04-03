"use client";

import { useEffect, useState } from "react";
import { RainbowButton } from "../ui/rainbow-button";
import { useNewssummary } from "@/hooks/newsHooks";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoginState } from "@/redux/slices/uiSlice";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { markDown } from "@/utils/helperFunctions";
import { setUser } from "@/redux/slices/authSlice";
import { Wand2, ChevronDown, ChevronUp, Sparkles, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";

import AiNotAuthState from "./ai-not-auth-state";
import AiLimitExhaustedState from "./ai-limit-exhausted-state";
import AiErrorState from "./ai-error-state";
import AiSummarySkeleton from "./ai-summary-skeleton";


const SummerizeNews = () => {
  const [summaryOpen, setSummaryOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const newsId = usePathname().replace("/article/", "");
  const { isAuth, user } = useAppSelector((s) => s.auth);

  const showLoginDialog = () => dispatch(setLoginState(true));

  const { data, isLoading, refetch, isError, error } = useNewssummary(newsId);

  const handleGenerate = () => {

    // premium users has unlimited
    if (user && !user.isPremium && user?.newsBalance < 1) {
      toast.error("Daily limit used! Wait till midnight to reset");
      return;
    }
    setSummaryOpen((prev) => !prev);
    if (!data && !isLoading && !summaryOpen) {
      refetch();
    }
  };

  useEffect(() => {
    if (data?.data?.user) dispatch(setUser(data.data.user));
  }, [data, dispatch]);

  // Toast error when failed
  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || "Summary generation failed. Please try again.");
    }
  }, [isError, error]);

  const hasContent = !isLoading && data?.data?.summary;
  // premium users never hit the limit
  const limitExhausted = isAuth && user && !user.isPremium && user.newsBalance < 1;

  return (
    <div className="p-5 space-y-4">

      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-project/10 shrink-0">
          <Wand2 className="h-3.5 w-3.5 text-project" />
        </div>
        <div>
          <p className="text-sm font-medium leading-none">AI Summary</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            100-word digest — no fluff, just facts
          </p>
        </div>

        {isAuth && user && (
          user.isPremium ? (
            <span className="flex items-center gap-1 ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Infinity className="h-4 w-4" /> Unlimited
            </span>
          ) : user.newsBalance > 0 ? (
            <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full bg-project/10 text-project border border-project/20">
              {user.newsBalance} left today
            </span>
          ) : null
        )}
      </div>

      {!isAuth || !user ? (
        <AiNotAuthState
          onLogin={showLoginDialog}
          description="Get an AI-powered 100-word summary"
        />
      ) : limitExhausted ? (
        <AiLimitExhaustedState description="Your free AI summaries reset at midnight. Upgrade for unlimited access." />
      ) : (
        <RainbowButton
          variant="outline"
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          <Wand2 className="h-3.5 w-3.5" />
          {isLoading
            ? "Generating…"
            : summaryOpen
            ? "Hide summary"
            : "Summarize with AI"}
          {!isLoading && (
            summaryOpen ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )
          )}
        </RainbowButton>
      )}

      {summaryOpen && (
        <div
          className={cn(
            "rounded-xl border border-border/50 overflow-hidden",
            "bg-linear-to-br from-muted/40 via-muted/20 to-transparent"
          )}
        >
          <div className="px-4 py-3 border-b border-border/40 bg-muted/30 flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-project" />
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              AI Summary
            </span>
          </div>

          <div className="p-4">
            {isLoading && !data ? (
              <AiSummarySkeleton />
            ) : isError && error ? (
              <AiErrorState
                message={error.message}
                onRetry={() => refetch()}
              />
            ) : hasContent ? (
              <div
                className="text-sm leading-7 text-foreground/90 prose prose-sm max-w-none
                  prose-p:my-1 prose-p:text-foreground/90
                  prose-strong:text-foreground prose-strong:font-semibold"
                dangerouslySetInnerHTML={{
                  __html: markDown(data.data.summary),
                }}
              />
            ) : null}
          </div>
        </div>
      )}

    </div>
  );
};

export default SummerizeNews;
