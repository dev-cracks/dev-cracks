import { useTranslation } from 'react-i18next';
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

export const CaseStudies = () => {
  const { t } = useTranslation('landing');
  
  const caseStudies: CaseStudy[] = [
    {
      industry: t('caseStudies.studies.logistics.industry'),
      title: t('caseStudies.studies.logistics.title'),
      challenge: t('caseStudies.studies.logistics.challenge'),
      solution: t('caseStudies.studies.logistics.solution'),
      metrics: [
        { label: t('caseStudies.studies.logistics.metrics.operationalEfficiency'), value: '+30%', improvement: t('caseStudies.studies.logistics.metrics.increase') },
        { label: t('caseStudies.studies.logistics.metrics.manualErrors'), value: '-40%', improvement: t('caseStudies.studies.logistics.metrics.reduction') },
        { label: t('caseStudies.studies.logistics.metrics.managementTime'), value: '-50%', improvement: t('caseStudies.studies.logistics.metrics.reduction') },
        { label: t('caseStudies.studies.logistics.metrics.customerSatisfaction'), value: '+35%', improvement: t('caseStudies.studies.logistics.metrics.increase') }
      ],
      icon: '📦'
    },
    {
      industry: t('caseStudies.studies.retail.industry'),
      title: t('caseStudies.studies.retail.title'),
      challenge: t('caseStudies.studies.retail.challenge'),
      solution: t('caseStudies.studies.retail.solution'),
      metrics: [
        { label: t('caseStudies.studies.retail.metrics.costReduction'), value: '-25%', improvement: t('caseStudies.studies.retail.metrics.inventory') },
        { label: t('caseStudies.studies.retail.metrics.availability'), value: '+45%', improvement: t('caseStudies.studies.retail.metrics.products') },
        { label: t('caseStudies.studies.retail.metrics.obsolescenceLosses'), value: '-60%', improvement: t('caseStudies.studies.retail.metrics.reduction') },
        { label: t('caseStudies.studies.retail.metrics.roi'), value: '280%', improvement: t('caseStudies.studies.retail.metrics.firstYear') }
      ],
      icon: '🛒'
    },
    {
      industry: t('caseStudies.studies.financial.industry'),
      title: t('caseStudies.studies.financial.title'),
      challenge: t('caseStudies.studies.financial.challenge'),
      solution: t('caseStudies.studies.financial.solution'),
      metrics: [
        { label: t('caseStudies.studies.financial.metrics.complianceTime'), value: '-65%', improvement: t('caseStudies.studies.financial.metrics.reduction') },
        { label: t('caseStudies.studies.financial.metrics.reportErrors'), value: '-85%', improvement: t('caseStudies.studies.financial.metrics.reduction') },
        { label: t('caseStudies.studies.financial.metrics.operationalCosts'), value: '-40%', improvement: t('caseStudies.studies.financial.metrics.reduction') },
        { label: t('caseStudies.studies.financial.metrics.compliance'), value: '100%', improvement: t('caseStudies.studies.financial.metrics.rate') }
      ],
      icon: '💳'
    },
    {
      industry: t('caseStudies.studies.manufacturing.industry'),
      title: t('caseStudies.studies.manufacturing.title'),
      challenge: t('caseStudies.studies.manufacturing.challenge'),
      solution: t('caseStudies.studies.manufacturing.solution'),
      metrics: [
        { label: t('caseStudies.studies.manufacturing.metrics.downtime'), value: '-55%', improvement: t('caseStudies.studies.manufacturing.metrics.reduction') },
        { label: t('caseStudies.studies.manufacturing.metrics.maintenanceCosts'), value: '-35%', improvement: t('caseStudies.studies.manufacturing.metrics.reduction') },
        { label: t('caseStudies.studies.manufacturing.metrics.availability'), value: '+42%', improvement: t('caseStudies.studies.manufacturing.metrics.equipment') },
        { label: t('caseStudies.studies.manufacturing.metrics.productivity'), value: '+38%', improvement: t('caseStudies.studies.manufacturing.metrics.increase') }
      ],
      icon: '🏭'
    },
    {
      industry: t('caseStudies.studies.ecommerce.industry'),
      title: t('caseStudies.studies.ecommerce.title'),
      challenge: t('caseStudies.studies.ecommerce.challenge'),
      solution: t('caseStudies.studies.ecommerce.solution'),
      metrics: [
        { label: t('caseStudies.studies.ecommerce.metrics.conversionRate'), value: '+52%', improvement: t('caseStudies.studies.ecommerce.metrics.increase') },
        { label: t('caseStudies.studies.ecommerce.metrics.abandonedCarts'), value: '-38%', improvement: t('caseStudies.studies.ecommerce.metrics.reduction') },
        { label: t('caseStudies.studies.ecommerce.metrics.averageOrderValue'), value: '+28%', improvement: t('caseStudies.studies.ecommerce.metrics.increase') },
        { label: t('caseStudies.studies.ecommerce.metrics.roi'), value: '320%', improvement: t('caseStudies.studies.ecommerce.metrics.firstYear') }
      ],
      icon: '🛍️'
    },
    {
      industry: t('caseStudies.studies.healthcare.industry'),
      title: t('caseStudies.studies.healthcare.title'),
      challenge: t('caseStudies.studies.healthcare.challenge'),
      solution: t('caseStudies.studies.healthcare.solution'),
      metrics: [
        { label: t('caseStudies.studies.healthcare.metrics.waitTimes'), value: '-45%', improvement: t('caseStudies.studies.healthcare.metrics.reduction') },
        { label: t('caseStudies.studies.healthcare.metrics.resourceUtilization'), value: '+35%', improvement: t('caseStudies.studies.healthcare.metrics.increase') },
        { label: t('caseStudies.studies.healthcare.metrics.patientSatisfaction'), value: '+48%', improvement: t('caseStudies.studies.healthcare.metrics.increase') },
        { label: t('caseStudies.studies.healthcare.metrics.operationalCosts'), value: '-30%', improvement: t('caseStudies.studies.healthcare.metrics.reduction') }
      ],
      icon: '🏥'
    }
  ];

  return (
    <section id="casos-uso" className="case-studies">
      <div className="container">
        <h2>{t('caseStudies.title')}</h2>
        <p className="case-studies__intro">
          {t('caseStudies.intro')}
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
                  <h4 className="case-study-card__section-title">{t('caseStudies.challenge')}</h4>
                  <p>{study.challenge}</p>
                </div>

                <div className="case-study-card__section">
                  <h4 className="case-study-card__section-title">{t('caseStudies.solution')}</h4>
                  <p>{study.solution}</p>
                </div>

                <div className="case-study-card__metrics">
                  <h4 className="case-study-card__section-title">{t('caseStudies.results')}</h4>
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
          <p>{t('caseStudies.cta')}</p>
          <a className="btn-primary" href="#contacto">
            {t('caseStudies.ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
};

