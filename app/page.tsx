'use client';

import Header from "./components/Header";
import Hero from "./components/Hero";
import SocialProofSection from "./components/SocialProofSection";
import PhilosophySection from "./components/PhilosophySection";
import ServicesSection from "./components/ServicesSection";
import MethodologySection from "./components/MethodologySection";
import FinalCTA from "./components/FinalCTA";
import CandleDivider from "./components/CandleDivider";
import IntroScreen from "./components/IntroScreen";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      <IntroScreen />
      <Header />
      <Hero />
      
      {/* Centered Text Section */}
      <section className="relative w-full py-12 lg:py-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black" />
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
            dir="rtl"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-zinc-300 font-light max-w-4xl mx-auto"
            >
              التحليل الفني للمستثمرين، التجار، المضاربين، بما في ذلك صناديق التحوط، صناديق الاستثمار المشتركة، المستشارين الماليين والناس العاديين
            </motion.p>
            
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mx-auto mt-8"
            />
          </motion.div>
        </div>
      </section>
      
      <CandleDivider />
      <ServicesSection />
      <PhilosophySection />
      <CandleDivider />
      <SocialProofSection />
      <MethodologySection />
      <FinalCTA />
    </main>
  );
}
