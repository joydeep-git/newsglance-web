"use client";

import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { useFuelPrice } from "@/hooks/utilityHooks";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Info } from "lucide-react";
import FuelPageSkeleton from "./fuelPageSkeleton";
import FuelHero from "@/components/fuel-components/FuelHero";
import FuelHighlights from "@/components/fuel-components/FuelHighlights";
import FuelStateGrid from "@/components/fuel-components/FuelStateGrid";


const FuelPage = () => {

  const { data, isPending, isError, refetch } = useFuelPrice();

  const items = data?.data ?? [];

  return (
    <MaxWidthWrapper className="relative">

      {/* Background dot pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <DotPattern width={24} height={24} cr={0.8} className="opacity-20 text-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="py-10 space-y-10 relative">

        {/* Hero */}
        <FuelHero />

        {/* Loading */}
        {isPending && <FuelPageSkeleton />}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
            <Info className="size-10 opacity-30" />
            <p className="text-sm">Failed to load fuel prices.</p>
            <button
              onClick={() => refetch()}
              className="text-xs underline underline-offset-4 hover:text-foreground transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        {!isPending && !isError && items.length > 0 && (
          <>
            {/* Highest / lowest highlights */}
            <FuelHighlights items={items} />

            {/* All states */}
            <FuelStateGrid items={items} />

            {/* Disclaimer */}
            <p className="text-center text-[11px] text-muted-foreground/50 pb-4">
              Prices are indicative. Verify with your nearest fuel station.
            </p>
          </>
        )}

      </div>
    </MaxWidthWrapper>
  );
};

export default FuelPage;