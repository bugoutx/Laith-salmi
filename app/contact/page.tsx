'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'البريد الإلكتروني',
      value: 'laith@example.com',
      link: 'mailto:laith@example.com'
    },
    {
      icon: '📱',
      title: 'واتساب',
      value: '+966 50 123 4567',
      link: 'https://wa.me/966501234567'
    },
    {
      icon: '💼',
      title: 'لينكد إن',
      value: 'Laith Al Salmi',
      link: 'https://linkedin.com/in/laith-al-salmi'
    },
    {
      icon: '🕒',
      title: 'ساعات العمل',
      value: 'الأحد - الخميس: 9:00 - 18:00',
      link: null
    }
  ];

  const services = [
    'مهارة التحليل الفني',
    'منهجية تأهيل تاجر المعادن',
    'التوجيه والمتابعة المباشرة',
    'شراكة واعية مع المستثمر',
    'استشارة عامة'
  ];

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
              className="text-center mb-16"
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
                تواصل معي
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6"
                dir="rtl"
              >
                ابدأ رحلتك الاستثمارية
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed"
                dir="rtl"
              >
                تواصل معي لبدء رحلتك في عالم الأسواق المالية والمعادن الثمينة
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="p-8 lg:p-10 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 relative overflow-hidden">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-50" />
                  
                  <div className="relative z-10">
                    <h2 className="text-2xl lg:text-3xl font-bold text-zinc-50 mb-8" dir="rtl">
                      أرسل رسالة
                    </h2>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
                      >
                        <p className="text-green-400 text-center" dir="rtl">
                          تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.
                        </p>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            الاسم الكامل *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500 transition-colors"
                            placeholder="أدخل اسمك الكامل"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            البريد الإلكتروني *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500 transition-colors"
                            placeholder="example@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            رقم الهاتف
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500 transition-colors"
                            placeholder="+966 50 123 4567"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            نوع الخدمة المطلوبة
                          </label>
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500 transition-colors"
                          >
                            <option value="">اختر الخدمة</option>
                            {services.map((service, index) => (
                              <option key={index} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          موضوع الرسالة *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500 transition-colors"
                          placeholder="موضوع رسالتك"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          الرسالة *
                        </label>
                        <textarea
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500 transition-colors resize-none"
                          placeholder="اكتب رسالتك هنا..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 relative overflow-hidden ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">
                          {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                        </span>
                      </motion.button>
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="lg:col-span-1 space-y-6"
              >
                {/* Contact Information */}
                <div className="p-6 lg:p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50">
                  <h3 className="text-xl font-bold text-zinc-50 mb-6" dir="rtl">
                    معلومات التواصل
                  </h3>
                  
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 + (index * 0.1) }}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/30 transition-colors"
                      >
                        <div className="text-2xl">{info.icon}</div>
                        <div className="flex-1" dir="rtl">
                          <p className="text-sm text-zinc-400 mb-1">{info.title}</p>
                          {info.link ? (
                            <a
                              href={info.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-zinc-50 hover:text-green-400 transition-colors font-medium"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-zinc-50 font-medium">{info.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Note */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
                >
                  <div className="text-center" dir="rtl">
                    <div className="text-3xl mb-4">💡</div>
                    <h4 className="text-lg font-semibold text-zinc-50 mb-3">
                      استشارة مجانية
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      احصل على استشارة مجانية لمدة 15 دقيقة لمناقشة احتياجاتك وكيف يمكنني مساعدتك في رحلتك الاستثمارية.
                    </p>
                  </div>
                </motion.div>

                {/* Certification */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="p-6 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 text-center"
                >
                  <div className="text-2xl mb-3">🏆</div>
                  <h4 className="text-sm font-semibold text-zinc-50 mb-2" dir="rtl">
                    محلل فني معتمد
                  </h4>
                  <p className="text-xs text-zinc-400" dir="rtl">
                    CFTe I - IFTA
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
