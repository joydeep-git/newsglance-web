import { FuelDataType } from "@/types/globalTypes";
import { Droplets, Fuel, MapPin } from "lucide-react";
import { Separator } from "../ui/separator";


const FuelChip = ({ item }: { item: FuelDataType; }) => (

  <span className="inline-flex items-center gap-3 mr-10 shrink-0 select-none">

    {/* State */}
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground/60 uppercase tracking-wider">
      <MapPin className="h-2.5 w-2.5 text-foreground/35 shrink-0" />
      {item.state}
    </span>

    {/* Petrol */}
    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
      <Fuel className="h-3 w-3 shrink-0" />
      <span className="text-foreground/45 font-normal">Petrol</span>
      ₹{item.petrol}
    </span>

    {/* Diesel */}
    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
      <Droplets className="h-3 w-3 shrink-0" />
      <span className="text-foreground/45 font-normal">Diesel</span>
      ₹{item.diesel}
    </span>

    {/* Separator */}
    <Separator orientation="vertical" className="ml-6" />

  </span>
);

export default FuelChip;
