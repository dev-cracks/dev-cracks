import React, { useEffect, useRef, useState } from 'react';
import './SplitText.css';

namespace SplitText {
  export interface Props {
    text: string;
    delay?: number;
    className?: string;
  }
}

const SplitText: React.FC<SplitText.Props> = ({ text, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div ref={containerRef} className={`split-text-container ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`split-text-char ${isVisible ? 'visible' : ''}`}
          style={{
            animationDelay: `${index * 0.03}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default SplitText;

