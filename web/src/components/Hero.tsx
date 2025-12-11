import { useEffect, useState } from 'react';

const carouselSlides = [
  {
    title: 'Automatización de Procesos',
    benefit: 'Reduce tiempos operativos',
    percentage: '70%',
    description: 'Las empresas que automatizan sus procesos reducen el tiempo de ejecución en un 70% y aumentan su productividad significativamente.',
    icon: '⚡'
  },
  {
    title: 'Inteligencia Artificial',
    benefit: 'Mejora la toma de decisiones',
    percentage: '85%',
    description: 'La IA permite decisiones más precisas, reduciendo errores en un 85% y optimizando recursos empresariales.',
    icon: '🤖'
  },
  {
    title: 'Agentes Orquestados de IA',
    benefit: 'Optimiza flujos de trabajo',
    percentage: '60%',
    description: 'Los sistemas de agentes coordinados reducen costos operativos hasta en un 60% mientras mejoran la eficiencia.',
    icon: '🎯'
  },
  {
    title: 'Cloud & DevOps',
    benefit: 'Acelera el despliegue',
    percentage: '50%',
    description: 'Las implementaciones en la nube reducen tiempos de despliegue en un 50% y mejoran la escalabilidad.',
    icon: '☁️'
  },
  {
    title: 'ROI Promedio',
    benefit: 'Retorno de inversión',
    percentage: '300%',
    description: 'Las empresas que implementan nuestras soluciones obtienen un retorno de inversión promedio del 300% en el primer año.',
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
        <h2>Construimos el Futuro del Software.</h2>
        <p>
          Somos Dev Cracks, un equipo de desarrolladores top, innovando en cada línea de código para transformar ideas
          en soluciones excepcionales y de alto impacto.
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

        <a className="btn-primary" href="#contacto">
          ¡Hablemos de tu proyecto!
        </a>
      </div>
    </section>
  );
};

