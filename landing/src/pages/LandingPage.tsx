import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShapeBlur } from '../components/ShapeBlur.js';
import { BlurText } from '../components/BlurText.js';
import './LandingPage.css';

export const LandingPage = () => {
  const { t } = useTranslation('landing');
  return (
    <div 
      className="landing-page"
      style={{ 
        height: '100vh', 
        width: '100vw',
        position: 'relative',
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem'
      }}
    >
      <div className="landing-page__logo-container">
        <ShapeBlur
          intensity={1.5}
          size={300}
          color="rgba(177, 158, 239, 0.8)"
        >
          <div className="landing-page__logo">
            <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="crackGradientLanding" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF0080" />
                  <stop offset="100%" stopColor="#7928CA" />
                </linearGradient>
                <filter id="glowLanding" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>
              <g transform="translate(106, 120)">
                <path d="M60 40 L10 100 L60 160" stroke="url(#crackGradientLanding)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M240 40 L290 100 L240 160" stroke="url(#crackGradientLanding)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" filter="url(#glowLanding)" />
                <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <text x="256" y="400" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="58" fill="white" letterSpacing="-2">
                DEV<tspan fill="url(#crackGradientLanding)">CRACKS</tspan>
              </text>
              <text x="256" y="440" textAnchor="middle" fontFamily="Courier New, monospace" fontWeight="bold" fontSize="20" fill="#888" letterSpacing="5">
                CODE // BREAKER
              </text>
            </svg>
          </div>
        </ShapeBlur>
        <h1 className="landing-page__title">DEV CRACKS</h1>
      </div>

      <div className="landing-page__text-container">
        <BlurText
          text={t('hero.question')}
          delay={1000}
          animateBy="words"
          direction="top"
          duration={600}
          className="text-2xl mb-8"
        />
      </div>
    </div>
  );
};

