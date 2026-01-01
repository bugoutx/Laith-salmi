'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '../components/Header';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="relative w-full py-16 lg:py-20 overflow-hidden min-h-screen">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
            
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6" dir="rtl">
                من أنا
              </h1>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed" dir="rtl">
                تعرف على خبرتي ومسيرتي في عالم التحليل الفني وأسواق المعادن
              </p>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                <div className="relative w-full max-w-md mx-auto lg:mx-0">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20">
                    <Image
                      src="/laith2.png"
                      alt="ليث السالمي - محلل فني معتمد"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500/20 rounded-full blur-sm" />
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500/10 rounded-full blur-md" />
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="order-1 lg:order-2 space-y-6 text-right"
                dir="rtl"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50">
                    ليث السالمي
                  </h2>
                  <p className="text-green-400 font-medium text-lg">
                    محلل فني معتمد - CFTe I
                  </p>
                </div>

                <div className="space-y-4 text-zinc-300 leading-relaxed">
                  <p>
                    محلل فني في الأسواق المالية ومتاجر متخصص في سوق المعادن، تحديدًا في الذهب والفضة، 
                    بخبرة تتجاوز 6 سنوات.
                  </p>
                  
                  <p>
                    شملت خبرتي العمل في عدة جوانب داخل هذا القطاع، من بينها إدارة المحافظ المالية، 
                    وتحليل الأسواق للمستثمرين، إضافة إلى أكثر من عامين من العمل المباشر مع مستثمرين 
                    من أصحاب رؤوس الأموال الكبيرة في المتاجرة في أسواق المعادن.
                  </p>
                </div>

                {/* Credentials */}
                <div className="flex flex-wrap gap-3 justify-end">
                  <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-green-400 font-medium text-sm">CFTe I Certified</span>
                  </div>
                  <div className="px-4 py-2 bg-zinc-800/50 border border-zinc-700/30 rounded-lg">
                    <span className="text-zinc-300 font-medium text-sm">+6 سنوات خبرة</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Certification Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 mb-16"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-zinc-50 mb-4" dir="rtl">
                  الشهادة المهنية
                </h3>
              </div>
              
              <div className="max-w-4xl mx-auto text-right space-y-4 text-zinc-300 leading-relaxed" dir="rtl">
                <p>
                  حاصل على شهادة المحلل الفني المعتمد – المستوى الأول من الاتحاد الدولي للمحللين الفنيين
                </p>
                
                <p>
                  يُعد الاتحاد الدولي للمحللين الفنيين جهة عالمية تُعنى بتثبيت وتطوير أعلى المعايير المهنية 
                  للتحليل الفني، ويُعتبر شهادتها مرجعًا مهنيًا لإثبات الكفاءة المنهجية والمعرفية في قراءة 
                  الأسواق المالية.
                </p>
              </div>
            </motion.div>

            {/* Experience Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
              <div className="p-6 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">+6</div>
                <div className="text-zinc-300 font-medium" dir="rtl">سنوات خبرة</div>
              </div>
              
              <div className="p-6 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">+2</div>
                <div className="text-zinc-300 font-medium" dir="rtl">سنوات مع كبار المستثمرين</div>
              </div>
              
              <div className="p-6 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">CFTe I</div>
                <div className="text-zinc-300 font-medium" dir="rtl">شهادة معتمدة</div>
              </div>
            </motion.div>

            {/* Philosophy Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-center py-12"
            >
              <blockquote className="text-xl sm:text-2xl font-light text-zinc-300 leading-relaxed max-w-4xl mx-auto" dir="rtl">
                "أؤمن أن الأسواق بطبيعتها متغيّرة، وأن علم فهمها لا يقف عند حد، 
                لذلك أحرص على التطوّر المستمر، ومن يكون إلى جانبي في هذا المسار 
                يواكب هذا التطوّر بوعي وانتقاء."
              </blockquote>
              <div className="mt-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mb-4" />
                <cite className="text-zinc-400 font-medium">ليث السالمي</cite>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25"
              >
                ابدأ رحلتك معي
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
