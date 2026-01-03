'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const proofCards = [
    {
      id: 'experience',
      title: 'خبرة عملية',
      years: '+6Y',
      content: 'في تحليل الأسواق المالية والتداول في المعادن',
      accent: 'line'
    },
    {
      id: 'certification',
      title: 'CFTe I - IFTA',
      years: '+1Y',
      content: 'اجتياز اختبار المستوى الأول من شهادة المحلل الفني المعتمد من الاتحاد الدولي للمحللين الفنيين',
      accent: 'border'
    },
    {
      id: 'portfolio',
      title: 'إدارة المحافظ',
      years: '2Y+',
      content: 'خبرة سابقة في إدارة المحافظ المالية للمستثمرين',
      accent: 'dot'
    },
    {
      id: 'monitoring',
      title: 'متابعة مباشرة مع مستثمرين',
      years: '2Y+',
      content: 'تقديم تقارير وأحداثيات أسبوعية لأصحاب رؤوس الأموال الكبيرة عن ما يقدمه السوق من فرص وأدلة',
      accent: 'line'
    }
  ];

  const expertiseAreas = [
    'تحليل أسواق',
    'إدارة محافظ', 
    'أسواق المعادن',
    'إدارة المخاطر'
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-12 lg:py-16 overflow-hidden"
    >
      {/* Background - seamless continuation */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
        {/* Subtle horizontal divider */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          {/* Eyebrow text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm font-medium tracking-wide text-zinc-500 uppercase mb-4"
          >
            الثقة تُبنى مع الوقت
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-50 mb-4"
            dir="rtl"
          >
            خبرة عملية مع مستثمرين حقيقيين
          </motion.h2>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
            dir="rtl"
          >
            المسؤولية والانضباط في كل خطوة عمل
          </motion.p>
        </motion.div>

        {/* Social Proof Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {proofCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + (index * 0.1),
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="group relative"
            >
              <div className={`
                relative h-full p-6 rounded-xl bg-zinc-900/40 backdrop-blur-sm
                border transition-all duration-300
                ${card.accent === 'border' 
                  ? 'border-green-500/20 hover:border-green-500/40' 
                  : 'border-zinc-800/50 hover:border-zinc-700/50'
                }
              `}>
                {/* Accent elements */}
                {card.accent === 'line' && (
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
                )}
                {card.accent === 'dot' && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-green-500/60 rounded-full" />
                )}

                {/* Card content */}
                <div className="space-y-3 text-right" dir="rtl">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-zinc-200">
                      {card.title}
                    </h3>
                    <span className="text-green-400 font-bold text-lg whitespace-nowrap">
                      {card.years}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {card.content}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expertise Areas Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-12"
        >
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.9 + (index * 0.1),
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="flex items-center gap-2 text-zinc-500 text-sm font-medium"
              dir="rtl"
            >
              <div className="w-1 h-1 bg-green-500/60 rounded-full" />
              <span>{area}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
