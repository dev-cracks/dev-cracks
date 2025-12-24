import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-400 mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">{t('notFound') || 'Page not found'}</p>
        <Link to="/" className="btn-primary">
          {t('goHome') || 'Go Home'}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

