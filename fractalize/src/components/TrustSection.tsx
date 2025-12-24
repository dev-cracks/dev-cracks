import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const TrustSection = () => {
  const { t } = useTranslation('fractalize');

  const metrics = [
    { value: '300%', label: t('trust.metrics.roi') },
    { value: '70%', label: t('trust.metrics.efficiency') },
    { value: '85%', label: t('trust.metrics.satisfaction') },
  ];

  return (
    <section id="trust" className="section-padding bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">{t('trust.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('trust.subtitle')}
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <div className="text-5xl font-bold gradient-text mb-2">
                {metric.value}
              </div>
              <div className="text-gray-300">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                  {t(`trust.testimonial${i}.initials`)}
                </div>
                <div className="ml-4">
                  <div className="font-bold text-white">
                    {t(`trust.testimonial${i}.name`)}
                  </div>
                  <div className="text-sm text-gray-400">
                    {t(`trust.testimonial${i}.position`)}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "{t(`trust.testimonial${i}.quote`)}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

