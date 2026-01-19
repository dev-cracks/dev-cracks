import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

export const Services = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();

  const services: Service[] = [
    {
      title: t('services.items.consulting.title'),
      what: t('services.items.consulting.what'),
      problem: t('services.items.consulting.problem'),
      how: t('services.items.consulting.how'),
      benefit: t('services.items.consulting.benefit'),
      technologies: t('services.items.consulting.technologies', { returnObjects: true }) as string[],
      interactive: false
    },
    {
      title: t('services.items.customDev.title'),
      what: t('services.items.customDev.what'),
      problem: t('services.items.customDev.problem'),
      how: t('services.items.customDev.how'),
      benefit: t('services.items.customDev.benefit'),
      technologies: t('services.items.customDev.technologies', { returnObjects: true }) as string[],
      interactive: false
    },
    {
      title: t('services.items.dataMl.title'),
      what: t('services.items.dataMl.what'),
      problem: t('services.items.dataMl.problem'),
      how: t('services.items.dataMl.how'),
      benefit: t('services.items.dataMl.benefit'),
      technologies: t('services.items.dataMl.technologies', { returnObjects: true }) as string[],
      interactive: true
    },
    {
      title: t('services.items.legacy.title'),
      what: t('services.items.legacy.what'),
      problem: t('services.items.legacy.problem'),
      how: t('services.items.legacy.how'),
      benefit: t('services.items.legacy.benefit'),
      technologies: t('services.items.legacy.technologies', { returnObjects: true }) as string[],
      interactive: false
    },
    {
      title: t('services.items.automation.title'),
      what: t('services.items.automation.what'),
      problem: t('services.items.automation.problem'),
      how: t('services.items.automation.how'),
      benefit: t('services.items.automation.benefit'),
      technologies: t('services.items.automation.technologies', { returnObjects: true }) as string[],
      interactive: true
    },
    {
      title: t('services.items.agents.title'),
      what: t('services.items.agents.what'),
      problem: t('services.items.agents.problem'),
      how: t('services.items.agents.how'),
      benefit: t('services.items.agents.benefit'),
      technologies: t('services.items.agents.technologies', { returnObjects: true }) as string[],
      interactive: true
    },
    {
      title: t('services.items.cloud.title'),
      what: t('services.items.cloud.what'),
      problem: t('services.items.cloud.problem'),
      how: t('services.items.cloud.how'),
      benefit: t('services.items.cloud.benefit'),
      technologies: t('services.items.cloud.technologies', { returnObjects: true }) as string[],
      interactive: false
    },
    {
      title: t('services.items.security.title'),
      what: t('services.items.security.what'),
      problem: t('services.items.security.problem'),
      how: t('services.items.security.how'),
      benefit: t('services.items.security.benefit'),
      technologies: t('services.items.security.technologies', { returnObjects: true }) as string[],
      interactive: false
    }
  ];

  const handleServiceClick = (service: Service) => {
    if (service.interactive) {
      console.log('Navegando a /servicios');
      navigate('/servicios');
    }
  };

  return (
    <section id="servicios" className="services">
      <div className="container">
        <h2>{t('services.title')}</h2>
        <p className="services__intro">
          {t('services.intro')}
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
                  <h4 className="service-item__section-title">{t('services.labels.what')}</h4>
                  <p>{service.what}</p>
                </div>

                <div className="service-item__section">
                  <h4 className="service-item__section-title">{t('services.labels.problem')}</h4>
                  <p>{service.problem}</p>
                </div>

                <div className="service-item__section">
                  <h4 className="service-item__section-title">{t('services.labels.how')}</h4>
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
                  <h4 className="service-item__section-title">{t('services.labels.benefit')}</h4>
                  <p className="service-item__benefit">{service.benefit}</p>
                </div>
              </div>

              {service.interactive && (
                <div className="service-item__badge">
                  <span>{t('services.labels.interactive')}</span>
                </div>
              )}
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
