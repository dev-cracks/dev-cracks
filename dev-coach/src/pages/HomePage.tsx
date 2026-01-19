import { Link } from 'react-router-dom';
import CardNav from '../components/CardNav.js';

// Logo placeholder - deberías reemplazar esto con tu logo real
const logo = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="30"%3E%3Ctext x="0" y="20" font-family="Arial" font-size="20" fill="%23fff"%3EDev Coach%3C/text%3E%3C/svg%3E';

import { useTranslation } from 'react-i18next';
export const HomePage = () => {
  const { t } = useTranslation('dev-coach');
  const items = [
    {
      label: t('navigation.routes'),
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: t('navigation.juniorToMid'), ariaLabel: t('navigation.juniorToMidAria'), href: "/challenge/1" },
        { label: t('navigation.midToSenior'), ariaLabel: t('navigation.midToSeniorAria'), href: "/challenge/2" }
      ]
    },
    {
      label: t('navigation.courses'),
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: t('navigation.allCourses'), ariaLabel: t('navigation.allCoursesAria'), href: "/courses" },
        { label: t('highlight.title'), ariaLabel: t('navigation.csharpFromZeroAria'), href: "/csharp-course" },
        { label: t('navigation.architecture'), ariaLabel: t('navigation.architectureAria'), href: "/courses#arquitectura" },
        { label: t('navigation.frontend'), ariaLabel: t('navigation.frontendAria'), href: "/courses#frontend" }
      ]
    },
    {
      label: t('navigation.resources'),
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: t('navigation.documentation'), ariaLabel: t('navigation.documentationAria'), href: "#" },
        { label: t('navigation.community'), ariaLabel: t('navigation.communityAria'), href: "#" }
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', paddingTop: '120px' }}>
      <CardNav
        logo={logo}
        logoAlt="Dev Coach Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {t('home.title')}
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#888', marginBottom: '3rem' }}>
          {t('home.subtitle')}
        </p>
        <Link
          to="/courses"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #B19EEF 0%, #4ECDC4 100%)',
            color: '#fff',
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            marginTop: '2rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(177, 158, 239, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {t('home.cta')} →
        </Link>
      </div>
    </div>
  );
};

