// Plugin de Vite para transformar importaciones con base path
export function basePathPlugin(basePath) {
  return {
    name: 'base-path-transform',
    enforce: 'pre',
    transform(code, id) {
      // Transformar importaciones en archivos del proyecto y en módulos procesados por Vite
      if (id.includes('node_modules/.vite') || (!id.includes('node_modules') && (id.endsWith('.ts') || id.endsWith('.tsx') || id.endsWith('.js') || id.endsWith('.jsx')))) {
        // Reemplazar importaciones absolutas que empiezan con / para incluir el base path
        let transformed = code;
        transformed = transformed.replace(
          /(from\s+['"])(\/)(src|@vite|@id|@fs|@react-refresh)/g,
          `$1${basePath}$2$3`
        );
        transformed = transformed.replace(
          /(import\s+['"])(\/)(src|@vite|@id|@fs|@react-refresh)/g,
          `$1${basePath}$2$3`
        );
        // También reemplazar en strings que puedan ser rutas
        transformed = transformed.replace(
          /(['"])(\/)(src|@vite|@id|@fs|@react-refresh)/g,
          `$1${basePath}$2$3`
        );
        return transformed !== code ? { code: transformed, map: null } : null;
      }
      return null;
    },
    transformIndexHtml(html) {
      // Transformar las rutas en el HTML
      return html.replace(
        /(src|href)=(['"])\/(src|@vite|node_modules|@id|@fs|@react-refresh|assets)/g,
        `$1=$2${basePath}$2$3`
      );
    }
  };
}

