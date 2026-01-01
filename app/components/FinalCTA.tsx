'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 lg:py-24 overflow-hidden"
    >
      {/* Background with enhanced elements */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
        
        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        
        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-8"
        >
          {/* Eyebrow text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
            <span className="text-sm font-medium tracking-wide text-zinc-400 uppercase">ابدأ الآن</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
          </motion.div>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 leading-tight"
            dir="rtl"
          >
            ابقَ بعيدًا عن الإزعاج
            <br />
            <span className="text-green-500">مع ليث السالمي</span>
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed"
            dir="rtl"
          >
            اكتسب المهارات الحقيقية في تحليل أسواق المعادن، وابنِ قراراتك الاستثمارية بوضوح وثقة
          </motion.p>

          {/* Value propositions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 py-8"
          >
            <div className="flex items-center gap-3 text-zinc-400" dir="rtl">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-medium">منهجية متكاملة</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400" dir="rtl">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-medium">متابعة مباشرة</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400" dir="rtl">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-medium">خبرة +6 سنوات</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-green-500/30 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                ابدأ رحلتك معي الآن
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 border-2 border-zinc-600 hover:border-green-500 text-zinc-300 hover:text-green-400 font-semibold text-lg rounded-xl transition-all duration-300 hover:bg-green-500/5"
            >
              تعرّف على الخدمات
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-8 border-t border-zinc-800/50"
          >
            <p className="text-sm text-zinc-500 mb-4">معتمد من الاتحاد الدولي للمحللين الفنيين</p>
            <div className="flex justify-center items-center gap-2">
              <div className="px-4 py-2 bg-zinc-800/30 rounded-lg border border-zinc-700/30">
                <span className="text-xs font-medium text-zinc-400">CFTe I Certified</span>
              </div>
              <div className="px-4 py-2 bg-zinc-800/30 rounded-lg border border-zinc-700/30">
                <span className="text-xs font-medium text-zinc-400">IFTA Member</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
    </section>
  );
}
