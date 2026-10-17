import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import SiteAtmosphere from '@/components/SiteAtmosphere';
import SanctuaryExperience from '@/components/SanctuaryExperience';

export default function App() {
  return (
    <div className="relative isolate min-h-screen overflow-clip bg-ivory-100">
      <SiteAtmosphere />
      <Navbar />
      <main className="relative z-10">
          <Hero />
          <SanctuaryExperience />
          <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
