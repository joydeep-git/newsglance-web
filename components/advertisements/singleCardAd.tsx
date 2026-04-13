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

const SingleCardAd = () => {

  const { user } = useAppSelector((s) => s.auth);
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const run = () => {
      if (typeof window.aclib !== "undefined" && adRef.current) {
        initialized.current = true;
        window.aclib.runBanner({ zoneId: "11188954" });
      }
    };

    if (typeof window.aclib !== "undefined") {
      run();
    } else {
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
    <AdContainer>
      <div ref={adRef} />
    </AdContainer>
  );
};

export default SingleCardAd;