import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Security from "@/components/landing/Security";
import CTASection from "@/components/landing/footer/CTASection";
import Footer from "@/components/landing/footer/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Security />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
