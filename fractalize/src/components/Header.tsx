import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

export const Header = () => {
  const { t } = useTranslation('fractalize');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/fractalize" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold gradient-text">Fractalize</span>
            </a>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection('ecosystem')}
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                {t('nav.ecosystem')}
              </button>
              <button
                onClick={() => scrollToSection('modules')}
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                {t('nav.modules')}
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                {t('nav.benefits')}
              </button>
              <button
                onClick={() => scrollToSection('industry')}
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                {t('nav.industry')}
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                {t('nav.pricing')}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => scrollToSection('cta')}
              className="btn-primary"
            >
              {t('nav.requestDemo')}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

