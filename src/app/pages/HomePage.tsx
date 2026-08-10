import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { HabitatSection } from '../components/habitat-iq/HabitatSection';
import { LicensingSection } from '../components/LicensingSection';
import { Projects } from '../components/Projects';
import { Trust } from '../components/Trust';
import { CTASection } from '../components/CTASection';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { WelcomeModal } from '../components/WelcomeModal';

export function HomePage() {
  return (
    <>
      <WelcomeModal />
      <Header />
      <main>
        <Hero />
        <Services />
        <HabitatSection />
        <LicensingSection />
        <Projects />
        <Trust />
        <CTASection />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton message="¡Hola! Me interesa conocer más sobre los servicios de construcción y renovación de Inalumh." />
    </>
  );
}
