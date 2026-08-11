import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Showcase from "@/components/landing/showcase/Showcase";
import CTASection from "@/components/landing/footer/CTASection";
import Footer from "@/components/landing/footer/Footer";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
export default function LandingPage() {
  return (
    <main className="bg-background text-foreground">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <CTASection />
      <Footer />
    </main>
  );
}