'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SmallCandle = ({ delay = 0 }: { delay?: number }) => {
  const [metrics, setMetrics] = useState({ 
    wickHeight: 20, 
    bodyHeight: 8, 
    bodyPosition: 6,
    isPositive: true 
  });

  useEffect(() => {
    const initialWickHeight = Math.floor(Math.random() * 12) + 15;
    const initialBodyHeight = Math.floor(Math.random() * 6) + 6;
    const initialBodyPosition = Math.floor(Math.random() * (initialWickHeight - initialBodyHeight));
    
    setMetrics({
      wickHeight: initialWickHeight,
      bodyHeight: initialBodyHeight,
      bodyPosition: initialBodyPosition,
      isPositive: Math.random() > 0.3,
    });

    const interval = setInterval(() => {
      const newWickHeight = Math.floor(Math.random() * 15) + 12;
      const newBodyHeight = Math.floor(Math.random() * 8) + 4;
      const newBodyPosition = Math.floor(Math.random() * (newWickHeight - newBodyHeight));
      
      setMetrics({
        wickHeight: newWickHeight,
        bodyHeight: newBodyHeight,
        bodyPosition: newBodyPosition,
        isPositive: Math.random() > 0.3,
      });
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-end w-2 h-16 relative">
      {/* The Wick */}
      <motion.div
        animate={{ height: metrics.wickHeight }}
        transition={{ type: "spring", stiffness: 30, damping: 25, delay }}
        className="w-[1px] bg-zinc-400/70 absolute bottom-0"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      />
      
      {/* The Body */}
      <motion.div
        initial={false}
        animate={{
          height: metrics.bodyHeight,
          bottom: metrics.bodyPosition,
          backgroundColor: metrics.isPositive ? "#22C55E" : "#EF4444",
          boxShadow: metrics.isPositive 
            ? "0 0 4px rgba(34, 197, 94, 0.3)" 
            : "0 0 4px rgba(239, 68, 68, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 30, damping: 25, delay: delay + 0.1 }}
        className="w-1.5 absolute z-10 border border-white/10"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      />
    </div>
  );
};

export default function CandleDivider() {
  // Generate an array of candles for divider
  const candles = Array.from({ length: 20 });

  return (
    <div className="relative w-full py-4 overflow-hidden">
      {/* Background - same as sections */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black" />
      
      {/* Candles container */}
      <div className="relative z-10 flex items-end justify-center gap-2 md:gap-3 px-4 opacity-60 pointer-events-none">
        {candles.map((_, i) => (
          <SmallCandle key={i} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}

