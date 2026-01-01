"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CandleStick = ({ delay = 0 }) => {
  const [metrics, setMetrics] = useState({ 
    wickHeight: 60, 
    bodyHeight: 30, 
    bodyPosition: 15,
    isPositive: true 
  });

  useEffect(() => {
    // Initial random state - bigger sizes
    const initialWickHeight = Math.floor(Math.random() * 60) + 60;
    const initialBodyHeight = Math.floor(Math.random() * 30) + 20;
    const initialBodyPosition = Math.floor(Math.random() * (initialWickHeight - initialBodyHeight));
    
    setMetrics({
      wickHeight: initialWickHeight,
      bodyHeight: initialBodyHeight,
      bodyPosition: initialBodyPosition,
      isPositive: Math.random() > 0.3, // Biased toward green
    });

    const interval = setInterval(() => {
      const newWickHeight = Math.floor(Math.random() * 70) + 50;
      const newBodyHeight = Math.floor(Math.random() * 35) + 15;
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
    <div className="flex flex-col items-center justify-end w-4 h-48 relative">
      {/* The Wick (Thin vertical line) */}
      <motion.div
        animate={{ height: metrics.wickHeight }}
        transition={{ type: "spring", stiffness: 30, damping: 25, delay }}
        className="w-[1px] bg-zinc-400/70 absolute bottom-0"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      />
      
      {/* The Body (Rectangle) */}
      <motion.div
        initial={false}
        animate={{
          height: metrics.bodyHeight,
          bottom: metrics.bodyPosition,
          backgroundColor: metrics.isPositive ? "#22C55E" : "#EF4444",
          boxShadow: metrics.isPositive 
            ? "0 0 8px rgba(34, 197, 94, 0.3)" 
            : "0 0 8px rgba(239, 68, 68, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 30, damping: 25, delay: delay + 0.1 }}
        className="w-3 absolute z-10 border border-white/10"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      />
    </div>
  );
};
