// Plugin para deshabilitar completamente el cliente HMR de Vite
export function disableHmr() {
  return {
    name: 'disable-hmr',
    enforce: 'pre', // Ejecutar antes que otros plugins
    transformIndexHtml: {
      enforce: 'pre',
      transform(html, ctx) {
        // Eliminar cualquier referencia al cliente HMR que Vite pueda inyectar
        let result = html
          .replace(/<script[^>]*@vite\/client[^>]*><\/script>/gi, '')
          .replace(/<script[^>]*vite\/client[^>]*><\/script>/gi, '')
          .replace(/<script[^>]*type="module"[^>]*src="\/@vite\/client"[^>]*><\/script>/gi, '')
          .replace(/import\.meta\.hot/gi, 'undefined');
        
        return result;
      }
    },
    configureServer(server) {
      // Deshabilitar completamente HMR y WebSocket
      if (server.hot) {
        server.hot = null;
      }
      if (server.ws) {
        try {
          server.ws.close();
        } catch (e) {
          // Ignorar errores al cerrar WebSocket
        }
      }
    }
  };
}

