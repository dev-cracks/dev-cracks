import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFirmaScript = async () => {
      try {
        // Cargar el script de Firma.dev
        if (!window.FirmaSigning) {
          const script = document.createElement('script');
          script.src = 'https://cdn.firma.dev/signing.js';
          script.async = true;
          document.body.appendChild(script);

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            setTimeout(reject, 10000); // Timeout de 10 segundos
          });
        }

        // Obtener JWT token si no se proporcionó en la URL
        let jwtToken = token;
        if (!jwtToken) {
          // TODO: Obtener token desde la API
          setError('Token no proporcionado');
          setLoading(false);
          return;
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
              setError('Error al cargar el componente de firma');
              setLoading(false);
            },
          });
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading Firma script:', err);
        setError('Error al cargar el script de firma');
        setLoading(false);
      }
    };

    loadFirmaScript();
  }, [token]);

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

