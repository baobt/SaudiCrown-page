import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import VisionMission from "@/components/landing/VisionMission";
import Strengths from "@/components/landing/Strengths";
import WhyChoose from "@/components/landing/WhyChoose";
import Compliance from "@/components/landing/Compliance";
import Products from "@/components/landing/Products";
import Markets from "@/components/landing/Markets";
import Services from "@/components/landing/Services";
import ImportServices from "@/components/landing/ImportServices";
import Stats from "@/components/landing/Stats";
import CTA from "@/components/landing/CTA";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import CursorGlow from "@/components/landing/CursorGlow";
import SectionTransition from "@/components/landing/SectionTransition";
import ScrollProgress from "@/components/landing/ScrollProgress";

const Index = () => {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />

      <SectionTransition variant="veil">
        <About />
      </SectionTransition>

      <SectionTransition variant="sweep">
        <VisionMission />
      </SectionTransition>

      <SectionTransition variant="tear">
        <Strengths />
     
        <WhyChoose />
      </SectionTransition>

      <SectionTransition variant="veil" dark>
        <Compliance />
      </SectionTransition>

      <SectionTransition variant="sweep">
        <Products />
      </SectionTransition>

      <SectionTransition variant="tear">
        <Markets />
      </SectionTransition>

      <SectionTransition variant="zoom">
        <Services />
      </SectionTransition>

      <SectionTransition variant="sweep">
        <ImportServices />
      </SectionTransition>

      <SectionTransition variant="veil" dark>
        <Stats />
      </SectionTransition>

      <SectionTransition variant="zoom" dark>
        <CTA />
      </SectionTransition>

      <SectionTransition variant="veil">
        <Contact />
      </SectionTransition>

      <Footer />
    </main>
  );
};

export default Index;
