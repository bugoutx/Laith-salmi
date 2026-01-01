'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CandleBackground } from './CandleBackground';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 1. Background with solid dark colors - Lowest layer */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black z-0">
        {/* Animated green glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-20, 20, -20],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* 2. Background Image - Left Side - Middle layer (Desktop only) */}
      {/* NOTE: avoid `inset-0` here because in RTL `left + right + width` can anchor to the right */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 overflow-hidden z-[15] pointer-events-none">
        <div className="relative w-full h-full bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
          {/* Gradient overlay for seamless blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
          
          {/* The actual image */}
          <Image
            src="/laith2.png"
            alt="Laith Salmi - Technical Analyst"
            fill
            className="object-cover object-right"
            priority
          />
        </div>
      </div>

      {/* 3. The Candlestick Background Layer - Above image (Desktop only) */}
      <div className="hidden lg:block absolute inset-0 z-20">
        <CandleBackground />
      </div>

      {/* 4. Bottom gradient glow - seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent z-25 pointer-events-none" />

      {/* 5. Main content layer - Highest layer */}
      <div className="relative z-30 flex min-h-screen items-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-0">
        <div className="w-full lg:w-1/2 lg:me-auto max-w-3xl">
          <div className="w-full">
            
            {/* Content Side - Right side (opposite of image on desktop) */}
            <div className="text-right space-y-6 sm:space-y-8 lg:pr-12 relative z-30">
              {/* Eyebrow text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm font-medium tracking-wide text-zinc-400 uppercase"
              >
                Technical Analysis • Gold & Silver Markets
              </motion.p>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-zinc-50"
                dir="rtl"
              >
                قراءة السوق ليست توقعًا
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                بل{' '}
                <span className="text-green-500">فهمًا</span>{' '}
                للسلوك
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-base sm:text-lg md:text-xl leading-relaxed text-zinc-300"
              >
                محلل تقني متخصص في أسواق الذهب والفضة، أقدم تحليلات دقيقة مبنية على الخبرة والمنهجية العلمية
              </motion.p>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-400"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">CFTe I Certified</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-zinc-600" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">+6 Years Experience</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-zinc-600" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">Gold & Silver Specialist</span>
                </div>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                {/* Primary CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/25 text-sm sm:text-base"
                >
                  ابدأ من هنا
                </motion.button>
                
                {/* Secondary CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-zinc-600 hover:border-green-500 text-zinc-300 hover:text-green-400 font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
                >
                  الخدمات
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Image - After CTA, requires scrolling */}
      <div className="lg:hidden relative z-20 w-full px-4 sm:px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-gradient-radial from-zinc-900 via-zinc-950 to-black"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
          
          {/* The actual image */}
          <Image
            src="/laith2.png"
            alt="Laith Salmi - Technical Analyst"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
