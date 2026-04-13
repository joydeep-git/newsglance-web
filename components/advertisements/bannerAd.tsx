"use client";

import { useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/store";
import AdContainer from "./adContainer";

declare global {
  interface Window {
    aclib?: {
      runBanner: (options: { zoneId: string }) => void;
    };
  }
}

const BannerAd = () => {

  const { user } = useAppSelector((s) => s.auth);
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const run = () => {
      if (typeof window.aclib !== "undefined" && adRef.current) {
        initialized.current = true;
        window.aclib.runBanner({ zoneId: "11188918" });
      }
    };

    // If aclib is already loaded, run immediately
    if (typeof window.aclib !== "undefined") {
      run();
    } else {
      // Poll until aclib is ready (it loads async)
      const interval = setInterval(() => {
        if (typeof window.aclib !== "undefined") {
          clearInterval(interval);
          run();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  if (user && user?.isPremium) return null;

  return (
    <AdContainer className="h-[90px] max-w-[728px]">
      <div ref={adRef} />
    </AdContainer>
  );
};

export default BannerAd;