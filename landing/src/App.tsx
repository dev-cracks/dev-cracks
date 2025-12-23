import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { SplashCursor } from './components/SplashCursor';
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
  const [showSplashCursor, setShowSplashCursor] = useState(false);
  
  // Mostrar VideoBackground en todas las rutas excepto account
  const showVideoBackground = location.pathname !== '/account';

  // Reproducir shine.mp3 y activar SplashCursor al cargar la landing
  useEffect(() => {
    const shineAudioElement = document.getElementById('shine-audio') as HTMLAudioElement;
    
    if (!shineAudioElement) {
      console.error('Shine audio element not found in HTML');
      return;
    }
    
    // Configurar volumen
    shineAudioElement.volume = 0.5;
    
    // Función para intentar reproducir
    const tryPlayShine = async () => {
      try {
        await shineAudioElement.play();
        console.log('Shine audio playing');
        setShowSplashCursor(true);
      } catch (error: any) {
        console.log('Shine audio play attempt failed:', error);
        // Si falla, intentar con muted y luego desmutear
        try {
          shineAudioElement.muted = true;
          await shineAudioElement.play();
          console.log('Shine audio playing with muted workaround');
          setTimeout(() => {
            shineAudioElement.muted = false;
            console.log('Shine audio unmuted');
          }, 100);
          setShowSplashCursor(true);
        } catch (mutedError) {
          console.log('Shine audio play failed even with muted:', mutedError);
          // Activar cursor de todas formas
          setShowSplashCursor(true);
        }
      }
    };
    
    // Intentar reproducir cuando el audio esté listo
    if (shineAudioElement.readyState >= 2) {
      tryPlayShine();
    } else {
      shineAudioElement.addEventListener('canplay', () => {
        tryPlayShine();
      }, { once: true });
      
      shineAudioElement.addEventListener('canplaythrough', () => {
        tryPlayShine();
      }, { once: true });
    }
    
    // Intentar después de un pequeño delay
    const timer = setTimeout(() => {
      if (shineAudioElement.paused) {
        tryPlayShine();
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {showVideoBackground && <VideoBackground />}
      {showSplashCursor && <SplashCursor />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter basename="/landing">
    <AppContent />
  </BrowserRouter>
);

export default App;
