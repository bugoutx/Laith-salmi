import Header from "./components/Header";
import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import SocialProofSection from "./components/SocialProofSection";
import PhilosophySection from "./components/PhilosophySection";
import ServicesSection from "./components/ServicesSection";
import MethodologySection from "./components/MethodologySection";
import FinalCTA from "./components/FinalCTA";
import CandleDivider from "./components/CandleDivider";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <VideoSection />
      <CandleDivider />
      <SocialProofSection />
      <PhilosophySection />
      <CandleDivider />
      <ServicesSection />
      <MethodologySection />
      <FinalCTA />
    </main>
  );
}
