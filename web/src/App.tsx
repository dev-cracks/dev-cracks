import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const App = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default App;

