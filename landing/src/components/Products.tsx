import { useTranslation } from 'react-i18next';
import { FadeInSection } from './FadeInSection';

interface Product {
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  results: string[];
  cta: string;
  ctaLink: string;
  icon: string;
}

export const Products = () => {
  const { t } = useTranslation('landing');

  const products: Product[] = [
    {
      name: t('products.items.routeon.name'),
      tagline: t('products.items.routeon.tagline'),
      description: t('products.items.routeon.description'),
      benefits: t('products.items.routeon.benefits', { returnObjects: true }) as string[],
      results: t('products.items.routeon.results', { returnObjects: true }) as string[],
      cta: t('products.items.routeon.cta'),
      ctaLink: '#contacto',
      icon: '📦'
    },
    {
      name: t('products.items.devcoach.name'),
      tagline: t('products.items.devcoach.tagline'),
      description: t('products.items.devcoach.description'),
      benefits: t('products.items.devcoach.benefits', { returnObjects: true }) as string[],
      results: t('products.items.devcoach.results', { returnObjects: true }) as string[],
      cta: t('products.items.devcoach.cta'),
      ctaLink: '#contacto',
      icon: '🎓'
    },
    {
      name: t('products.items.community.name'),
      tagline: t('products.items.community.tagline'),
      description: t('products.items.community.description'),
      benefits: t('products.items.community.benefits', { returnObjects: true }) as string[],
      results: t('products.items.community.results', { returnObjects: true }) as string[],
      cta: t('products.items.community.cta'),
      ctaLink: 'https://discord.gg/9eaBf5qR',
      icon: '👥'
    }
  ];

  const handleCTAClick = (link: string) => {
    if (link.startsWith('#')) {
      const element = document.getElementById(link.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="productos" className="products">
      <div className="container">
        <h2>{t('products.title')}</h2>
        <p className="products__intro">
          {t('products.intro')}
        </p>

        <div className="products-grid">
          {products.map((product, index) => (
            <FadeInSection key={product.name} className="product-card">
              <div className="product-card__header">
                <div className="product-card__icon">{product.icon}</div>
                <div className="product-card__title-section">
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__tagline">{product.tagline}</p>
                </div>
              </div>

              <p className="product-card__description">{product.description}</p>

              <div className="product-card__benefits">
                <h4 className="product-card__section-title">{t('products.labels.benefits')}</h4>
                <ul className="product-card__list">
                  {product.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="product-card__results">
                <h4 className="product-card__section-title">{t('products.labels.results')}</h4>
                <ul className="product-card__list product-card__list--results">
                  {product.results.map((result, i) => (
                    <li key={i}>{result}</li>
                  ))}
                </ul>
              </div>

              <button
                className="product-card__cta"
                onClick={() => handleCTAClick(product.ctaLink)}
              >
                {product.cta}
              </button>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
