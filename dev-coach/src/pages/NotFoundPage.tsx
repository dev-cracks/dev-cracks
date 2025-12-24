import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      gap: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>404</h1>
      <p style={{ fontSize: '1.5rem' }}>Página no encontrada</p>
      <Link to="/" style={{ color: '#B19EEF', textDecoration: 'none' }}>
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;

