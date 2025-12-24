import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const CTASection = () => {
  const { t } = useTranslation('fractalize');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="cta" className="section-padding bg-gradient-to-br from-primary-900 via-gray-900 to-accent-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToTop}
              className="btn-primary text-lg px-10 py-5 bg-white text-primary-600 hover:bg-gray-100"
            >
              {t('cta.requestDemo')}
            </button>
            <button className="btn-secondary text-lg px-10 py-5 border-white text-white hover:bg-white hover:text-primary-600">
              {t('cta.contactAdvisor')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

