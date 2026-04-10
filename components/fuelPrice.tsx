"use client";

import { useFuelPrice } from "@/hooks/utilityHooks";
import FuelTickerSkeleton from "./fuel-ticker/FuelTickerSkeleton";
import FuelTickerStrip from "./fuel-ticker/FuelTickerStrip";


const FuelPrice = () => {

  const { data, isLoading, isError } = useFuelPrice();

  // on error dont show
  if (isError) return null;

  // skeleton
  if (isLoading) {
    return (
      <div className="w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <FuelTickerSkeleton />
      </div>
    );
  }

  const items = data?.data ?? [];

  if (items.length === 0) return null;

  return <FuelTickerStrip items={items} />;

};

export default FuelPrice;