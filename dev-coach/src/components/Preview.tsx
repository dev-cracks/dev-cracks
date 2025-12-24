import { useEffect, useRef } from 'react';
import type { ProjectFile } from './CodeEditor';
import './Preview.css';

interface PreviewProps {
  files: ProjectFile[];
}

export const Preview = ({ files }: PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Obtener el contenido de cada archivo
  const htmlContent = files.find(f => f.filename === 'index.html')?.content || '';
  const cssContent = files.find(f => f.filename === 'style.css')?.content || '';
  const jsContent = files.find(f => f.filename === 'main.ts' || f.filename === 'main.js')?.content || '';


  // Actualizar el iframe cuando cambien los archivos
  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (doc) {
      const fullHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    ${cssContent}
  </style>
</head>
<body>
  ${htmlContent}
  <script>
    ${jsContent}
  </script>
</body>
</html>
      `.trim();

      doc.open();
      doc.write(fullHTML);
      doc.close();
    }
  }, [htmlContent, cssContent, jsContent]);

  return (
    <div className="preview-container">
      <div className="preview-header">
        <span className="preview-title">Preview</span>
      </div>
      <iframe
        ref={iframeRef}
        className="preview-iframe"
        sandbox="allow-scripts allow-same-origin"
        title="Code Preview"
      />
    </div>
  );
};

