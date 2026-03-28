"use client";

import { useEffect } from "react";
import { RainbowButton } from "../ui/rainbow-button";
import { useNewsAudio } from "@/hooks/newsHooks";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoginState } from "@/redux/slices/uiSlice";
import { usePathname } from 'next/navigation';
import { toast } from "sonner";
import { setUser } from "@/redux/slices/authSlice";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { setAudioFile } from "@/redux/slices/newsSlice";



const AudioNews = () => {

  const dispatch = useAppDispatch();

  const newsId = usePathname().replace("/article/", "");

  const { isAuth, user } = useAppSelector(s => s.auth);

  const showLoginDialog = () => {
    dispatch(setLoginState(true));
  };


  const { data, isLoading, refetch, isError, error } = useNewsAudio(newsId);


  const generateAudio = () => {

    if (!user) {
      showLoginDialog();
      return;
    }

    if (user && user?.audioBalance < 1) {
      toast.error("Daily limit used! Wait till midnight to reset");
      return;
    }

    refetch();

  }


  useEffect(() => {

    if (data?.data?.user) {
      dispatch(setUser(data.data.user));
    }

    if (data?.data.audio) {
      dispatch(setAudioFile(data.data.audio));
    }

  }, [data]);


  return (
    <div className="p-4 border-b border-border/60">


      {
        (isAuth && user)
          ? (
            user.audioBalance > 0
              ? <RainbowButton disabled={isLoading} variant="outline" onClick={generateAudio}>
                {isLoading ? "Generating audio..." : "Generate Audio"}
              </RainbowButton>
              : (
                <div>
                  <p className="text-sm text-muted-foreground">Daily limit used! For unlimited audio generation upgrade to <Link href="/pricing" className={buttonVariants({ size: "sm" })}>Newsglance Plus+ </Link></p>
                </div>
              )
          )
          : <RainbowButton variant="outline" onClick={showLoginDialog}>Login to generate audio</RainbowButton>
      }

      {
        isLoading && <p className="text-xs text-project mt-4">Audio will autoplay once generated</p>
      }


      <p className="text-xs text-muted-foreground mt-4">
        Listen to the article in AI voice. No Fuzz, just NEWS.
      </p>

      {
        isError && error &&
        (
          <p className="text-project text-md">
            Error: {error.message}
          </p>
        )
      }

    </div>
  )

};

export default AudioNews;


