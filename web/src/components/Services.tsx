import { FadeInSection } from './FadeInSection';

const services = [
  {
    title: 'Desarrollo Web Full-Stack',
    description: 'Desde interfaces impresionantes hasta bases de datos robustas, creamos soluciones web completas y escalables.'
  },
  {
    title: 'Aplicaciones Móviles Nativas',
    description: 'Diseñamos y desarrollamos apps Android e iOS con rendimiento impecable y experiencias de usuario intuitivas.'
  },
  {
    title: 'Consultoría Tecnológica',
    description: 'Asesoramos a empresas para optimizar sus procesos, adoptar nuevas tecnologías y resolver desafíos complejos.'
  },
  {
    title: 'Cloud & DevOps',
    description: 'Implementamos arquitecturas en la nube y pipelines de DevOps para agilizar el despliegue y la operación.'
  },
  {
    title: 'Inteligencia Artificial & ML',
    description: 'Integramos soluciones de IA y Machine Learning para automatización, análisis predictivo y toma de decisiones.'
  },
  {
    title: 'Seguridad y Auditoría de Código',
    description: 'Garantizamos la robustez y seguridad de tus sistemas con auditorías exhaustivas y mejores prácticas.'
  }
];

export const Services = () => (
  <section id="servicios" className="services">
    <div className="container">
      <h2>Nuestros Servicios Destacados</h2>
      <div className="service-grid">
        {services.map((service) => (
          <FadeInSection key={service.title} className="service-item">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

