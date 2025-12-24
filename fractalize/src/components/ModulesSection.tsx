import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const modules = [
  { id: 'crm', icon: '👥' },
  { id: 'erp', icon: '📊' },
  { id: 'inventory', icon: '📦' },
  { id: 'hr', icon: '👔' },
  { id: 'payroll', icon: '💰' },
  { id: 'invoicing', icon: '📄' },
  { id: 'finance', icon: '💳' },
  { id: 'automation', icon: '⚙️' },
];

export const ModulesSection = () => {
  const { t } = useTranslation('fractalize');

  return (
    <section id="modules" className="section-padding bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{t('modules.title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('modules.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-primary-500 transition-all hover:shadow-xl hover:shadow-primary-500/20 group cursor-pointer"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {module.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t(`modules.${module.id}.title`)}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {t(`modules.${module.id}.description`)}
              </p>
              <button className="text-primary-400 hover:text-primary-300 font-semibold text-sm">
                {t('modules.discover')} →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

