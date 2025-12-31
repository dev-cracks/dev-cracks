import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import RippleGrid from '../components/RippleGrid';
import './HomePage.css';

export const HomePage = () => {
  const { t } = useTranslation('fractalize');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fractalize-page">
      {/* Background */}
      <div className="fractalize-page__background">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.08}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.5}
          opacity={0.4}
        />
      </div>

      {/* Header */}
      <header className="fractalize-page__header">
        <div className="container">
          <nav className="fractalize-page__nav">
            <a href="/fractalize" className="fractalize-page__logo">
              <div className="fractalize-page__logo-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="fractalNavGradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="50%" stopColor="#2979FF" />
                      <stop offset="100%" stopColor="#D500F9" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(20, 20)">
                    <path d="M0 0 L100 0 L50 50 Z" fill="url(#fractalNavGradient)" opacity="0.9"/>
                    <path d="M0 0 L50 50 L0 100 Z" fill="url(#fractalNavGradient)" opacity="0.8"/>
                    <path d="M50 50 L100 0 L100 100 Z" fill="url(#fractalNavGradient)" opacity="0.6"/>
                    <path d="M0 100 L100 100 L50 150 Z" fill="url(#fractalNavGradient)" opacity="0.9"/>
                    <path d="M0 100 L50 150 L0 200 Z" fill="url(#fractalNavGradient)" opacity="0.7"/>
                    <path d="M50 150 L100 100 L100 200 Z" fill="url(#fractalNavGradient)" opacity="0.5"/>
                    <path d="M100 0 L200 0 L150 50 Z" fill="url(#fractalNavGradient)" opacity="0.85"/>
                    <path d="M100 0 L150 50 L100 50 Z" fill="url(#fractalNavGradient)" opacity="0.6"/>
                    <path d="M100 100 L180 100 L140 140 Z" fill="url(#fractalNavGradient)" opacity="0.8"/>
                    <path d="M100 100 L140 140 L100 150 Z" fill="url(#fractalNavGradient)" opacity="0.6"/>
                    <circle cx="50" cy="50" r="3" fill="white" opacity="0.6"/>
                    <circle cx="100" cy="100" r="3" fill="white" opacity="0.6"/>
                    <circle cx="150" cy="50" r="3" fill="white" opacity="0.6"/>
                    <circle cx="50" cy="150" r="3" fill="white" opacity="0.6"/>
                  </g>
                </svg>
              </div>
              <span className="fractalize-page__logo-text">Fractalize</span>
            </a>
            
            <div className="fractalize-page__nav-links">
              <button onClick={() => scrollToSection('ecosystem')} className="fractalize-page__nav-link">
                {t('nav.ecosystem')}
              </button>
              <button onClick={() => scrollToSection('modules')} className="fractalize-page__nav-link">
                {t('nav.modules')}
              </button>
              <button onClick={() => scrollToSection('benefits')} className="fractalize-page__nav-link">
                {t('nav.benefits')}
              </button>
              <button onClick={() => scrollToSection('industry')} className="fractalize-page__nav-link">
                {t('nav.industry')}
              </button>
              <button onClick={() => scrollToSection('pricing')} className="fractalize-page__nav-link">
                {t('nav.pricing')}
              </button>
            </div>

            <div className="fractalize-page__nav-actions">
              <LanguageSelector />
              <button onClick={() => scrollToSection('cta')} className="fractalize-page__btn-primary">
                {t('nav.requestDemo')}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="fractalize-page__hero">
        <div className="container">
          <div className="fractalize-page__hero-content">
            <h1 className="fractalize-page__hero-title">
              <span>{t('hero.title')}</span>
              <span className="fractalize-page__hero-title--highlight">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="fractalize-page__hero-subtitle">{t('hero.subtitle')}</p>
            <div className="fractalize-page__hero-actions">
              <button onClick={() => scrollToSection('cta')} className="fractalize-page__btn-primary fractalize-page__btn-primary--large">
                {t('hero.ctaPrimary')}
              </button>
              <button onClick={() => scrollToSection('modules')} className="fractalize-page__btn-secondary fractalize-page__btn-secondary--large">
                {t('hero.ctaSecondary')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="fractalize-page__section">
        <div className="container">
          <h2 className="fractalize-page__section-title">{t('ecosystem.title')}</h2>
          <p className="fractalize-page__section-subtitle">{t('ecosystem.subtitle')}</p>
          <div className="fractalize-page__features">
            {[1, 2, 3].map((i) => (
              <div key={i} className="fractalize-page__feature">
                <div className="fractalize-page__feature-icon">⚡</div>
                <h3 className="fractalize-page__feature-title">{t(`ecosystem.feature${i}.title`)}</h3>
                <p className="fractalize-page__feature-description">{t(`ecosystem.feature${i}.description`)}</p>
              </div>
            ))}
          </div>
          <div className="fractalize-page__benefit-box">
            <p>{t('ecosystem.benefit')}</p>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="fractalize-page__section fractalize-page__section--dark">
        <div className="container">
          <h2 className="fractalize-page__section-title">{t('modules.title')}</h2>
          <p className="fractalize-page__section-subtitle">{t('modules.subtitle')}</p>
          <div className="fractalize-page__modules">
            {[
              { id: 'crm', icon: '👥' },
              { id: 'erp', icon: '📊' },
              { id: 'inventory', icon: '📦' },
              { id: 'hr', icon: '👔' },
              { id: 'payroll', icon: '💰' },
              { id: 'invoicing', icon: '📄' },
              { id: 'finance', icon: '💳' },
              { id: 'automation', icon: '⚙️' },
            ].map((module) => (
              <div key={module.id} className="fractalize-page__module">
                <div className="fractalize-page__module-icon">{module.icon}</div>
                <h3 className="fractalize-page__module-title">{t(`modules.${module.id}.title`)}</h3>
                <p className="fractalize-page__module-description">{t(`modules.${module.id}.description`)}</p>
                <button className="fractalize-page__module-link">{t('modules.discover')} →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="fractalize-page__section">
        <div className="container">
          <h2 className="fractalize-page__section-title">{t('benefits.title')}</h2>
          <p className="fractalize-page__section-subtitle">{t('benefits.subtitle')}</p>
          <div className="fractalize-page__benefits">
            {[
              { id: 'optimization', icon: '⚡' },
              { id: 'costs', icon: '💵' },
              { id: 'integration', icon: '🔗' },
              { id: 'automation', icon: '🤖' },
              { id: 'security', icon: '🔒' },
              { id: 'scalability', icon: '📈' },
            ].map((benefit) => (
              <div key={benefit.id} className="fractalize-page__benefit">
                <div className="fractalize-page__benefit-icon">{benefit.icon}</div>
                <h3 className="fractalize-page__benefit-title">{t(`benefits.${benefit.id}.title`)}</h3>
                <p className="fractalize-page__benefit-description">{t(`benefits.${benefit.id}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Section */}
      <section id="industry" className="fractalize-page__section fractalize-page__section--dark">
        <div className="container">
          <h2 className="fractalize-page__section-title">{t('industry.title')}</h2>
          <p className="fractalize-page__section-subtitle">{t('industry.subtitle')}</p>
          <div className="fractalize-page__industries">
            {[
              { id: 'parcel', icon: '📮' },
              { id: 'operators', icon: '🚚' },
              { id: 'transport', icon: '🚛' },
              { id: 'warehouse', icon: '🏭' },
              { id: 'franchise', icon: '🏪' },
            ].map((industry) => (
              <div key={industry.id} className="fractalize-page__industry">
                <div className="fractalize-page__industry-icon">{industry.icon}</div>
                <h3 className="fractalize-page__industry-title">{t(`industry.${industry.id}.title`)}</h3>
                <p className="fractalize-page__industry-description">{t(`industry.${industry.id}.description`)}</p>
                <ul className="fractalize-page__industry-benefits">
                  {[1, 2, 3].map((i) => (
                    <li key={i}>✓ {t(`industry.${industry.id}.benefit${i}`)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="fractalize-page__section">
        <div className="container">
          <h2 className="fractalize-page__section-title">{t('trust.title')}</h2>
          <p className="fractalize-page__section-subtitle">{t('trust.subtitle')}</p>
          <div className="fractalize-page__metrics">
            <div className="fractalize-page__metric">
              <div className="fractalize-page__metric-value">300%</div>
              <div className="fractalize-page__metric-label">{t('trust.metrics.roi')}</div>
            </div>
            <div className="fractalize-page__metric">
              <div className="fractalize-page__metric-value">70%</div>
              <div className="fractalize-page__metric-label">{t('trust.metrics.efficiency')}</div>
            </div>
            <div className="fractalize-page__metric">
              <div className="fractalize-page__metric-value">85%</div>
              <div className="fractalize-page__metric-label">{t('trust.metrics.satisfaction')}</div>
            </div>
          </div>
          <div className="fractalize-page__testimonials">
            {[1, 2].map((i) => (
              <div key={i} className="fractalize-page__testimonial">
                <div className="fractalize-page__testimonial-header">
                  <div className="fractalize-page__testimonial-avatar">{t(`trust.testimonial${i}.initials`)}</div>
                  <div>
                    <div className="fractalize-page__testimonial-name">{t(`trust.testimonial${i}.name`)}</div>
                    <div className="fractalize-page__testimonial-position">{t(`trust.testimonial${i}.position`)}</div>
                  </div>
                </div>
                <p className="fractalize-page__testimonial-quote">"{t(`trust.testimonial${i}.quote`)}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="fractalize-page__section fractalize-page__section--dark">
        <div className="container">
          <h2 className="fractalize-page__section-title">{t('pricing.title')}</h2>
          <p className="fractalize-page__section-subtitle">{t('pricing.subtitle')}</p>
          <div className="fractalize-page__plans">
            {['modular', 'complete', 'enterprise'].map((planId, index) => {
              const isPopular = planId === 'complete';
              return (
                <div key={planId} className={`fractalize-page__plan ${isPopular ? 'fractalize-page__plan--popular' : ''}`}>
                  {isPopular && <div className="fractalize-page__plan-badge">{t('pricing.popular')}</div>}
                  <h3 className="fractalize-page__plan-title">{t(`pricing.${planId}.name`)}</h3>
                  <p className="fractalize-page__plan-description">{t(`pricing.${planId}.description`)}</p>
                  <ul className="fractalize-page__plan-features">
                    {[1, 2, 3, 4].map((i) => (
                      <li key={i}>✓ {t(`pricing.${planId}.feature${i}`)}</li>
                    ))}
                  </ul>
                  <button className={`fractalize-page__plan-button ${isPopular ? 'fractalize-page__btn-primary' : ''}`}>
                    {t(`pricing.${planId}.cta`)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="fractalize-page__section fractalize-page__section--cta">
        <div className="container">
          <h2 className="fractalize-page__cta-title">{t('cta.title')}</h2>
          <p className="fractalize-page__cta-subtitle">{t('cta.subtitle')}</p>
          <div className="fractalize-page__cta-actions">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fractalize-page__btn-primary fractalize-page__btn-primary--large">
              {t('cta.requestDemo')}
            </button>
            <button className="fractalize-page__btn-secondary fractalize-page__btn-secondary--large">
              {t('cta.contactAdvisor')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="fractalize-page__footer">
        <div className="container">
          <div className="fractalize-page__footer-content">
            <div>
              <h3 className="fractalize-page__footer-title">Fractalize</h3>
              <p className="fractalize-page__footer-description">{t('footer.description')}</p>
            </div>
            <div>
              <h4 className="fractalize-page__footer-heading">{t('footer.modules')}</h4>
              <ul className="fractalize-page__footer-links">
                <li>CRM</li>
                <li>ERP</li>
                <li>{t('footer.inventory')}</li>
                <li>{t('footer.hr')}</li>
              </ul>
            </div>
            <div>
              <h4 className="fractalize-page__footer-heading">{t('footer.company')}</h4>
              <ul className="fractalize-page__footer-links">
                <li>{t('footer.about')}</li>
                <li>{t('footer.contact')}</li>
                <li>{t('footer.careers')}</li>
              </ul>
            </div>
            <div>
              <h4 className="fractalize-page__footer-heading">{t('footer.legal')}</h4>
              <ul className="fractalize-page__footer-links">
                <li>{t('footer.privacy')}</li>
                <li>{t('footer.terms')}</li>
                <li>{t('footer.cookies')}</li>
              </ul>
            </div>
          </div>
          <div className="fractalize-page__footer-bottom">
            <p>&copy; {new Date().getFullYear()} Fractalize. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
