import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const benefits = [
  { id: 'optimization', icon: '⚡' },
  { id: 'costs', icon: '💵' },
  { id: 'integration', icon: '🔗' },
  { id: 'automation', icon: '🤖' },
  { id: 'security', icon: '🔒' },
  { id: 'scalability', icon: '📈' },
];

export const BenefitsSection = () => {
  const { t } = useTranslation('fractalize');

  return (
    <section id="benefits" className="section-padding bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">{t('benefits.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-primary-500 transition-all"
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {t(`benefits.${benefit.id}.title`)}
              </h3>
              <p className="text-gray-400">
                {t(`benefits.${benefit.id}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

