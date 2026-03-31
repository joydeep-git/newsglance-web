"use client";

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Play, Pause, FastForward, X, Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AudioPlayerType } from '@/types/globalTypes';


const fmt = (s: number) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};


const AudioPlayer = ({ audioTrack, onClose }: AudioPlayerType): ReactNode => {

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying]   = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  

  // isSeeking for when user is moving or loading after move
  const [isSeeking, setIsSeeking]   = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [sliderValue, setSliderValue] = useState(0);

  const isDragging = useRef(false);


  // autoplay when a new audio 
  useEffect(() => {
    if (audioTrack && audioRef.current) {
      setIsLoading(true);
      setCurrentTime(0);
      setSliderValue(0);
      audioRef.current.play().catch(e => console.error("Playback prevented:", e));
      setIsPlaying(true);
    }
  }, [audioTrack]);


  if (!audioTrack) return null;


  const togglePlay = () => {

    if (!audioRef.current) return;

    if (isPlaying) {

      audioRef.current.pause();
      setIsPlaying(false);

    } else {

      audioRef.current.play();
      setIsPlaying(true);

    }
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
    setSliderValue(audioRef.current.currentTime);
  };

  const handleClose = () => {
    if (audioRef.current) audioRef.current.pause();
    onClose();
  };


  const handleTimeUpdate = () => {
    if (isDragging.current) return;
    const t = audioRef.current?.currentTime || 0;
    setCurrentTime(t);
    setSliderValue(t);
  };


  const handleSliderDrag = (val: number[]) => {
    isDragging.current = true;
    setSliderValue(val[0]);
    setCurrentTime(val[0]);
  };


  const handleSliderCommit = (val: number[]) => {

    isDragging.current = false;

    if (!audioRef.current) return;

    setIsSeeking(true);

    audioRef.current.currentTime = val[0];

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  };


  return (
    <>
      <audio
        ref={audioRef}
        src={audioTrack.url}
        onWaiting={() => { setIsLoading(true); }}
        onCanPlay={() => { setIsLoading(false); setIsSeeking(false); }}
        onPlaying={() => { setIsLoading(false); setIsSeeking(false); }}
        onSeeking={() => setIsSeeking(true)}
        onSeeked={() => setIsSeeking(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="fixed z-50 bg-background shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5
          /* MOBILE: Full width bottom bar */
          bottom-0 left-0 right-0 w-full border-t p-3 flex flex-row items-center justify-between gap-3 rounded-none
          /* DESKTOP: Bottom right card */
          sm:bottom-6 sm:right-6 sm:left-auto sm:w-[360px] sm:rounded-xl sm:border sm:p-5 sm:flex-col sm:items-stretch sm:gap-3"
      >

        {/* Top Section and Close Button */}
        <div className="flex items-center justify-between w-full overflow-hidden sm:w-auto">

          <div className="flex items-center gap-3 overflow-hidden">
            <div className="hidden sm:flex w-10 h-10 bg-primary/10 rounded-md items-center justify-center shrink-0">
              <Volume2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">
                {audioTrack.name || "Audio Track"}
              </span>
              {/* Current time + duration shown on desktop in row */}
              <span className="hidden sm:block text-[10px] text-muted-foreground mt-0.5 tabular-nums">
                {fmt(currentTime)} / {fmt(duration)}
              </span>
            </div>
          </div>

          {/* Close Button */}
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 shrink-0 rounded-full hover:bg-destructive/10 hover:text-destructive">
            <X className="h-4 w-4" />
          </Button>

        </div>


        {/* Progress Bar - desktop */}
        <div className="hidden sm:block space-y-1.5">
          <div className="relative">
            <Slider
              value={[sliderValue]}
              max={duration || 100}
              step={0.1}
              onValueChange={(val) => handleSliderDrag(val)}
              onValueCommit={(val) => handleSliderCommit(val)}
              className="cursor-pointer"
            />

            {/* buffering */}
            {isSeeking && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <Loader2 className="h-3 w-3 animate-spin text-project" />
                  <span className="text-[10px] text-muted-foreground">Loading…</span>
                </div>
              </div>
            )}
          </div>

          {/* Time row */}
          <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums px-0.5">
            <span>{fmt(currentTime)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>


        {/* Bottom Section: Controls */}
        <div className="flex items-center justify-center gap-2 sm:justify-between sm:px-4">

          {/* Backward 5s */}
          <Button variant="ghost" size="icon" onClick={() => skip(-5)} className="h-8 w-8 shrink-0">
            <FastForward className="h-4 w-4 rotate-180 text-muted-foreground hover:text-foreground" />
            <span className="sr-only">Skip back 5 seconds</span>
          </Button>

          {/* Play / Pause / Loading */}
          <Button onClick={togglePlay} disabled={isLoading || isSeeking} size="icon" className="h-10 w-10 rounded-full shrink-0 shadow-md">
            {isLoading || isSeeking ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 translate-x-px" />
            )}
          </Button>

          {/* Forward 5s */}
          <Button variant="ghost" size="icon" onClick={() => skip(5)} className="h-8 w-8 shrink-0">
            <FastForward className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            <span className="sr-only">Skip forward 5 seconds</span>
          </Button>

        </div>


        {/* Mobile time display */}
        <span className="sm:hidden text-[10px] text-muted-foreground tabular-nums shrink-0">
          {fmt(currentTime)}/{fmt(duration)}
        </span>

      </div>
    </>
  );
}


export default AudioPlayer;