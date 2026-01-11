'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '../components/Header';
import VideoSection from '../components/VideoSection';

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
                تعرف على خبرتي ومسيرتي في عالم التحليل الفني والمتجارة في الاسواق المالية 
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
                  <p className="text-lg">
                    محلل فني ومتداول متوسط الأجل في الأسواق المالية، متخصص في أسواق المعادن، الأسهم، والعملات الأجنبية.
                  </p>
                  
                  <p className="text-base text-zinc-400 italic">
                    من أبرز هواياتي قراءة الأبحاث الفنية والرسوم البيانية بعمق.
                  </p>
                </div>

                {/* Credentials */}
                <div className="flex flex-wrap gap-3 justify-end">
                  <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-green-400 font-medium text-sm">CFTe</span>
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

            {/* What Distinguishes Laith Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mb-16"
            >
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-px bg-green-500/50" />
                  <span className="text-sm font-medium tracking-wide text-green-400 uppercase">التميّز</span>
                  <div className="w-12 h-px bg-green-500/50" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4" dir="rtl">
                  ما يميّز <span className="text-green-400">ليث السالمي</span>
                </h2>
              </motion.div>

              {/* Main Content Card */}
              <div className="relative max-w-5xl mx-auto">
                {/* Background Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.65 }}
                  className="relative p-8 lg:p-12 rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 overflow-hidden"
                >
                  {/* Animated background elements */}
                  <motion.div
                    className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 space-y-8 text-right" dir="rtl">
                    {/* Introduction */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="space-y-4"
                    >
                      <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
                        الأسواق المالية بطبيعتها متغيّرة وغير ثابتة،
                        ولا تتحرّك وفق نمط واحد أو سلوك دائم،
                        فما ينجح في مرحلة قد يفقد فاعليته في مرحلة أخرى.
                      </p>
                      <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
                        لهذا، فإن الاعتماد على أسلوب جامد أو إشارة واحدة
                        لا يكفي لبناء قرارات ناجحة وقابلة للاستمرار.
                      </p>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      className="h-px bg-gradient-to-l from-transparent via-green-500/50 to-transparent"
                    />

                    {/* Methodology Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
                          className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center mt-1"
                        >
                          <span className="text-2xl">⚖️</span>
                        </motion.div>
                        <div className="flex-1 space-y-4">
                          <h3 className="text-xl sm:text-2xl font-bold text-green-400">
                          منهجية وزن الأدلة
                          </h3>
                          <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                            يتميّز أسلوب ليث بالاعتماد على منهجية وزن الأدلة (Weight of Evidence)،
                            وهي منهجية لا تقوم على البحث عن إشارة مثالية،
                            بل على جمع وترجيح مجموعة من الأدلة لفهم الصورة الكاملة للسوق.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Philosophy Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      className="p-6 rounded-xl bg-zinc-800/40 border-r-4 border-green-500/50 space-y-4"
                    >
                      <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                        يتعامل ليث مع السوق على أنه مساحة احتمالات لا يقين،
                        حيث تُبنى القرارات على الترجيح،
                        وليس على التوقع أو الانطباع اللحظي.
                      </p>
                    </motion.div>

                    {/* Flexibility Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
                          className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center mt-1"
                        >
                          <span className="text-2xl">🔄</span>
                        </motion.div>
                        <div className="flex-1 space-y-3">
                          <h3 className="text-xl sm:text-2xl font-bold text-green-400">
                            المرونة: عنصر أساسي
                          </h3>
                          <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                            المرونة عنصر أساسي في هذه المنهجية،
                            فمع تغيّر معطيات السوق تتغيّر القرارات،
                            دون عناد أو تمسّك برأي مسبق.
                          </p>
                          <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                            المرونة هنا لا تعني التخبّط،
                            بل تعني الالتزام بما يقدمه السوق بدل الالتزام بالرأي الشخصي.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Experience Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
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

            {/* How I Read and Deal with the Market Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.55 }}
              className="mb-16"
            >
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-6"
                  dir="rtl"
                >
                  كيف أقرأ وأتعامل مع السوق
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.7 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-semibold text-green-400"
                  dir="rtl"
                >
                  من الصورة الكبيرة → التحليل → قرار المتاجرة
                </motion.p>
              </div>
            </motion.div>

            {/* Video Section */}
            <VideoSection />

            {/* Philosophy Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
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
              transition={{ duration: 0.8, delay: 1.7 }}
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
