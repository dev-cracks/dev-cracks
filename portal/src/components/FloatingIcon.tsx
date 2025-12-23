import React from 'react';
import './FloatingIcon.css';

const FloatingIcon: React.FC = () => {
  return (
    <div className="floating-icon">
      <svg 
        className="floating-icon__svg" 
        viewBox="0 0 190 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="crackGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0080" /> 
            <stop offset="100%" stopColor="#7928CA" /> 
          </linearGradient>
        </defs>
        <rect width="190" height="120" rx="15" fill="#0A0A0A" />
        <g transform="translate(20, 10) scale(0.5)">
          <path 
            d="M60 40 L10 100 L60 160" 
            stroke="url(#crackGradientHeader)" 
            strokeWidth="25" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M240 40 L290 100 L240 160" 
            stroke="url(#crackGradientHeader)" 
            strokeWidth="25" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M180 10 L120 110 L170 110 L110 210" 
            stroke="white" 
            strokeWidth="12" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </g>
      </svg>
    </div>
  );
};

export default FloatingIcon;

