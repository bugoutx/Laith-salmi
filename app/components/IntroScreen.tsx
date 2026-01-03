'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function IntroScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide intro screen after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          onClick={handleClick}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating circles */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            
            {/* Animated lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <motion.line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <motion.line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0" />
                  <stop offset="50%" stopColor="#22C55E" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center px-6">
            {/* Decorative elements */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="w-12 h-px bg-green-500/50"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
              <motion.div
                className="w-12 h-px bg-green-500/50"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            {/* Main text */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-50 mb-6 leading-tight"
              dir="rtl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="block"
              >
                ابقَ بعيدًا عن الإزعاج
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="block text-green-400 mt-2"
              >
                مع ليث السالمي
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-zinc-400 text-sm sm:text-base mt-8"
              dir="rtl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              اضغط للمتابعة
            </motion.p>

            {/* Loading indicator */}
            <motion.div
              className="flex justify-center gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Fade out overlay */}
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.3] }}
            transition={{ duration: 3, times: [0, 0.8, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

