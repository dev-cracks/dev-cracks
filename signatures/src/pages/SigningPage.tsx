import { useEffect, useRef, useState } from 'react';
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
              setError(`Error al inicializar el componente de firma: ${err?.message || 'Error desconocido'}`);
              setLoading(false);
            },
          });
          setLoading(false);
        } else if (!window.FirmaSigning) {
          setError('El componente de Firma.dev no está disponible. Verifica que el script se haya cargado correctamente.');
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error loading Firma script:', err);
        setError(`Error al cargar el script de firma: ${err?.message || 'Error desconocido'}. Verifica la configuración del CDN de Firma.dev.`);
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
            Firma de Documento
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Para acceder a la página de firma, necesitas un token JWT válido.
          </Typography>
          <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant="body2" component="div">
              <strong>Formato de URL esperado:</strong>
              <br />
              • <code>/signatures/sign/[token-jwt]</code>
              <br />
              • <code>/signatures/sign?token=[token-jwt]</code>
            </Typography>
          </Alert>
          <Typography variant="body2" color="text.secondary">
            Si recibiste un enlace por email, asegúrate de usar el enlace completo que incluye el token.
            <br />
            Si necesitas un nuevo token, contacta al remitente del documento.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Firma de Documento
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Por favor, revisa y firma el documento a continuación
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
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

