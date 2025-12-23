import { FadeInSection } from './FadeInSection';

interface CaseStudy {
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  icon: string;
}

const caseStudies: CaseStudy[] = [
  {
    industry: 'Logística',
    title: 'Optimización de Red de Franquicias de Paquetería',
    challenge: 'Red de franquicias con procesos manuales, alta tasa de errores operativos y falta de visibilidad en tiempo real de la operación.',
    solution: 'Implementación de Routeon Enterprise con ML para predicción de demanda, automatización de workflows y dashboard centralizado.',
    metrics: [
      { label: 'Eficiencia Operativa', value: '+30%', improvement: 'Aumento' },
      { label: 'Errores Manuales', value: '-40%', improvement: 'Reducción' },
      { label: 'Tiempo de Gestión', value: '-50%', improvement: 'Reducción' },
      { label: 'Satisfacción Cliente', value: '+35%', improvement: 'Aumento' }
    ],
    icon: '📦'
  },
  {
    industry: 'Retail',
    title: 'Optimización de Inventario con Machine Learning',
    challenge: 'Sobrestock y desabastecimiento frecuente, decisiones de compra basadas en intuición y pérdidas por obsolescencia.',
    solution: 'Sistema de predicción de demanda con ML, optimización automática de inventario y alertas proactivas de reposición.',
    metrics: [
      { label: 'Reducción de Costos', value: '-25%', improvement: 'Inventario' },
      { label: 'Disponibilidad', value: '+45%', improvement: 'Productos' },
      { label: 'Pérdidas por Obsolescencia', value: '-60%', improvement: 'Reducción' },
      { label: 'ROI', value: '280%', improvement: 'Primer año' }
    ],
    icon: '🛒'
  },
  {
    industry: 'Servicios Financieros',
    title: 'Automatización de Procesos Regulatorios',
    challenge: 'Procesos regulatorios manuales, tiempos de cumplimiento prolongados y alto riesgo de errores en reportes.',
    solution: 'Automatización inteligente de procesos regulatorios con agentes de IA orquestados y validación automática de compliance.',
    metrics: [
      { label: 'Tiempo de Cumplimiento', value: '-65%', improvement: 'Reducción' },
      { label: 'Errores en Reportes', value: '-85%', improvement: 'Reducción' },
      { label: 'Costos Operativos', value: '-40%', improvement: 'Reducción' },
      { label: 'Compliance', value: '100%', improvement: 'Tasa' }
    ],
    icon: '💳'
  },
  {
    industry: 'Manufacturing',
    title: 'Predicción de Mantenimiento Preventivo',
    challenge: 'Mantenimiento reactivo causando paradas inesperadas, altos costos de reparación y pérdida de productividad.',
    solution: 'Sistema de ML para predicción de fallos, mantenimiento preventivo optimizado y reducción de downtime no planificado.',
    metrics: [
      { label: 'Downtime', value: '-55%', improvement: 'Reducción' },
      { label: 'Costos de Mantenimiento', value: '-35%', improvement: 'Reducción' },
      { label: 'Disponibilidad', value: '+42%', improvement: 'Equipos' },
      { label: 'Productividad', value: '+38%', improvement: 'Aumento' }
    ],
    icon: '🏭'
  }
];

export const CaseStudies = () => {
  return (
    <section id="casos-uso" className="case-studies">
      <div className="container">
        <h2>Casos de Uso y Resultados Comprobados</h2>
        <p className="case-studies__intro">
          Transformamos empresas de diferentes industrias con soluciones de IA y automatización. 
          Estos son ejemplos reales de impacto medible en operaciones empresariales.
        </p>

        <div className="case-studies-grid">
          {caseStudies.map((study, index) => (
            <FadeInSection key={index} className="case-study-card">
              <div className="case-study-card__header">
                <div className="case-study-card__icon">{study.icon}</div>
                <div>
                  <span className="case-study-card__industry">{study.industry}</span>
                  <h3 className="case-study-card__title">{study.title}</h3>
                </div>
              </div>

              <div className="case-study-card__content">
                <div className="case-study-card__section">
                  <h4 className="case-study-card__section-title">Desafío:</h4>
                  <p>{study.challenge}</p>
                </div>

                <div className="case-study-card__section">
                  <h4 className="case-study-card__section-title">Solución:</h4>
                  <p>{study.solution}</p>
                </div>

                <div className="case-study-card__metrics">
                  <h4 className="case-study-card__section-title">Resultados Medibles:</h4>
                  <div className="case-study-card__metrics-grid">
                    {study.metrics.map((metric, i) => (
                      <div key={i} className="case-study-metric">
                        <div className="case-study-metric__value">{metric.value}</div>
                        <div className="case-study-metric__label">{metric.label}</div>
                        <div className="case-study-metric__improvement">{metric.improvement}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <div className="case-studies__cta">
          <p>¿Quieres resultados similares en tu empresa?</p>
          <a className="btn-primary" href="#contacto">
            Solicitar Consultoría Estratégica
          </a>
        </div>
      </div>
    </section>
  );
};

