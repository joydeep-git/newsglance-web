"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { RainbowButton } from "../ui/rainbow-button";
import { useNewssummary } from "@/hooks/newsHooks";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoginState } from "@/redux/slices/uiSlice";
import { usePathname } from 'next/navigation';
import { toast } from "sonner";
import { markDown } from "@/utils/helperFunctions";
import { setUser } from "@/redux/slices/authSlice";
import Link from "next/link";
import { buttonVariants } from "../ui/button";


const SummerizeNews = () => {

  const [summaryOpen, setSummaryOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const newsId = usePathname().replace("/article/", "");

  const { isAuth, user } = useAppSelector(s => s.auth);

  const showLoginDialog = () => {
    dispatch(setLoginState(true));
  };

  const { data, isLoading, refetch, isError, error } = useNewssummary(newsId);


  const print = () => {

    if (user && user?.newsBalance < 1) {
      toast.error("Daily limit used! Wait till midnight to reset");
      return;
    }

    setSummaryOpen(!summaryOpen);

    if (!data && !isLoading && !summaryOpen) {
      refetch();
    }

  };


  useEffect(() => {

    if (data?.data?.user) {
      dispatch(setUser(data.data.user));
    }

  }, [data]);


  return (
    <div className="p-4 border-b border-border/60">

      {
        (isAuth && user)
          ? (
            user.newsBalance > 0 ? (
              <RainbowButton variant="outline" onClick={print}>
                Summerize news with AI
                {summaryOpen ? <ChevronDown /> : <ChevronRight />}
              </RainbowButton>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground">Daily limit used! For unlimited news summarization upgrade to <Link href="/pricing" className={buttonVariants({ size: "sm" })}>Newsglance Plus+ </Link></p>
              </div>
            )
          )
          : (
            <RainbowButton variant="outline" onClick={showLoginDialog}>
              Login to generate AI summary
              {summaryOpen ? <ChevronDown /> : <ChevronRight />}
            </RainbowButton>
          )
      }

      <p className="text-xs text-muted-foreground mt-4">
        Summerize news in 100 words using AI. No Fuzz, easy to read.
      </p>

      {
        summaryOpen &&
        <div className="mt-4 rounded-lg bg-muted/60 border border-border/40 p-3">
          <p className={`text-lg leading-relaxed py-4 ${isLoading ? "animate-pulse text-muted-foreground" : ""}`}>
            {isLoading && !data
              ? "Generating summary..."
              : <div dangerouslySetInnerHTML={{ __html: markDown(data?.data.summary) }} />
            }

            {
              isError && error &&
              (
                <p className="text-project text-md">
                  Error: {error.message}
                </p>
              )
            }
          </p>
        </div>
      }

    </div>
  );

};

export default SummerizeNews;
