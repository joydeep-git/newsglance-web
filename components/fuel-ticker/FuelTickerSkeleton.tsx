import { Skeleton } from "@/components/ui/skeleton";


const FuelTickerSkeleton = () => (
  <div className="w-full flex items-center gap-6 px-6 py-[5px] overflow-hidden">
    {Array.from({ length: 7 }).map((_, i) => (
      <Skeleton
        key={i}
        className="h-3.5 rounded-full shrink-0"
        style={{
          width: `${72 + (i % 4) * 20}px`,
          opacity: Math.max(0.2, 1 - i * 0.12),
        }}
      />
    ))}
  </div>
);

export default FuelTickerSkeleton;
