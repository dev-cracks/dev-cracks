import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const industries = [
  { id: 'parcel', icon: '📮' },
  { id: 'operators', icon: '🚚' },
  { id: 'transport', icon: '🚛' },
  { id: 'warehouse', icon: '🏭' },
  { id: 'franchise', icon: '🏪' },
];

export const IndustryFocusSection = () => {
  const { t } = useTranslation('fractalize');

  return (
    <section id="industry" className="section-padding bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t('industry.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('industry.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-accent-500 transition-all"
            >
              <div className="text-5xl mb-4">{industry.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {t(`industry.${industry.id}.title`)}
              </h3>
              <p className="text-gray-400 mb-4">
                {t(`industry.${industry.id}.description`)}
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-primary-400 mr-2">✓</span>
                    {t(`industry.${industry.id}.benefit${i}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

