import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, makeStyles, tokens } from '@fluentui/react-components';
import { useAuth } from '../hooks/useAuth';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
    gap: tokens.spacingVerticalL,
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground2,
    textAlign: 'center',
  },
});

export const LoginPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Spinner size="large" />
      </div>
    );
  }

  const handleLogin = () => {
    login('/dashboard');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dev Cracks Backoffice</h1>
      <p className={styles.subtitle}>
        Inicia sesión para acceder al panel de administración
      </p>
      <Button appearance="primary" size="large" onClick={handleLogin}>
        Iniciar Sesión
      </Button>
    </div>
  );
};

