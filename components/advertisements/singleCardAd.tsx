"use client";

import { useEffect, useState } from "react";
import AdContainer from "./adContainer";

const SingleCardAd = () => {
  const [adId] = useState(`gpt-ad-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    let googletag = (window as any).googletag || { cmd: [] };
    googletag.cmd.push(() => {
      // Define a 300x250 test ad slot from Google's official demo inventory
      const slot = googletag.defineSlot('/6355419/Travel/Europe/France/Paris', [300, 250], adId);
      if (slot) {
        slot.addService(googletag.pubads());
        googletag.enableServices();
        googletag.display(adId);
      }
    });

    return () => {
      // Cleanup for React strict mode
      googletag.cmd.push(() => {
        googletag.destroySlots();
      });
    };
  }, [adId]);

  return (
    <AdContainer className="overflow-hidden flex justify-center bg-gray-50/50 dark:bg-gray-900/50 min-h-[250px]">
      <div id={adId} style={{ minWidth: "300px", minHeight: "250px" }} />
    </AdContainer>
  );
};

export default SingleCardAd;