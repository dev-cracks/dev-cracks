import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from '@common/not-found';
import Threads from './components/Threads';
import GooeyNav from './components/GooeyNav';
import { LanguageSelector } from './components/LanguageSelector';

// Fixed base path for dev-pool when accessed through unified server
const DEV_POOL_BASE = '/dev-pool';

// Opciones de menú para empresa de talento digital
const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Talentos', href: '#talentos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
  { label: 'Contacto', href: '#contacto' }
];

const App = () => (
  <>
    <Threads
      amplitude={1}
      distance={0}
      enableMouseInteraction={true}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0
      }}
    />
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <LanguageSelector />
      <div style={{
        position: 'fixed',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>
        <GooeyNav
          items={navItems}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>
      <BrowserRouter basename={DEV_POOL_BASE}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>
);

export default App;

