"use client";

import { FuelDataType } from "@/types/globalTypes";
import { Marquee } from "@/components/ui/marquee";
import FuelChip from "./FuelChip";
import { useRouter } from "next/navigation";


const FuelTickerStrip = ({ items }: { items: FuelDataType[]; }) => {

  const router = useRouter();

  return (
    <div onClick={() => router.push("/fuel")} className="w-full border-b py-1 border-border/40 backdrop-blur-sm relative"
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
