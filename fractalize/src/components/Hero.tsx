import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import RippleGrid from './RippleGrid';

export const Hero = () => {
  const { t } = useTranslation('fractalize');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* RippleGrid Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
        />
      </div>

      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gray-900/60 z-[1]" />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">{t('hero.title')}</span>
              <br />
              <span className="gradient-text">{t('hero.titleHighlight')}</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection('cta')}
              className="btn-primary text-lg px-10 py-5"
            >
              {t('hero.ctaPrimary')}
            </button>
            <button
              onClick={() => scrollToSection('modules')}
              className="btn-secondary text-lg px-10 py-5"
            >
              {t('hero.ctaSecondary')}
            </button>
          </motion.div>

          {/* Visual element - Dashboard preview or logistics visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 relative"
          >
            <div className="bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-32 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-lg border border-primary-500/30"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

