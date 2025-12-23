import { FadeInSection } from './FadeInSection';

// Comparativa con competidores
const comparisonFeatures = [
  {
    feature: 'Profundidad Técnica en IA y ML',
    devCracks: 'Expertos certificados en IA aplicada, machine learning y automatización inteligente',
    genericAgencies: 'Conocimiento superficial, enfoque en desarrollo web tradicional',
    traditionalConsultants: 'Teoría sin implementación práctica, dependencia de terceros'
  },
  {
    feature: 'Velocidad de Implementación',
    devCracks: 'Metodologías ágiles, prototipado rápido, MVP en semanas',
    genericAgencies: 'Procesos lentos, burocracia interna, plazos extendidos',
    traditionalConsultants: 'Análisis prolongado, implementación lenta, meses hasta resultados'
  },
  {
    feature: 'Resultados Medibles y ROI',
    devCracks: 'Métricas claras desde el día 1, ROI promedio del 300% en primer año',
    genericAgencies: 'Métricas vagas, difícil medir impacto real',
    traditionalConsultants: 'ROI difícil de cuantificar, resultados a largo plazo inciertos'
  },
  {
    feature: 'Enfoque en Automatización Inteligente',
    devCracks: 'Agentes orquestados de IA, automatización end-to-end',
    genericAgencies: 'Automatización básica, scripts simples',
    traditionalConsultants: 'Recomendaciones sin implementación técnica'
  },
  {
    feature: 'Integración con Sistemas Legacy',
    devCracks: 'Modernización sin interrupciones, arquitectura híbrida',
    genericAgencies: 'Reemplazo completo, alto riesgo operacional',
    traditionalConsultants: 'Análisis sin ejecución técnica real'
  },
  {
    feature: 'Soporte y Evolución Continua',
    devCracks: 'Partnership estratégico, evolución continua del producto',
    genericAgencies: 'Soporte limitado post-entrega, costos adicionales',
    traditionalConsultants: 'Proyecto cerrado, sin seguimiento técnico'
  }
];

export const WhyUs = () => (
  <section id="nosotros" className="why-us">
    <div className="container">
      <h2>¿Por Qué Elegir Dev-Cracks?</h2>
      <p className="why-us__intro">
        No somos otra agencia de software ni una consultora tradicional. Somos un partner estratégico 
        de transformación digital con expertise técnico profundo y resultados comprobables.
      </p>

      <div className="why-us__comparison">
        <div className="comparison-table">
          <div className="comparison-table__header">
            <div className="comparison-table__cell comparison-table__cell--feature">Característica</div>
            <div className="comparison-table__cell comparison-table__cell--devcracks">
              <strong>Dev-Cracks</strong>
            </div>
            <div className="comparison-table__cell comparison-table__cell--competitor">
              Agencias Genéricas
            </div>
            <div className="comparison-table__cell comparison-table__cell--competitor">
              Consultoras Tradicionales
            </div>
          </div>

          {comparisonFeatures.map((item, index) => (
            <FadeInSection key={index} className="comparison-table__row">
              <div className="comparison-table__cell comparison-table__cell--feature">
                <strong>{item.feature}</strong>
              </div>
              <div className="comparison-table__cell comparison-table__cell--devcracks">
                <span className="comparison-check">✓</span>
                {item.devCracks}
              </div>
              <div className="comparison-table__cell comparison-table__cell--competitor">
                {item.genericAgencies}
              </div>
              <div className="comparison-table__cell comparison-table__cell--competitor">
                {item.traditionalConsultants}
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>

      <div className="why-us__differentiators">
        <h3>Nuestros Diferenciadores Clave</h3>
        <div className="differentiators-grid">
          <FadeInSection className="differentiator-card">
            <div className="differentiator-card__icon">⚡</div>
            <h4>Expertos de Élite</h4>
            <p>Desarrolladores top con años de experiencia en tecnologías avanzadas de IA y automatización.</p>
          </FadeInSection>
          <FadeInSection className="differentiator-card">
            <div className="differentiator-card__icon">💡</div>
            <h4>Innovación Constante</h4>
            <p>Al día con las últimas tendencias y metodologías para ofrecer soluciones vanguardistas.</p>
          </FadeInSection>
          <FadeInSection className="differentiator-card">
            <div className="differentiator-card__icon">✅</div>
            <h4>Calidad Impecable</h4>
            <p>Software robusto, escalable y con código limpio y eficiente desde el primer día.</p>
          </FadeInSection>
          <FadeInSection className="differentiator-card">
            <div className="differentiator-card__icon">🤝</div>
            <h4>Colaboración Transparente</h4>
            <p>Comunicación abierta, procesos ágiles y trabajo codo a codo con tu equipo.</p>
          </FadeInSection>
        </div>
      </div>
    </div>
  </section>
);

