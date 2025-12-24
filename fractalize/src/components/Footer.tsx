import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation('fractalize');

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">Fractalize</h3>
            <p className="text-gray-400 text-sm">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.modules')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>CRM</li>
              <li>ERP</li>
              <li>{t('footer.inventory')}</li>
              <li>{t('footer.hr')}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t('footer.about')}</li>
              <li>{t('footer.contact')}</li>
              <li>{t('footer.careers')}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t('footer.privacy')}</li>
              <li>{t('footer.terms')}</li>
              <li>{t('footer.cookies')}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fractalize. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

