import { FadeInSection } from './FadeInSection';

const differentiators = [
  {
    icon: '⚡',
    title: 'Expertos de Élite',
    description: 'Nuestro equipo está compuesto por desarrolladores top con años de experiencia en las tecnologías más avanzadas.'
  },
  {
    icon: '💡',
    title: 'Innovación Constante',
    description: 'Siempre estamos al día con las últimas tendencias y metodologías para ofrecer soluciones vanguardistas.'
  },
  {
    icon: '✅',
    title: 'Calidad Impecable',
    description: 'Nos comprometemos a entregar software robusto, escalable y con un código limpio y eficiente.'
  },
  {
    icon: '🤝',
    title: 'Colaboración Transparente',
    description: 'Trabajamos codo a codo contigo, manteniendo una comunicación abierta y un proceso ágil.'
  }
];

export const WhyUs = () => (
  <section id="nosotros" className="why-us">
    <div className="container">
      <h2>¿Por Qué Elegir a Dev Cracks?</h2>
      {differentiators.map((item) => (
        <FadeInSection key={item.title} className="why-us__item">
          <span className="icon" aria-hidden="true">
            {item.icon}
          </span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </FadeInSection>
      ))}
    </div>
  </section>
);

