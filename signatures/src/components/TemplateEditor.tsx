import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

declare global {
  interface Window {
    FirmaTemplateEditor?: new (config: {
      container: HTMLElement | string;
      jwt: string;
      templateId: string;
      theme?: 'light' | 'dark';
      readOnly?: boolean;
      width?: string;
      height?: string;
      onSave?: (data: any) => void;
      onError?: (error: any) => void;
      onLoad?: (template: any) => void;
    }) => {
      destroy?: () => void;
      updateJWT?: (jwt: string) => void;
    };
  }
}

interface TemplateEditorProps {
  templateId: string;
  jwt: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  height?: string;
  width?: string;
  onSave?: (data: any) => void;
  onError?: (error: any) => void;
  onLoad?: (template: any) => void;
}

export default function TemplateEditor({
  templateId,
  jwt,
  theme = 'light',
  readOnly = false,
  height = '600px',
  width = '100%',
  onSave,
  onError,
  onLoad,
}: TemplateEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar script del editor al montar
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://api.firma.dev/functions/v1/embed-proxy/template-editor.js';
    script.async = true;

    script.onload = () => {
      console.log('Firma Template Editor script loaded successfully');
      setIsLoaded(true);
    };

    script.onerror = (err) => {
      console.error('Failed to load Firma Template Editor script:', err);
      if (onError) {
        onError(new Error('No se pudo cargar el script del editor de plantillas'));
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

  // Inicializar el editor cuando el script, JWT y templateId estén listos
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !jwt || !templateId) {
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
      editorRef.current = new window.FirmaTemplateEditor!({
        container: containerRef.current,
        jwt: jwt,
        templateId: templateId,
        theme: theme,
        readOnly: readOnly,
        width: width,
        height: height,
        onSave: (data: any) => {
          console.log('Template saved:', data);
          if (onSave) {
            onSave(data);
          }
        },
        onError: (error: any) => {
          console.error('Editor error:', error);
          if (onError) {
            onError(error);
          }
          setIsLoading(false);
        },
        onLoad: (template: any) => {
          console.log('Editor loaded successfully:', template);
          setIsLoading(false);
          if (onLoad) {
            onLoad(template);
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
  }, [isLoaded, jwt, templateId, theme, readOnly, width, height, onSave, onError, onLoad]);

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

