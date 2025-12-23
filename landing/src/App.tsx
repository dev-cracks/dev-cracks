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
  const [showSplashCursor, setShowSplashCursor] = useState(true); // Activar inmediatamente
  
  // Mostrar VideoBackground en todas las rutas excepto account
  const showVideoBackground = location.pathname !== '/account';

  // Reproducir shine.mp3 al cargar la landing
  useEffect(() => {
    // Activar cursor inmediatamente
    setShowSplashCursor(true);
    
    // Intentar cargar y reproducir el audio
    const loadAndPlayAudio = async () => {
      let shineAudioElement = document.getElementById('shine-audio') as HTMLAudioElement;
      
      // Si no existe en el HTML, crearlo dinámicamente
      if (!shineAudioElement) {
        shineAudioElement = document.createElement('audio');
        shineAudioElement.id = 'shine-audio';
        shineAudioElement.playsInline = true;
        shineAudioElement.preload = 'auto';
        shineAudioElement.style.display = 'none';
        const source = document.createElement('source');
        source.src = '/audio/shine.mp3';
        source.type = 'audio/mpeg';
        shineAudioElement.appendChild(source);
        document.body.appendChild(shineAudioElement);
      }
      
      // Configurar volumen
      shineAudioElement.volume = 0.5;
      
      // Función para intentar reproducir
      const tryPlayShine = async () => {
        try {
          await shineAudioElement.play();
          console.log('Shine audio playing');
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
          } catch (mutedError) {
            console.log('Shine audio play failed even with muted:', mutedError);
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
        
        // Cargar el audio si no está cargando
        if (shineAudioElement.readyState === 0) {
          shineAudioElement.load();
        }
      }
      
      // Intentar después de varios delays
      const timers: NodeJS.Timeout[] = [];
      [100, 300, 500, 1000, 2000].forEach((delay) => {
        const timer = setTimeout(() => {
          if (shineAudioElement.paused && shineAudioElement.readyState >= 2) {
            tryPlayShine();
          }
        }, delay);
        timers.push(timer);
      });
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    };
    
    loadAndPlayAudio();
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
