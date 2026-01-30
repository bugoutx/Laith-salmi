'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function MethodologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-12 lg:py-16 overflow-hidden"
    >
      {/* Background with flowing elements */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
        {/* Animated flowing lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <motion.path
            d="M0,400 Q300,200 600,400 T1200,400"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,300 Q400,100 800,300 T1200,300"
            stroke="url(#flowGradient2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0" />
              <stop offset="50%" stopColor="#22C55E" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
            <span className="text-sm font-medium tracking-wide text-zinc-400 uppercase">المنهجية المتكاملة</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-6"
            dir="rtl"
          >
            رحلة التطوير المهني
            <br />
            <span className="text-green-500">خطوة بخطوة</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed"
            dir="rtl"
          >
            منهجية شاملة متسلسلة لتأخذك من مبتدئ الى محترف في عالم تحليل والتداول في الاسواق المالية
          </motion.p>
        </motion.div>

        {/* Key Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16"
        >
          {/* 1. وضوح في اتخاذ القرار */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 lg:p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 hover:border-green-500/30 transition-all duration-300"
          >
            <div className="space-y-4 text-right" dir="rtl">
              <div className="flex items-center gap-3">
                <div className="text-2xl">1️⃣</div>
                <h3 className="text-xl lg:text-2xl font-bold text-zinc-50">
                  وضوح في اتخاذ القرار
                </h3>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                أساعدك على قراءة السوق بطريقة منظّمة وبسيطة،
                تقيّم فيها المعطيات والأدلة قبل أي قرار،
                لتعرف متى يكون الدخول مناسبًا ومتى يكون الانتظار أفضل.
              </p>
            </div>
          </motion.div>

          {/* 2. منهجية مرنة تتكيّف مع السوق */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="p-6 lg:p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 hover:border-green-500/30 transition-all duration-300"
          >
            <div className="space-y-4 text-right" dir="rtl">
              <div className="flex items-center gap-3">
                <div className="text-2xl">2️⃣</div>
                <h3 className="text-xl lg:text-2xl font-bold text-zinc-50">
                  منهجية مرنة تتكيّف مع السوق
                </h3>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                لا أقدّم أسلوبًا واحدًا جامدًا،
                بل منهجية مرنة تتعامل مع تطورات الأسواق،
                وتبقى فعّالة في كل المراحل دون الحاجة لتطوير وتغيير أسلوبك باستمرار.
              </p>
            </div>
          </motion.div>

          {/* 3. تقليل التشتت والأخطاء */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="p-6 lg:p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 hover:border-green-500/30 transition-all duration-300"
          >
            <div className="space-y-4 text-right" dir="rtl">
              <div className="flex items-center gap-3">
                <div className="text-2xl">3️⃣</div>
                <h3 className="text-xl lg:text-2xl font-bold text-zinc-50">
                  تقليل التشتت والأخطاء
                </h3>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                المنهجية مبنية على المبادئ والاخلاقيات الصحيحة للتحليل الفني،
                وتركيزها على الاتجاهات الرئيسية الواضحة،
                ما يساعدك على الابتعاد عن التعقيد،
                وتقليل الأخطاء الناتجة عن كثرة التفاصيل.
              </p>
            </div>
          </motion.div>

          {/* 4. تحويل التداول إلى مشروع واضح */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="p-6 lg:p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 hover:border-green-500/30 transition-all duration-300"
          >
            <div className="space-y-4 text-right" dir="rtl">
              <div className="flex items-center gap-3">
                <div className="text-2xl">4️⃣</div>
                <h3 className="text-xl lg:text-2xl font-bold text-zinc-50">
                  تحويل التداول إلى مشروع واضح
                </h3>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                أساعدك على بناء منظومة تداول متكاملة،
                تتضمن إدارة الوقت، المخاطر، والأهداف،
                بحيث لا تتأثر نتائجك بصفقة واحدة،
                ويصبح التداول مشروعًا منظمًا لا عبئًا يوميًا.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center mt-16"
        >
          <Link href="/contact" tabIndex={-1}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">ابدأ المنهجية الآن</span>
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
