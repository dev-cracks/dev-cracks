import React from 'react';
import { useTranslation } from 'react-i18next';
import { PillNav } from '../components/PillNav';
import DarkVeil from '../components/DarkVeil';
import './SupportPage.css';

export const SupportPage = () => {
  const { t } = useTranslation('portal');
  return (
    <div className="support-page">
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <DarkVeil />
      </div>
      <PillNav />
      <main className="support-page__content">
        <div className="support-page__container">
          <h1 className="support-page__title">{t('support.title')}</h1>
          <p className="support-page__subtitle">{t('support.subtitle')}</p>

          <div className="support-page__grid">
            <div className="support-page__card">
              <h2>{t('support.documentation.title')}</h2>
              <p>{t('support.documentation.description')}</p>
            </div>
            <div className="support-page__card">
              <h2>{t('support.contact.title')}</h2>
              <p>{t('support.contact.description')}</p>
            </div>
            <div className="support-page__card">
              <h2>{t('support.faq.title')}</h2>
              <p>{t('support.faq.description')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

