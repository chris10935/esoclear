import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ClinicalNeed } from "@/components/ClinicalNeed";
import { MechanismOfAction } from "@/components/MechanismOfAction";
import { PreclinicalEvidence } from "@/components/PreclinicalEvidence";
import { TherapeuticAsset } from "@/components/TherapeuticAsset";
import { DevelopmentPipeline } from "@/components/DevelopmentPipeline";
import { ScientificFoundation } from "@/components/ScientificFoundation";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ClinicalNeed />
        <MechanismOfAction />
        <PreclinicalEvidence />
        <TherapeuticAsset />
        <DevelopmentPipeline />
        <ScientificFoundation />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
