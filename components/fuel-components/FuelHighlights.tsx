import { FuelDataType, FuelHighlightEntryType } from "@/types/globalTypes";
import { Card, CardContent } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Fuel, Droplets, TrendingUp, TrendingDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";





const FuelHighlights = ({ items }: { items: FuelDataType[] }) => {

  const petrolList = items.map(i => ({ state: i.state, price: parseFloat(i.petrol) })).filter(i => !isNaN(i.price));
  const dieselList = items.map(i => ({ state: i.state, price: parseFloat(i.diesel) })).filter(i => !isNaN(i.price));

  const highPetrol = petrolList.reduce((a, b) => a.price > b.price ? a : b);
  const lowPetrol  = petrolList.reduce((a, b) => a.price < b.price ? a : b);
  const highDiesel = dieselList.reduce((a, b) => a.price > b.price ? a : b);
  const lowDiesel  = dieselList.reduce((a, b) => a.price < b.price ? a : b);

  const highlights: FuelHighlightEntryType[] = [
    {
      label:      "Highest Petrol",
      state:      highPetrol.state,
      price:      `₹${highPetrol.price.toFixed(2)}`,
      fuelIcon:   Fuel,
      trendIcon:  TrendingUp,
      colorClass: "text-rose-500",
      beamColor:  "#f43f5e",
    },
    {
      label:      "Lowest Petrol",
      state:      lowPetrol.state,
      price:      `₹${lowPetrol.price.toFixed(2)}`,
      fuelIcon:   Fuel,
      trendIcon:  TrendingDown,
      colorClass: "text-emerald-500",
      beamColor:  "#10b981",
    },
    {
      label:      "Highest Diesel",
      state:      highDiesel.state,
      price:      `₹${highDiesel.price.toFixed(2)}`,
      fuelIcon:   Droplets,
      trendIcon:  TrendingUp,
      colorClass: "text-orange-500",
      beamColor:  "#f97316",
    },
    {
      label:      "Lowest Diesel",
      state:      lowDiesel.state,
      price:      `₹${lowDiesel.price.toFixed(2)}`,
      fuelIcon:   Droplets,
      trendIcon:  TrendingDown,
      colorClass: "text-sky-500",
      beamColor:  "#0ea5e9",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {highlights.map((h) => (
        <Card
          key={h.label}
          className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm hover:border-border transition-colors py-0"
        >
          <CardContent className="p-4 flex flex-col gap-2">

            {/* Label */}
            <div className={cn("flex items-center gap-1.5", h.colorClass)}>
              <h.trendIcon className="size-3.5 shrink-0" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {h.label}
              </span>
            </div>

            {/* Price */}
            <p className={cn("text-2xl font-black leading-none", h.colorClass)}>
              {h.price}
            </p>

            {/* State */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="size-3 shrink-0" />
              <span className="text-xs truncate">{h.state}</span>
            </div>

            {/* Decorative fuel icon */}
            <h.fuelIcon className={cn("size-10 opacity-[0.07] absolute bottom-2 right-2", h.colorClass)} />

          </CardContent>

          <BorderBeam size={80} duration={8} colorFrom={h.beamColor} colorTo="transparent" borderWidth={1} />
        </Card>
      ))}
    </div>
  );
};

export default FuelHighlights;
