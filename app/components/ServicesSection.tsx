'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

interface Service {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  valueProposition: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('فشل تحميل الخدمات');
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-12 lg:py-16 overflow-hidden"
    >
      {/* Background with animated elements */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-green-500/10 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 border border-green-500/5 rotate-45"
          animate={{
            rotate: [45, 405],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          {/* Eyebrow with animated line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: '100px' } : { opacity: 0, width: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-full max-w-[100px]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm font-medium tracking-wide text-zinc-400 uppercase mb-6"
          >
            الخدمات المتخصصة
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-6"
            dir="rtl"
          >
            ما هي القيمة الحقيقية التي أقدّمها لك؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed"
            dir="rtl"
          >
            من الفهم … إلى التعلم  …إلى التطبيق… إلى كسب المال والاستمرارية
          </motion.p>
        </motion.div>

        {/* Services Grid - Compact Design */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-zinc-400">جاري التحميل...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-red-400">{error}</div>
          </div>
        ) : services.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-zinc-400">لا توجد خدمات متاحة</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {services.map((service, index) => {
              const number = String(service.displayOrder || index + 1).padStart(2, '0');
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + (index * 0.1),
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Compact Card */}
                  <motion.div
                    className="relative h-full p-5 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 overflow-hidden"
                    animate={{
                      borderColor: hoveredCard === service.id ? 'rgba(34, 197, 94, 0.4)' : 'rgba(39, 39, 42, 0.5)',
                      y: hoveredCard === service.id ? -4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    
                    {/* Top accent bar */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-green-500"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: hoveredCard === service.id ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.4 }}
                      style={{ transformOrigin: 'right' }}
                    />

                    {/* Content */}
                    <div className="relative z-10 text-right space-y-4" dir="rtl">
                      
                      {/* Number */}
                      <div className="flex items-center justify-between">
                        <motion.div
                          className="w-10 h-10 bg-green-500/15 rounded-lg flex items-center justify-center"
                          animate={{
                            backgroundColor: hoveredCard === service.id ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.15)',
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-lg font-bold text-green-400">{number}</span>
                        </motion.div>
                        
                        {/* Status indicator */}
                        <motion.div
                          className="w-2 h-2 rounded-full bg-green-500"
                          animate={{
                            scale: hoveredCard === service.id ? [1, 1.3, 1] : 1,
                            opacity: hoveredCard === service.id ? [1, 0.5, 1] : 0.5,
                          }}
                          transition={{ duration: 1, repeat: hoveredCard === service.id ? Infinity : 0 }}
                        />
                      </div>

                      {/* Title */}
                      <div>
                        <motion.h3
                          className="text-lg font-bold text-zinc-50 mb-1.5 leading-tight"
                          animate={{
                            color: hoveredCard === service.id ? '#4ade80' : '#fafafa',
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {service.title}
                        </motion.h3>
                        {service.subtitle && (
                          <p className="text-xs text-green-500/80 font-medium">
                            {service.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-zinc-800" />

                      {/* Description - Truncated */}
                      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>

                      {/* Value tag */}
                      {service.valueProposition && (
                        <div className="pt-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                            <span className="text-xs text-zinc-400 line-clamp-1">{service.valueProposition}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-green-500/5 pointer-events-none"
                      animate={{
                        opacity: hoveredCard === service.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-12"
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
            <span className="relative z-10">ابدأ رحلتك معي</span>
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
