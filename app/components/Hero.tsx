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
          <div className="w-full flex flex-col">
            
            {/* Mobile Image - First on mobile, hidden on desktop */}
            <div className="lg:hidden relative z-20 w-full mb-8 order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
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

            {/* Mobile Quote - After image on mobile, hidden on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:hidden relative z-20 w-full mb-8 order-2"
            >
              <div className="relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-3 sm:p-4 text-center" dir="rtl">
                {/* Quote mark */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute -top-1 -right-2 text-xl text-green-500/30 font-serif leading-none"
                >
                  "
                </motion.div>

                {/* Quote text */}
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed mb-2 px-3"
                >
                  أؤمن أن الأسواق بطبيعتها متطورة، وأن علم فهمها لا يقف عند حد، لذلك أحرص دائماً على التطور المستمر ومن يكون إلى جانبي في هذا المسار يواكب هذا التطور بوعي وانتقاء خالياً من الإزعاج.
                </motion.blockquote>

                {/* Closing quote mark */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="absolute -bottom-1 -left-2 text-xl text-green-500/30 font-serif leading-none transform rotate-180"
                >
                  "
                </motion.div>

                {/* Attribution */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-1"
                >
                  <div className="w-6 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mx-auto mb-1" />
                  <p className="text-[10px] sm:text-xs text-zinc-400 font-medium">
                    — ليث السالمي
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Content Side - Right side (opposite of image on desktop), order-3 on mobile */}
            <div className="text-right space-y-6 sm:space-y-8 lg:pr-12 relative z-30 order-3 lg:order-1">
              {/* Eyebrow text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm font-medium tracking-wide text-zinc-400 uppercase"
              >
                Technical Analysis • Commodities, Stocks & FX Markets
              </motion.p>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
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
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-base sm:text-lg md:text-xl leading-relaxed text-zinc-300"
                dir="rtl"
              >
                التحليل الفني للمستثمرين، التجار، المضاربين، بما في ذلك صناديق التحوط، صناديق الاستثمار المشتركة، المستشارين الماليين والناس العاديين
              </motion.p>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-400"
                dir="ltr"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">CFTe</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-zinc-600" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">+6 Years Experience</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-zinc-600" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">Swing Trading Specialist</span>
                </div>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
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

      {/* Desktop Quote - Bottom Center (only visible on desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="hidden lg:block absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-xl px-4"
      >
        <div className="relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-3 sm:p-4 text-center" dir="rtl">
          {/* Quote mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="absolute -top-1 -right-2 text-xl text-green-500/30 font-serif leading-none"
          >
            "
          </motion.div>

          {/* Quote text */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed mb-2 px-3"
          >
            أؤمن أن الأسواق بطبيعتها متطورة، وأن علم فهمها لا يقف عند حد، لذلك أحرص دائماً على التطور المستمر ومن يكون إلى جانبي في هذا المسار يواكب هذا التطور بوعي وانتقاء خالياً من الإزعاج.
          </motion.blockquote>

          {/* Closing quote mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="absolute -bottom-1 -left-2 text-xl text-green-500/30 font-serif leading-none transform rotate-180"
          >
            "
          </motion.div>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="mt-1"
          >
            <div className="w-6 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mx-auto mb-1" />
            <p className="text-[10px] sm:text-xs text-zinc-400 font-medium">
              — ليث السالمي
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
