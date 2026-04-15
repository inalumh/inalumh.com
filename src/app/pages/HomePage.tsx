import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { HabitatSection } from '../components/habitat-iq/HabitatSection';
import { Projects } from '../components/Projects';
import { Trust } from '../components/Trust';
import { CTASection } from '../components/CTASection';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <HabitatSection />
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
