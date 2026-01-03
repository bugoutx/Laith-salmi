'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-12 lg:py-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
        {/* Subtle animated elements */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-40 h-40 border border-green-500/10 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-24 h-24 border border-green-500/5 rotate-45"
          animate={{
            rotate: [45, 405],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        
        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-8"
        >
          {/* Quote mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl text-green-500/20 font-serif leading-none"
          >
            "
          </motion.div>

          {/* Main philosophy text */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-200 leading-relaxed space-y-4"
            dir="rtl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="block"
            >
              أؤمن أن الأسواق بطبيعتها متطورة،
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="block"
            >
              وأن علم فهمها لا يقف عند حد،
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="block"
            >
              لذلك أحرص على التطوّر المستمر،
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="block"
            >
              ومن يكون إلى جانبي في هذا المسار
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="block text-green-400"
            >
              يواكب هذا التطوّر بوعي وانتقاء.
            </motion.span>
          </motion.blockquote>

          {/* Closing quote mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-6xl text-green-500/20 font-serif leading-none transform rotate-180"
          >
            "
          </motion.div>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="pt-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-4" />
            <p className="text-zinc-400 font-medium">
              ليث السالمي
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              محلل فني معتمد - CFTe I
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
