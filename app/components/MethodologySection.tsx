'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function MethodologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const methodologySteps = [
    {
      id: 1,
      phase: 'المرحلة الأولى',
      title: 'بناء الأساس',
      subtitle: 'مهارة التحليل الفني',
      description: 'أقدّم لك مهارة التحليل الفني من أساسها الصحيح، لتصبح قادرًا على قراءة السوق والفرص بنفسك، وبناء قراراتك بوضوح، بعيدًا عن الإزعاج وتضارب الآراء الخارجية.',
      outcome: 'امتلاك أداة فكرية ومهارية يمكنك البناء عليها كمسار طويل المدى في الأسواق المالية.',
      color: 'from-blue-500/20 to-cyan-500/20',
      accentColor: 'blue-500'
    },
    {
      id: 2,
      phase: 'المرحلة الثانية',
      title: 'التخصص العميق',
      subtitle: 'منهجية تأهيل تاجر المعادن',
      description: 'أعمل على نقل خبرتي العملية في أسواق المعادن، وتحويلها إلى منهجية متكاملة لتأهيلك كتاجر معادن، من فهم حركة أسعار المعادن، وإدارة المخاطر، وصولًا إلى كيفية اتخاذ القرار بثبات وهدوء.',
      outcome: 'منهج واضح ومتكامل، لا يحتاج بعده إلى تعدد أساليب أو مصادر، بل يركّز على التطبيق الواعي والاستمرارية.',
      color: 'from-amber-500/20 to-yellow-500/20',
      accentColor: 'amber-500'
    },
    {
      id: 3,
      phase: 'المرحلة الثالثة',
      title: 'التطبيق العملي',
      subtitle: 'التوجيه والمتابعة المباشرة',
      description: 'أقدّم حصص تقوية مباشرة تُبنى على احتياجك الفعلي، نُعالج فيها نقاط الضعف، ونُعزّز الجوانب التي تحتاجها في مرحلتك الحالية، مع إمكانية المتابعة المباشرة بعد الجلسات حتى الوصول إلى هدفك.',
      outcome: 'أنت لا تُترك بعد الجلسة، بل تُوجَّه حتى يتحقق الفهم والتطبيق العملي.',
      color: 'from-green-500/20 to-emerald-500/20',
      accentColor: 'green-500'
    },
    {
      id: 4,
      phase: 'المرحلة الرابعة',
      title: 'الشراكة الاستثمارية',
      subtitle: 'شراكة واعية مع المستثمر',
      description: 'للمستثمرين، أقدّم متابعة مباشرة مبنية على شرح مبسّط لما يقدّمه السوق من أدلة، وما يمكن أن يترتب عليها من سيناريوهات محتملة، بعيدًا عن ردّات الفعل والقرارات العشوائية.',
      outcome: 'تعامل احترافي مع السوق بعقلية استثمارية هادئة ومستدامة.',
      color: 'from-purple-500/20 to-indigo-500/20',
      accentColor: 'purple-500'
    }
  ];

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
            منهجية شاملة مصممة لتأخذك من المبتدئ إلى المحترف في عالم تحليل أسواق المعادن
          </motion.p>
        </motion.div>

        {/* Methodology Timeline */}
        <div className="relative">
          {/* Central flowing line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/30 via-green-500/60 to-green-500/30 transform -translate-x-1/2 hidden lg:block" />
          
          {methodologySteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6 + (index * 0.2),
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={`relative mb-16 lg:mb-24 ${index % 2 === 0 ? 'lg:pl-1/2' : 'lg:pr-1/2'}`}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Timeline node */}
              <motion.div
                className="absolute left-1/2 top-8 w-6 h-6 bg-green-500 rounded-full transform -translate-x-1/2 hidden lg:flex items-center justify-center z-20"
                animate={{
                  scale: activeStep === step.id ? 1.5 : 1,
                  boxShadow: activeStep === step.id 
                    ? "0 0 20px rgba(34, 197, 94, 0.6)" 
                    : "0 0 10px rgba(34, 197, 94, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>

              {/* Content container */}
              <div className={`relative lg:w-5/12 ${index % 2 === 0 ? 'lg:ml-auto lg:pl-12' : 'lg:mr-auto lg:pr-12'}`}>
                <motion.div
                  className={`relative p-8 lg:p-10 rounded-2xl bg-gradient-to-br ${step.color} backdrop-blur-sm border border-zinc-800/50 overflow-hidden group`}
                  animate={{
                    scale: activeStep === step.id ? 1.02 : 1,
                    borderColor: activeStep === step.id ? `rgb(34 197 94 / 0.3)` : `rgb(39 39 42 / 0.5)`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Floating number - always opposite side of title */}
                  <motion.div
                    className="absolute top-4 left-4 text-6xl font-bold text-zinc-600/30 group-hover:text-zinc-500/50 transition-colors duration-500"
                    animate={{
                      rotate: activeStep === step.id ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.id.toString().padStart(2, '0')}
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 space-y-6 text-right" dir="rtl">
                    {/* Phase and title */}
                    <div className="mb-6">
                      <p className="text-sm text-green-500/80 font-medium mb-1">
                        {step.phase}
                      </p>
                      <h3 className="text-xl lg:text-2xl font-bold text-zinc-50 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-base text-green-400 font-medium">
                        {step.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <motion.p
                      className="text-zinc-300 leading-relaxed text-base"
                      animate={{
                        y: activeStep === step.id ? -5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.description}
                    </motion.p>

                    {/* Outcome */}
                    <motion.div
                      className="p-4 rounded-lg bg-zinc-800/30 border-r-4 border-green-500/50"
                      initial={{ opacity: 0.7 }}
                      animate={{
                        opacity: activeStep === step.id ? 1 : 0.7,
                        x: activeStep === step.id ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        <span className="text-green-400 font-medium">النتيجة: </span>
                        {step.outcome}
                      </p>
                    </motion.div>

                    {/* Progress indicator */}
                    <motion.div
                      className="flex items-center gap-2 pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeStep === step.id ? 1 : 0.6 }}
                      transition={{ duration: 0.3 }}
                    >
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full transition-all duration-500 ${
                            i < step.id 
                              ? 'bg-green-500 w-8' 
                              : 'bg-zinc-700 w-4'
                          }`}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    animate={{
                      scale: activeStep === step.id ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-center mt-16"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
