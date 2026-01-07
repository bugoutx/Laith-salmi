import Header from "./components/Header";
import Hero from "./components/Hero";
import SocialProofSection from "./components/SocialProofSection";
import PhilosophySection from "./components/PhilosophySection";
import ServicesSection from "./components/ServicesSection";
import MethodologySection from "./components/MethodologySection";
import FinalCTA from "./components/FinalCTA";
import CandleDivider from "./components/CandleDivider";
import IntroScreen from "./components/IntroScreen";

export default function Home() {
  return (
    <main>
      <IntroScreen />
      <Header />
      <Hero />
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
