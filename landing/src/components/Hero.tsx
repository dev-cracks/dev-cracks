import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FallingText from './FallingText';
import SplitText from './SplitText';

export const Hero = () => {
  const { t } = useTranslation('landing');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFallingText, setShowFallingText] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Slides del carousel con enfoque empresarial
  const carouselSlides = [
    {
      title: t('hero.slides.automation.title'),
      benefit: t('hero.slides.automation.benefit'),
      percentage: t('hero.slides.automation.percentage'),
      description: t('hero.slides.automation.description'),
      icon: '⚡'
    },
    {
      title: t('hero.slides.ai.title'),
      benefit: t('hero.slides.ai.benefit'),
      percentage: t('hero.slides.ai.percentage'),
      description: t('hero.slides.ai.description'),
      icon: '🤖'
    },
    {
      title: t('hero.slides.agents.title'),
      benefit: t('hero.slides.agents.benefit'),
      percentage: t('hero.slides.agents.percentage'),
      description: t('hero.slides.agents.description'),
      icon: '🎯'
    },
    {
      title: t('hero.slides.cloud.title'),
      benefit: t('hero.slides.cloud.benefit'),
      percentage: t('hero.slides.cloud.percentage'),
      description: t('hero.slides.cloud.description'),
      icon: '☁️'
    },
    {
      title: t('hero.slides.roi.title'),
      benefit: t('hero.slides.roi.benefit'),
      percentage: t('hero.slides.roi.percentage'),
      description: t('hero.slides.roi.description'),
      icon: '💰'
    }
  ];

  // Lista de miedos y conceptos retrógrados sobre IA - palabras clave
  const miedosRetrogrados = [
    t('hero.fears.fear'),
    t('hero.fears.resistance'),
    t('hero.fears.obsolescence'),
    t('hero.fears.distrust'),
    t('hero.fears.dread'),
    t('hero.fears.manualProcesses'),
    t('hero.fears.legacySystems'),
    t('hero.fears.lackOfVision'),
    t('hero.fears.culturalResistance')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  useEffect(() => {
    // Iniciar fade out después de 6 segundos (triple del tiempo original)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 6000);

    // Ocultar completamente después del fade
    const hideTimer = setTimeout(() => {
      setShowFallingText(false);
      // Mostrar contenido principal después de que desaparezca
      setTimeout(() => {
        setShowMainContent(true);
      }, 300);
    }, 6500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const miedosText = miedosRetrogrados.join(' ');

  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        {/* Badges de autoridad */}
        <div className="hero__badges">
          <span className="hero__badge">{t('hero.badge1')}</span>
          <span className="hero__badge">{t('hero.badge2')}</span>
        </div>

        {/* Contenedor fijo para mantener el espacio */}
        <div className="hero__content-container">
          {/* FallingText con miedos retrógrados */}
          {showFallingText && (
            <div className={`hero__falling-text-wrapper ${fadeOut ? 'fade-out' : ''}`}>
              <FallingText
                text={miedosText}
                highlightWords={miedosRetrogrados}
                highlightClass="highlighted"
                trigger="auto"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.56}
                fontSize="2rem"
                mouseConstraintStiffness={0.9}
              />
            </div>
          )}

          {/* Contenido principal con SplitText */}
          <div className={`hero__title-wrapper ${showMainContent ? 'visible' : ''}`}>
            <h2 className="hero__title-line">
              <SplitText text={t('hero.titleLine1')} delay={300} />
            </h2>
            <h2 className="hero__title-line">
              <SplitText text={t('hero.titleLine2')} delay={800} />
            </h2>
          </div>
        </div>

        <div className="hero-carousel">
          <div className="hero-carousel__slides">
            {carouselSlides.map((slide, index) => (
              <div
                key={index}
                className={`hero-carousel__slide ${index === currentSlide ? 'hero-carousel__slide--active' : ''}`}
              >
                <div className="hero-carousel__content">
                  <div className="hero-carousel__icon">{slide.icon}</div>
                  <h3 className="hero-carousel__title">{slide.title}</h3>
                  <div className="hero-carousel__percentage">{slide.percentage}</div>
                  <p className="hero-carousel__benefit">{slide.benefit}</p>
                  <p className="hero-carousel__description">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-carousel__indicators">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-carousel__indicator ${index === currentSlide ? 'hero-carousel__indicator--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="hero__ctas">
          <a className="btn-primary" href="#contacto">
            Solicitar Demo Corporativa
          </a>
          <a 
            className="btn-secondary btn-secondary--outline" 
            href="https://calendly.com/dev-cracks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar Consultoría Estratégica
          </a>
        </div>
      </div>
    </section>
  );
};

