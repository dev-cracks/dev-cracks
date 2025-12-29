import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

declare global {
  interface Window {
    FirmaSigningRequestEditor?: new (config: {
      container: HTMLElement | string;
      jwt: string;
      signingRequestId: string;
      theme?: 'light' | 'dark';
      readOnly?: boolean;
      height?: string;
      width?: string;
      onSave?: (data: any) => void;
      onSend?: (data: any) => void;
      onError?: (error: any) => void;
      onLoad?: (signingRequest: any) => void;
    }) => {
      destroy?: () => void;
      updateJWT?: (jwt: string) => void;
    };
  }
}

interface SigningRequestEditorProps {
  signingRequestId: string;
  jwt: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  height?: string;
  width?: string;
  onSave?: (data: any) => void;
  onSend?: (data: any) => void;
  onError?: (error: any) => void;
  onLoad?: (signingRequest: any) => void;
}

export default function SigningRequestEditor({
  signingRequestId,
  jwt,
  theme = 'light',
  readOnly = false,
  height = '600px',
  width = '100%',
  onSave,
  onSend,
  onError,
  onLoad,
}: SigningRequestEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar script del editor al montar
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.firma.dev/functions/v1/embed-proxy/signing-request-editor.js';
    script.async = true;

    script.onload = () => {
      console.log('Firma Signing Request Editor script loaded successfully');
      setIsLoaded(true);
    };

    script.onerror = (err) => {
      console.error('Failed to load Firma Signing Request Editor script:', err);
      if (onError) {
        onError(new Error('No se pudo cargar el script del editor de solicitudes de firma'));
      }
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onError]);

  // Inicializar el editor cuando el script, JWT y signingRequestId estén listos
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !jwt || !signingRequestId) {
      return;
    }

    setIsLoading(true);

    // Limpiar editor anterior si existe
    if (editorRef.current?.destroy) {
      editorRef.current.destroy();
      editorRef.current = null;
    }

    try {
      // Inicializar el editor
      editorRef.current = new window.FirmaSigningRequestEditor!({
        container: containerRef.current,
        jwt: jwt,
        signingRequestId: signingRequestId,
        theme: theme,
        readOnly: readOnly,
        width: width,
        height: height,
        onSave: (data: any) => {
          console.log('Signing request saved:', data);
          if (onSave) {
            onSave(data);
          }
        },
        onSend: (data: any) => {
          console.log('Signing request sent:', data);
          if (onSend) {
            onSend(data);
          }
        },
        onError: (error: any) => {
          console.error('Editor error:', error);
          if (onError) {
            onError(error);
          }
          setIsLoading(false);
        },
        onLoad: (signingRequest: any) => {
          console.log('Editor loaded successfully:', signingRequest);
          setIsLoading(false);
          if (onLoad) {
            onLoad(signingRequest);
          }
        },
      });
    } catch (error) {
      console.error('Error initializing editor:', error);
      if (onError) {
        onError(error);
      }
      setIsLoading(false);
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [isLoaded, jwt, signingRequestId, theme, readOnly, width, height, onSave, onSend, onError, onLoad]);

  if (!isLoaded || isLoading) {
    return (
      <Box
        sx={{
          minHeight: height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          Cargando editor...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: height,
        width: width,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    />
  );
}

