"use client";

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Play, Pause, FastForward, X, Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAppSelector } from '@/redux/store';
import { AudioPlayerType } from '@/types/globalTypes';



const AudioPlayer = ({ audioTrack, onClose }: AudioPlayerType): ReactNode => {

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);


  // Auto-play when a new track is loaded
  useEffect(() => {
    if (audioTrack && audioRef.current) {
      setIsLoading(true);
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
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onClose();
  };


  return (
    <>
      <audio
        ref={audioRef}
        src={audioTrack.url}
        // Loading states
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onPlaying={() => setIsLoading(false)}
        // Time states
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="fixed z-50 bg-background shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5
          /* MOBILE: Full width bottom bar */
          bottom-0 left-0 right-0 w-full border-t p-3 flex flex-row items-center justify-between gap-3 rounded-none
          /* DESKTOP: Bottom right card */
          sm:bottom-6 sm:right-6 sm:left-auto sm:w-[340px] sm:rounded-xl sm:border sm:p-5 sm:flex-col sm:items-stretch sm:gap-4"
      >

        {/* Top Section: Info & Close Button */}
        <div className="flex items-center justify-between w-full overflow-hidden sm:w-auto">

          <div className="flex items-center gap-3 overflow-hidden">
            <div className="hidden sm:flex w-10 h-10 bg-primary/10 rounded-md items-center justify-center shrink-0">
              <Volume2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">
                {audioTrack.name || "Audio Track"}
              </span>
            </div>
          </div>

          {/* Close Button (X) */}
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8 shrink-0 rounded-full hover:bg-destructive/10 hover:text-destructive">
            <X className="h-4 w-4" />
          </Button>

        </div>


        {/* Middle Section: Progress Bar */}
        <div className="hidden sm:flex items-center gap-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            // Updates UI smoothly while dragging
            onValueChange={(val) => setCurrentTime(val[0])}
            // Commits the time to the actual audio file when user releases the mouse
            onValueCommit={(val) => {
              if (audioRef.current) audioRef.current.currentTime = val[0];
            }}
            className="cursor-pointer"
          />
        </div>

        {/* Bottom Section: Controls */}
        <div className="flex items-center justify-center gap-2 sm:justify-between sm:px-4">

          {/* Backward 5s (Rotated FastForward) */}
          <Button variant="ghost" size="icon" onClick={() => skip(-5)} className="h-8 w-8 shrink-0">
            <FastForward className="h-4 w-4 rotate-180 text-muted-foreground hover:text-foreground" />
            <span className="sr-only">Skip back 5 seconds</span>
          </Button>

          {/* Play / Pause / Loading */}
          <Button onClick={togglePlay} disabled={isLoading} size="icon" className="h-10 w-10 rounded-full shrink-0 shadow-md">
            {isLoading ? (
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
      </div>
    </>
  )
}


export default AudioPlayer;