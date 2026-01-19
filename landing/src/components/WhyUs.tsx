import { useTranslation } from 'react-i18next';
import { FadeInSection } from './FadeInSection';

export const WhyUs = () => {
  const { t } = useTranslation('landing');

  // Comparativa con competidores
  const comparisonFeatures = [
    {
      feature: t('whyUs.table.rows.technical.feature'),
      devCracks: t('whyUs.table.rows.technical.devCracks'),
      genericAgencies: t('whyUs.table.rows.technical.generic'),
      traditionalConsultants: t('whyUs.table.rows.technical.traditional')
    },
    {
      feature: t('whyUs.table.rows.speed.feature'),
      devCracks: t('whyUs.table.rows.speed.devCracks'),
      genericAgencies: t('whyUs.table.rows.speed.generic'),
      traditionalConsultants: t('whyUs.table.rows.speed.traditional')
    },
    {
      feature: t('whyUs.table.rows.roi.feature'),
      devCracks: t('whyUs.table.rows.roi.devCracks'),
      genericAgencies: t('whyUs.table.rows.roi.generic'),
      traditionalConsultants: t('whyUs.table.rows.roi.traditional')
    },
    {
      feature: t('whyUs.table.rows.automation.feature'),
      devCracks: t('whyUs.table.rows.automation.devCracks'),
      genericAgencies: t('whyUs.table.rows.automation.generic'),
      traditionalConsultants: t('whyUs.table.rows.automation.traditional')
    },
    {
      feature: t('whyUs.table.rows.legacy.feature'),
      devCracks: t('whyUs.table.rows.legacy.devCracks'),
      genericAgencies: t('whyUs.table.rows.legacy.generic'),
      traditionalConsultants: t('whyUs.table.rows.legacy.traditional')
    },
    {
      feature: t('whyUs.table.rows.support.feature'),
      devCracks: t('whyUs.table.rows.support.devCracks'),
      genericAgencies: t('whyUs.table.rows.support.generic'),
      traditionalConsultants: t('whyUs.table.rows.support.traditional')
    }
  ];

  return (
    <section id="nosotros" className="why-us">
      <div className="container">
        <h2>{t('whyUs.title')}</h2>
        <p className="why-us__intro">
          {t('whyUs.intro')}
        </p>

        <div className="why-us__comparison">
          <div className="comparison-table">
            <div className="comparison-table__header">
              <div className="comparison-table__cell comparison-table__cell--feature">{t('whyUs.table.header.feature')}</div>
              <div className="comparison-table__cell comparison-table__cell--devcracks">
                <strong>{t('whyUs.table.header.devCracks')}</strong>
              </div>
              <div className="comparison-table__cell comparison-table__cell--competitor">
                {t('whyUs.table.header.generic')}
              </div>
              <div className="comparison-table__cell comparison-table__cell--competitor">
                {t('whyUs.table.header.traditional')}
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
          <h3>{t('whyUs.differentiators.title')}</h3>
          <div className="differentiators-grid">
            <FadeInSection className="differentiator-card">
              <div className="differentiator-card__icon">⚡</div>
              <h4>{t('whyUs.differentiators.items.experts.title')}</h4>
              <p>{t('whyUs.differentiators.items.experts.description')}</p>
            </FadeInSection>
            <FadeInSection className="differentiator-card">
              <div className="differentiator-card__icon">💡</div>
              <h4>{t('whyUs.differentiators.items.innovation.title')}</h4>
              <p>{t('whyUs.differentiators.items.innovation.description')}</p>
            </FadeInSection>
            <FadeInSection className="differentiator-card">
              <div className="differentiator-card__icon">✅</div>
              <h4>{t('whyUs.differentiators.items.quality.title')}</h4>
              <p>{t('whyUs.differentiators.items.quality.description')}</p>
            </FadeInSection>
            <FadeInSection className="differentiator-card">
              <div className="differentiator-card__icon">🤝</div>
              <h4>{t('whyUs.differentiators.items.collaboration.title')}</h4>
              <p>{t('whyUs.differentiators.items.collaboration.description')}</p>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};
