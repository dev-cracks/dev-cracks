import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Alert, Paper } from '@mui/material';

declare global {
  interface Window {
    FirmaSigning?: {
      init: (config: {
        container: string;
        jwt: string;
        onSigningComplete?: () => void;
        onError?: (error: any) => void;
      }) => void;
    };
  }
}

const SigningPage = () => {
  const { t } = useTranslation();
  const { token } = useParams<{ token?: string }>();
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFirmaScript = async () => {
      try {
        // Obtener JWT token de los parámetros de ruta o de query params
        // Formato esperado: /signatures/sign/{token} o /signatures/sign?token={token}
        let jwtToken = token || searchParams.get('token');
        
        if (!jwtToken) {
          // Si no hay token, mostrar instrucciones en lugar de error
          setLoading(false);
          return;
        }

        // Cargar el script de Firma.dev solo si no está ya cargado
        if (!window.FirmaSigning) {
          // Nota: La URL del CDN de Firma.dev debe ser configurada según la documentación oficial
          // Por ahora, intentamos cargar desde el CDN estándar
          // Si el CDN no está disponible, se mostrará un mensaje de error apropiado
          const script = document.createElement('script');
          script.src = 'https://cdn.firma.dev/signing.js';
          script.async = true;
          script.crossOrigin = 'anonymous';
          
          const scriptLoadPromise = new Promise<void>((resolve, reject) => {
            script.onload = () => {
              console.log('Firma.dev script loaded successfully');
              resolve();
            };
            script.onerror = (err) => {
              console.error('Failed to load Firma.dev script:', err);
              reject(new Error('No se pudo cargar el script de Firma.dev. Verifica que el CDN esté disponible y la URL sea correcta.'));
            };
            setTimeout(() => {
              reject(new Error('Timeout al cargar el script de Firma.dev'));
            }, 10000);
          });

          document.body.appendChild(script);
          await scriptLoadPromise;
        }

        // Inicializar el componente de firma
        if (window.FirmaSigning && containerRef.current) {
          window.FirmaSigning.init({
            container: containerRef.current.id,
            jwt: jwtToken,
            onSigningComplete: () => {
              console.log('Signing completed');
              setLoading(false);
            },
            onError: (err) => {
              console.error('Signing error:', err);
              setError(`${t('signing.error')}: ${err?.message || t('signing.error')}`);
              setLoading(false);
            },
          });
          setLoading(false);
        } else if (!window.FirmaSigning) {
          setError(t('signing.error'));
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error loading Firma script:', err);
        setError(`${t('signing.error')}: ${err?.message || t('signing.error')}`);
        setLoading(false);
      }
    };

    loadFirmaScript();
  }, [token]);

  // Si no hay token, mostrar página de instrucciones
  const hasToken = token || searchParams.get('token');
  
  if (!hasToken && !loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            {t('signing.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t('signing.subtitle')}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('signing.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('signing.subtitle')}
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ ml: 2 }}>
            {t('signing.loading')}
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Box
        id="firma-signing-container"
        ref={containerRef}
        sx={{
          minHeight: '500px',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 2,
        }}
      />
    </Container>
  );
};

export default SigningPage;

