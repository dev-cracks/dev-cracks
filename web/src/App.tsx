import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { HotmartPromo } from './components/HotmartPromo';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoBackground } from './components/VideoBackground';
import { ServicesPage } from './pages/ServicesPage';

const HomePage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <HotmartPromo />
      <ContactSection />
    </main>
    <Footer />
  </>
);

const App = () => (
  <BrowserRouter>
    <VideoBackground />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicios" element={<ServicesPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
