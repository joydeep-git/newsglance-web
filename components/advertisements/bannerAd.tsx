"use client";

import { useEffect, useState } from "react";
import AdContainer from "./adContainer";




const BannerAd = () => {


  const [adId] = useState(`gpt-ad-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const googletag = (window as any).googletag || { cmd: [] };

    googletag.cmd.push(() => {

      const slot = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [728, 90], adId);
      if (slot) {
        slot.addService(googletag.pubads());
        googletag.enableServices();
        googletag.display(adId);
      }
    });

    return () => {
      googletag.cmd.push(() => {
        googletag.destroySlots();
      });
    };
  }, [adId]);



  return (
    <AdContainer className="overflow-hidden w-fit flex justify-center min-h-[90px] mx-auto">
      <div id={adId} style={{ minWidth: "728px", minHeight: "90px" }} />
    </AdContainer>
  );
};

export default BannerAd;