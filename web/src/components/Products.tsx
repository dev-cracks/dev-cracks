import { FadeInSection } from './FadeInSection';

interface Product {
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  results: string[];
  cta: string;
  ctaLink: string;
  icon: string;
}

const products: Product[] = [
  {
    name: 'Routeon Enterprise',
    tagline: 'Gestión Centralizada de Franquicias de Paquetería',
    description: 'Plataforma SaaS para operación, visibilidad en tiempo real y optimización logística de redes de franquicias de paquetería (MRW y similares).',
    benefits: [
      'Reducción de errores operativos mediante automatización inteligente',
      'Predicción de demanda mediante Machine Learning',
      'Automatización de workflows complejos',
      'Visibilidad en tiempo real de toda la red'
    ],
    results: [
      'Aumentos de eficiencia operativa del 30-40%',
      'Reducción de tiempos de gestión en un 50%',
      'Mayor satisfacción de franquiciados y clientes finales',
      'ROI positivo desde el primer trimestre'
    ],
    cta: 'Solicitar Demo de Routeon Enterprise',
    ctaLink: '#contacto',
    icon: '📦'
  },
  {
    name: 'Dev-Coach Pro',
    tagline: 'Programa Acelerado de Formación Técnica',
    description: 'Itinerario formativo orientado a proyectos reales con mentoría experta para desarrollar habilidades de ingeniería de software (de junior a senior).',
    benefits: [
      'Reducción de rotación de talento técnico',
      'Talentos listos para producción desde el inicio',
      'Pipeline de talento interno escalable',
      'Enfoque en habilidades empresariales reales'
    ],
    results: [
      'Reducción de brechas técnicas en 3-6 meses',
      'Tiempo hasta impacto real reducido en un 60%',
      'Aumento de productividad del equipo del 40%',
      'ROI medible en costos de contratación y onboarding'
    ],
    cta: 'Conocer Programa Dev-Coach Pro',
    ctaLink: '#contacto',
    icon: '🎓'
  },
  {
    name: 'DEV Community',
    tagline: 'Comunidad de Desarrolladores y Recursos Técnicos',
    description: 'Comunidad activa de desarrolladores con recursos técnicos, eventos, networking y acceso a contenido exclusivo sobre las últimas tecnologías.',
    benefits: [
      'Acceso a recursos técnicos exclusivos',
      'Networking con desarrolladores top',
      'Eventos y webinars especializados',
      'Comunidad activa y colaborativa'
    ],
    results: [
      'Actualización continua en tecnologías emergentes',
      'Oportunidades de colaboración y proyectos',
      'Acceso a mentores y expertos',
      'Crecimiento profesional acelerado'
    ],
    cta: 'Unirse a la Comunidad',
    ctaLink: 'https://discord.gg/9eaBf5qR',
    icon: '👥'
  }
];

export const Products = () => {
  const handleCTAClick = (link: string) => {
    if (link.startsWith('#')) {
      const element = document.getElementById(link.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="productos" className="products">
      <div className="container">
        <h2>Nuestros Productos Empresariales</h2>
        <p className="products__intro">
          Soluciones probadas y escalables diseñadas para resolver problemas reales de negocio. 
          Cada producto está optimizado para generar impacto medible desde el primer día.
        </p>

        <div className="products-grid">
          {products.map((product, index) => (
            <FadeInSection key={product.name} className="product-card">
              <div className="product-card__header">
                <div className="product-card__icon">{product.icon}</div>
                <div className="product-card__title-section">
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__tagline">{product.tagline}</p>
                </div>
              </div>

              <p className="product-card__description">{product.description}</p>

              <div className="product-card__benefits">
                <h4 className="product-card__section-title">Beneficios Clave:</h4>
                <ul className="product-card__list">
                  {product.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="product-card__results">
                <h4 className="product-card__section-title">Resultados Esperados:</h4>
                <ul className="product-card__list product-card__list--results">
                  {product.results.map((result, i) => (
                    <li key={i}>{result}</li>
                  ))}
                </ul>
              </div>

              <button
                className="product-card__cta"
                onClick={() => handleCTAClick(product.ctaLink)}
              >
                {product.cta}
              </button>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

