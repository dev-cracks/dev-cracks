import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const PricingSection = () => {
  const { t } = useTranslation('fractalize');

  const plans = [
    {
      id: 'modular',
      name: t('pricing.modular.name'),
      description: t('pricing.modular.description'),
      features: [1, 2, 3, 4].map((i) => t(`pricing.modular.feature${i}`)),
      cta: t('pricing.modular.cta'),
    },
    {
      id: 'complete',
      name: t('pricing.complete.name'),
      description: t('pricing.complete.description'),
      features: [1, 2, 3, 4].map((i) => t(`pricing.complete.feature${i}`)),
      cta: t('pricing.complete.cta'),
      popular: true,
    },
    {
      id: 'enterprise',
      name: t('pricing.enterprise.name'),
      description: t('pricing.enterprise.description'),
      features: [1, 2, 3, 4].map((i) => t(`pricing.enterprise.feature${i}`)),
      cta: t('pricing.enterprise.cta'),
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t('pricing.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gray-900 rounded-xl p-8 border-2 ${
                plan.popular
                  ? 'border-primary-500 shadow-xl shadow-primary-500/20'
                  : 'border-gray-700'
              } relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {t('pricing.popular')}
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary-400 mr-2">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-bold transition-all ${
                  plan.popular
                    ? 'btn-primary'
                    : 'bg-gray-800 border border-gray-700 text-white hover:border-primary-500'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

