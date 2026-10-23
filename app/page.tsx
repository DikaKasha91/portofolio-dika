import Hero from "@/components/Hero";
import SelectedProjects from "@/components/SelectedProjects";
import ExperiencePreview from "@/components/ExperiencePreview";
import Tools from "@/components/Tools";
import Learning from "@/components/Learning";
import SocialActivity from "@/components/SocialActivity";
import ContactPreview from "@/components/ContactPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <Hero />

      <SelectedProjects />

      <ExperiencePreview />

      <Tools />

      <Learning />

      <SocialActivity />

      <ContactPreview />

      <Footer />
    </main>
  );
}