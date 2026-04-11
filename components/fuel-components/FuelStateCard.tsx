import { FuelDataType } from "@/types/globalTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Fuel, Droplets, MapPin } from "lucide-react";


const FuelStateCard = ({ item }: { item: FuelDataType }) => {

  const petrol = parseFloat(item.petrol);
  const diesel = parseFloat(item.diesel);

  return (
    <Card className="border-border/50 bg-card/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group py-0">
      <CardContent className="p-4 flex flex-col gap-3">

        {/* State name */}
        <div className="flex items-center gap-1.5">
          <MapPin className="size-3.5 text-muted-foreground shrink-0" />
          <h3 className="text-sm font-semibold text-foreground truncate">{item.state}</h3>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-2">

          {/* Petrol */}
          <div className="rounded-lg p-2.5 bg-emerald-500/10 border border-emerald-500/10 group-hover:bg-emerald-500/15 transition-colors flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <Fuel className="size-3 text-emerald-500 shrink-0" />
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Petrol</span>
            </div>
            <p className="text-base font-black text-emerald-600 dark:text-emerald-400 leading-none">
              ₹{isNaN(petrol) ? item.petrol : petrol.toFixed(2)}
            </p>
            <span className="text-[9px] text-muted-foreground">per litre</span>
          </div>

          {/* Diesel */}
          <div className="rounded-lg p-2.5 bg-amber-500/10 border border-amber-500/10 group-hover:bg-amber-500/15 transition-colors flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <Droplets className="size-3 text-amber-500 shrink-0" />
              <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">Diesel</span>
            </div>
            <p className="text-base font-black text-amber-600 dark:text-amber-400 leading-none">
              ₹{isNaN(diesel) ? item.diesel : diesel.toFixed(2)}
            </p>
            <span className="text-[9px] text-muted-foreground">per litre</span>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default FuelStateCard;
