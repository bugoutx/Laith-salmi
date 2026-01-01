import { CandleStick } from "./CandleStick";

export const CandleBackground = () => {
  // Generate an array of 35 candles
  const candles = Array.from({ length: 35 });

  return (
    <div className="absolute inset-0 flex items-end justify-center gap-3 md:gap-5 px-4 pb-24 opacity-60 pointer-events-none overflow-hidden">
      {/* Masking gradient to make them fade at the top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-20" />
      
      {candles.map((_, i) => (
        <CandleStick key={i} delay={i * 0.05} />
      ))}
    </div>
  );
};
