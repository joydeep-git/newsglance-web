import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";


const FuelHero = () => {
  return (
    <div className="flex flex-col items-center text-center gap-3">

      {/* Live badge */}
      <div className="inline-flex items-center gap-1.5 border border-border/60 bg-card/70 rounded-full px-3 py-1 text-xs text-muted-foreground">
        <span className="relative flex size-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
        </span>
        Live Prices · Updated Daily
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
        <AnimatedGradientText colorFrom="#CC0000" colorTo="#ff9e3d" speed={0.8}>
          Fuel Prices
        </AnimatedGradientText>
        {" "}
        <span className="text-foreground">Across India</span>
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
        Petrol &amp; diesel prices for every state and union territory. Refreshed daily.
      </p>

    </div>
  );
};

export default FuelHero;
