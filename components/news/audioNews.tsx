"use client";

import { useEffect } from "react";
import { RainbowButton } from "../ui/rainbow-button";
import { useNewsAudio } from "@/hooks/newsHooks";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoginState } from "@/redux/slices/uiSlice";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { setUser } from "@/redux/slices/authSlice";
import { setAudioFile } from "@/redux/slices/newsSlice";
import { Headphones, Radio, Loader2, Infinity } from "lucide-react";

import AiNotAuthState from "./ai-not-auth-state";
import AiLimitExhaustedState from "./ai-limit-exhausted-state";
import AiErrorState from "./ai-error-state";
import AiWaveformLoader from "./ai-waveform-loader";


const AudioNews = () => {


  const dispatch = useAppDispatch();
  const newsId = usePathname().replace("/article/", "");
  const { isAuth, user } = useAppSelector((s) => s.auth);

  const audioFile = useAppSelector((s) => s.news.audioFile);

  const showLoginDialog = () => dispatch(setLoginState(true));

  const { data, isLoading, refetch, isError, error } = useNewsAudio(newsId);

  const generateAudio = () => {

    if (!user) {
      showLoginDialog();
      return;
    }

    if (!user.isPremium && user.audioBalance < 1) {
      toast.error("Daily audio limit used! Wait till midnight to reset");
      return;
    }


    // if cached data then refetch directly or replace the old file
    if (data?.data?.audio) {
      dispatch(setAudioFile(data.data.audio));
      return;
    }

    refetch();

  };


  useEffect(() => {
    if (data?.data?.user) dispatch(setUser(data.data.user));
    if (data?.data?.audio) dispatch(setAudioFile(data.data.audio));
  }, [data]);


  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || "Audio generation failed. Please try again.");
    }
  }, [isError, error]);


  // premium users has unlimited
  const limitExhausted = isAuth && user && !user.isPremium && user.audioBalance < 1;

  // audio is ready
  const audioReady = !isLoading && data?.data?.audio && audioFile !== null;

  return (
    <div className="p-5 space-y-4">

      {/* Feature description row */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-project/10 shrink-0">
          <Headphones className="h-3.5 w-3.5 text-project" />
        </div>
        <div>
          <p className="text-sm font-medium leading-none">Audio Narration</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            AI voice — listen hands-free
          </p>
        </div>

        {/* premium badge */}
        {isAuth && user && (
          user.isPremium ? (
            <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <Infinity className="h-4 w-4" /> Unlimited
            </span>
          ) : user.audioBalance > 0 ? (
            <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full bg-project/10 text-project border border-project/20">
              {user.audioBalance} left today
            </span>
          ) : null
        )}
      </div>


      {!isAuth || !user ? (
        <AiNotAuthState
          onLogin={showLoginDialog}
          description="Listen to the article in AI voice"
        />
      ) : limitExhausted ? (
        <AiLimitExhaustedState description="Your free audio generations reset at midnight. Upgrade for unlimited access." />
      ) : (
        <>
          {/* Generate button */}
          {!audioReady && (
            <RainbowButton
              variant="outline"
              disabled={isLoading}
              onClick={generateAudio}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Radio className="h-3.5 w-3.5" />
              )}
              {isLoading ? "Generating…" : "Generate Audio"}
            </RainbowButton>
          )}

          {/* Waveform while loading */}
          {isLoading && <AiWaveformLoader />}

          {/* Success */}
          {audioReady && (
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <Headphones className="h-3.5 w-3.5 shrink-0" />
              <span>Playing in the player below</span>
            </div>
          )}

          {/* Error */}
          {isError && error && (
            <AiErrorState message={error.message} onRetry={() => refetch()} />
          )}
        </>
      )}

    </div>
  );
};

export default AudioNews;
