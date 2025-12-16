import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { isAuthenticated, isLoading, login } = useAuth();

  // TODO: WORKAROUND - Redirección deshabilitada temporalmente para evitar redirección infinita
  // useEffect(() => {
  //   // Solo redirigir si está autenticado y no estamos ya en proceso de login
  //   if (isAuthenticated && !isLoading) {
  //     // Obtener la ruta de destino desde el state o usar dashboard por defecto
  //     const from = (location.state as any)?.from?.pathname || '/dashboard';
  //     navigate(from, { replace: true });
  //   }
  // }, [isAuthenticated, isLoading, navigate, location]);

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

