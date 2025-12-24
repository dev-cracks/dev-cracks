import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Página no encontrada</p>
      <Link 
        to="/" 
        style={{
          color: '#fff',
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          border: '1px solid #fff',
          borderRadius: '8px',
          transition: 'background 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;

