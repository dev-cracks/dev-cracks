import { useEffect, useState } from 'react';

// Slides del carousel con enfoque empresarial
const carouselSlides = [
  {
    title: 'Automatización Inteligente',
    benefit: 'Reduce costos operativos',
    percentage: '70%',
    description: 'Las empresas que automatizan sus procesos reducen el tiempo de ejecución en un 70% y aumentan su productividad significativamente, generando ROI medible desde el primer trimestre.',
    icon: '⚡'
  },
  {
    title: 'Inteligencia Artificial Aplicada',
    benefit: 'Decisiones basadas en datos',
    percentage: '85%',
    description: 'La IA permite decisiones más precisas, reduciendo errores en un 85% y optimizando recursos empresariales. Transformamos datos en ventaja competitiva.',
    icon: '🤖'
  },
  {
    title: 'Agentes Orquestados de IA',
    benefit: 'Optimización de flujos complejos',
    percentage: '60%',
    description: 'Los sistemas de agentes coordinados reducen costos operativos hasta en un 60% mientras mejoran la eficiencia. Automatización que escala con tu negocio.',
    icon: '🎯'
  },
  {
    title: 'Cloud & DevOps Enterprise',
    benefit: 'Aceleración del time-to-market',
    percentage: '50%',
    description: 'Las implementaciones en la nube reducen tiempos de despliegue en un 50% y mejoran la escalabilidad. Infraestructura que crece contigo.',
    icon: '☁️'
  },
  {
    title: 'ROI Promedio Verificado',
    benefit: 'Retorno de inversión comprobado',
    percentage: '300%',
    description: 'Las empresas que implementan nuestras soluciones obtienen un retorno de inversión promedio del 300% en el primer año. Resultados medibles, impacto real.',
    icon: '💰'
  }
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        {/* Badges de autoridad */}
        <div className="hero__badges">
          <span className="hero__badge">Partner de Transformación Digital</span>
          <span className="hero__badge">Expertos en IA Aplicada</span>
        </div>

        <h2>Transformación Digital con IA: De la Idea al Impacto Empresarial</h2>
        <p className="hero__subtitle">
          <strong>Problema:</strong> Procesos manuales, decisiones basadas en intuición y sistemas legacy limitan tu crecimiento.
          <br />
          <strong>Solución:</strong> Implementamos inteligencia artificial, automatización inteligente y arquitecturas modernas que transforman operaciones.
          <br />
          <strong>Resultado:</strong> Eficiencia operativa aumentada, ROI comprobado del 300% y ventaja competitiva sostenible.
        </p>

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
          <a className="btn-secondary btn-secondary--outline" href="#contacto">
            Agendar Consultoría Estratégica
          </a>
        </div>
      </div>
    </section>
  );
};

