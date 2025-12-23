import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { CaseStudies } from './components/CaseStudies';
import { WhyUs } from './components/WhyUs';
import { HotmartPromo } from './components/HotmartPromo';
import { ContactSection } from './components/ContactSection';
import { LogoLoopDemo } from './components/LogoLoopDemo';
import { Footer } from './components/Footer';
import { VideoBackground } from './components/VideoBackground';
import { ServicesPage } from './pages/ServicesPage';
import { AccountPage } from './pages/AccountPage';
import { LandingPage } from './pages/LandingPage';

const HomePage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Services />
      <Products />
      <CaseStudies />
      <WhyUs />
      <HotmartPromo />
      <ContactSection />
      <LogoLoopDemo />
    </main>
    <Footer />
  </>
);

const AppContent = () => {
  const location = useLocation();
  const showVideoBackground = location.pathname !== '/';

  return (
    <>
      {showVideoBackground && <VideoBackground />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
