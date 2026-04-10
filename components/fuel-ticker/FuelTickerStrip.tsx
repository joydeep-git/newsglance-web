"use client";

import { FuelDataType } from "@/types/globalTypes";
import { Marquee } from "@/components/ui/marquee";
import FuelChip from "./FuelChip";


const FuelTickerStrip = ({ items }: { items: FuelDataType[]; }) => {

  return (
    <div className="w-full border-b py-1 border-border/40 backdrop-blur-sm relative"
      aria-label="Live fuel price ticker">

      <Marquee pauseOnHover repeat={3} className="py-[5px] p-0 [--duration:120s] [--gap:0rem]">

        {items.map((item) => (
          <FuelChip key={item.state} item={item} />
        ))}

      </Marquee>

    </div>
  );
};

export default FuelTickerStrip;
