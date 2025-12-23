import { useNavigate } from 'react-router-dom';
import { FadeInSection } from './FadeInSection';

interface Service {
  title: string;
  what: string;
  problem: string;
  how: string;
  benefit: string;
  technologies?: string[];
  interactive: boolean;
}

const services: Service[] = [
  {
    title: 'Consultoría Estratégica en IA y Automatización',
    what: 'Asesoramiento estratégico para identificar oportunidades de implementación de IA y automatización en tu organización.',
    problem: 'Falta de visión clara sobre dónde y cómo aplicar IA para maximizar ROI. Decisiones basadas en intuición en lugar de datos.',
    how: 'Análisis exhaustivo de procesos, identificación de casos de uso de alto impacto, roadmap de implementación priorizado y proyección de ROI.',
    benefit: 'Estrategia clara con ROI proyectado, priorización de iniciativas y roadmap ejecutable desde el primer día.',
    technologies: ['Análisis de procesos', 'Roadmap estratégico', 'Proyección de ROI'],
    interactive: false
  },
  {
    title: 'Desarrollo de Soluciones a Medida',
    what: 'Software, APIs e integración de datos personalizados diseñados específicamente para tus necesidades empresariales.',
    problem: 'Soluciones genéricas no se adaptan a necesidades específicas. Sistemas legacy limitan innovación y escalabilidad.',
    how: 'Arquitectura moderna cloud-native, desarrollo ágil con metodologías probadas, integración seamless con sistemas existentes y escalabilidad desde el diseño.',
    benefit: 'Soluciones que escalan con el negocio, integración sin interrupciones y mantenimiento simplificado.',
    technologies: ['Cloud-native', 'Microservicios', 'APIs REST/GraphQL'],
    interactive: false
  },
  {
    title: 'Data Engineering y ML para Predicción y Optimización',
    what: 'Pipelines de datos robustos y modelos de Machine Learning para decisiones inteligentes basadas en datos.',
    problem: 'Datos sin explotar, decisiones basadas en intuición, falta de visibilidad en tiempo real y oportunidades perdidas de optimización.',
    how: 'Ingesta y procesamiento de datos a escala, modelos ML entrenados con datos reales, dashboards en tiempo real y análisis predictivo continuo.',
    benefit: 'Decisiones basadas en datos, optimización continua, predicción de tendencias y reducción de riesgos operacionales.',
    technologies: ['Machine Learning', 'Análisis predictivo', 'Dashboards en tiempo real'],
    interactive: true
  },
  {
    title: 'Integración de Sistemas Legacy con Plataformas Modernas',
    what: 'Modernización de sistemas antiguos sin interrumpir operaciones, conectando lo antiguo con lo nuevo.',
    problem: 'Sistemas legacy limitan innovación, alto costo de mantenimiento, dificultad para integrar nuevas tecnologías y riesgo operacional alto.',
    how: 'APIs como capa de abstracción, arquitectura híbrida, migración gradual sin downtime y mantenimiento de sistemas críticos durante la transición.',
    benefit: 'Innovación sin riesgo operacional, reducción de costos de mantenimiento, escalabilidad mejorada y preparación para el futuro.',
    technologies: ['APIs', 'Microservicios', 'Arquitectura híbrida'],
    interactive: false
  },
  {
    title: 'Automatización de Procesos Empresariales',
    what: 'Optimización y automatización de procesos empresariales con soluciones personalizadas que transforman operaciones.',
    problem: 'Procesos manuales repetitivos, altos costos operativos, errores humanos frecuentes y tiempos de ejecución prolongados.',
    how: 'Análisis de procesos, identificación de oportunidades de automatización, implementación de workflows inteligentes y monitoreo continuo de eficiencia.',
    benefit: 'Reducción de costos operativos del 50-70%, eliminación de errores manuales, aumento de productividad y liberación de tiempo para tareas estratégicas.',
    technologies: ['RPA', 'Workflows inteligentes', 'Automatización end-to-end'],
    interactive: true
  },
  {
    title: 'Agentes Orquestados de IA',
    what: 'Sistemas inteligentes con múltiples agentes de IA que trabajan coordinados para resolver tareas complejas.',
    problem: 'Tareas complejas requieren múltiples pasos manuales, coordinación entre equipos es ineficiente y escalabilidad limitada de procesos.',
    how: 'Arquitectura de agentes especializados, orquestación inteligente de tareas, comunicación entre agentes y aprendizaje continuo del sistema.',
    benefit: 'Automatización de flujos complejos, reducción de costos operativos hasta 60%, escalabilidad automática y resolución autónoma de problemas.',
    technologies: ['Agentes de IA', 'Orquestación', 'Aprendizaje continuo'],
    interactive: true
  },
  {
    title: 'Cloud & DevOps Enterprise',
    what: 'Arquitecturas en la nube escalables y pipelines de DevOps para agilizar despliegue y operación.',
    problem: 'Despliegues lentos y manuales, infraestructura rígida, dificultad para escalar y falta de visibilidad operacional.',
    how: 'Arquitectura cloud-native, CI/CD automatizado, infraestructura como código, monitoreo y observabilidad en tiempo real.',
    benefit: 'Reducción de tiempos de despliegue en 50%, escalabilidad automática, mayor confiabilidad y reducción de costos de infraestructura.',
    technologies: ['Cloud-native', 'CI/CD', 'Infraestructura como código'],
    interactive: false
  },
  {
    title: 'Seguridad y Auditoría de Código',
    what: 'Garantizamos la robustez y seguridad de tus sistemas con auditorías exhaustivas y mejores prácticas.',
    problem: 'Vulnerabilidades de seguridad, código sin estándares, falta de compliance y riesgos de seguridad no detectados.',
    how: 'Auditorías de código exhaustivas, análisis de vulnerabilidades, implementación de mejores prácticas de seguridad y compliance con estándares.',
    benefit: 'Sistemas seguros y robustos, compliance garantizado, reducción de riesgos y confianza de stakeholders.',
    technologies: ['Auditoría de código', 'Análisis de vulnerabilidades', 'Mejores prácticas'],
    interactive: false
  }
];

export const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service: Service) => {
    if (service.interactive) {
      console.log('Navegando a /servicios');
      navigate('/servicios');
    }
  };

  return (
    <section id="servicios" className="services">
      <div className="container">
        <h2>Servicios de Transformación Digital</h2>
        <p className="services__intro">
          Cada servicio está diseñado para resolver problemas reales de negocio con resultados medibles. 
          Desde consultoría estratégica hasta implementación técnica, acompañamos tu transformación digital.
        </p>
        <div className="service-grid">
          {services.map((service) => (
            <FadeInSection
              key={service.title}
              className={`service-item ${service.interactive ? 'service-item--interactive' : ''}`}
              onClick={() => handleServiceClick(service)}
            >
              <h3>{service.title}</h3>
              
              <div className="service-item__content">
                <div className="service-item__section">
                  <h4 className="service-item__section-title">¿Qué es?</h4>
                  <p>{service.what}</p>
                </div>

                <div className="service-item__section">
                  <h4 className="service-item__section-title">Problema que resuelve:</h4>
                  <p>{service.problem}</p>
                </div>

                <div className="service-item__section">
                  <h4 className="service-item__section-title">Cómo lo hacemos:</h4>
                  <p>{service.how}</p>
                  {service.technologies && (
                    <div className="service-item__technologies">
                      {service.technologies.map((tech, i) => (
                        <span key={i} className="service-item__tech-badge">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="service-item__section service-item__section--benefit">
                  <h4 className="service-item__section-title">Beneficio empresarial:</h4>
                  <p className="service-item__benefit">{service.benefit}</p>
                </div>
              </div>

              {service.interactive && (
                <div className="service-item__badge">
                  <span>✨ Experiencia Interactiva</span>
                </div>
              )}
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

