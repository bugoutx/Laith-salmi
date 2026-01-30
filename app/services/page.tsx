'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  value_proposition: string;
  icon: string;
  color: string;
  accent_color: string;
  display_order: number;
  is_active: boolean;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="relative w-full py-16 lg:py-20 overflow-hidden min-h-screen">
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center mb-20"
            >
              {/* Eyebrow with animated line */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100px' }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex items-center justify-center mb-6"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent w-full max-w-[100px]" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm font-medium tracking-wide text-zinc-400 uppercase mb-6"
              >
                الخدمات المتخصصة
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6"
                dir="rtl"
              >
                خدماتي المتخصصة
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed"
                dir="rtl"
              >
                خدمات مصممة لبناء مهاراتك وتطوير فهمك العميق لأسواق المعادن
              </motion.p>
            </motion.div>

            {/* Services Grid */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-zinc-400" dir="rtl">جاري التحميل...</p>
              </div>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.6 + (index * 0.2),
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="group relative"
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card container with creative hover effects */}
                    <div className="relative h-full p-8 lg:p-10 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 transition-all duration-500 hover:border-green-500/30 overflow-hidden">
                      
                      {/* Animated background gradient */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        initial={false}
                        animate={{
                          scale: hoveredCard === service.id ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Floating number */}
                      <motion.div
                        className="absolute top-6 left-6 text-6xl font-bold text-zinc-600/30 group-hover:text-zinc-500/50 transition-colors duration-500"
                        animate={{
                          rotate: hoveredCard === service.id ? [0, 5, -5, 0] : 0,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {(service.display_order ?? index + 1).toString().padStart(2, '0')}
                      </motion.div>

                      {/* Content */}
                      <div className="relative z-10 space-y-6 text-right" dir="rtl">
                        {/* Phase and title */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <motion.div
                              className="text-3xl"
                              animate={{
                                scale: hoveredCard === service.id ? 1.2 : 1,
                                rotate: hoveredCard === service.id ? [0, -10, 10, 0] : 0,
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              {service.icon}
                            </motion.div>
                            <div className="flex-1 mr-4">
                              <h3 className="text-xl lg:text-2xl font-bold text-zinc-50 mb-2 group-hover:text-green-400 transition-colors duration-300">
                                {service.title}
                              </h3>
                              <p className="text-base text-green-400 font-medium">
                                {service.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <motion.p
                          className="text-zinc-300 leading-relaxed text-base"
                          animate={{
                            y: hoveredCard === service.id ? -5 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {service.description}
                        </motion.p>

                        {/* Value proposition */}
                        {service.value_proposition && (
                          <motion.div
                            className="p-4 rounded-lg bg-zinc-800/30 border-r-4 border-green-500/50"
                            initial={{ opacity: 0.7 }}
                            animate={{
                              opacity: hoveredCard === service.id ? 1 : 0.7,
                              x: hoveredCard === service.id ? 5 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-sm text-zinc-400 leading-relaxed">
                              <span className="text-green-400 font-medium">القيمة: </span>
                              {service.value_proposition}
                            </p>
                          </motion.div>
                        )}

                        {/* Animated bottom accent */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"
                          initial={{ width: '0%' }}
                          animate={{
                            width: hoveredCard === service.id ? '100%' : '20%',
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        animate={{
                          scale: hoveredCard === service.id ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-zinc-400 text-lg" dir="rtl">
                  لا توجد خدمات متاحة حالياً
                </p>
              </motion.div>
            )}

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-center mt-16 flex flex-col items-center gap-6"
            >
              {/* Primary CTA */}
              <a href="/contact" tabIndex={-1}>
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
              </a>
              {/* Secondary CTA link */}
              <a
                href="/about"
                className="inline-block px-10 py-4 border-2 border-zinc-600 hover:border-green-500 text-zinc-300 hover:text-green-400 font-semibold text-base rounded-xl transition-all duration-300 hover:bg-green-500/5"
              >
                تعرّف عليّ أكثر
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
