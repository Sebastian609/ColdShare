// vite-ignore-html.js
export default function ignoreHtmlFiles() {
    return {
      name: 'ignore-html-files',
      enforce: 'pre',
      resolveId(source) {
        if (source.match(/.*\.html$/)) {
          return { id: source, external: true };
        }
        return null;
      },
      load(id) {
        if (id.match(/.*\.html$/)) {
          return '';  // Retornar una cadena vacía para ignorar el contenido
        }
        return null;
      }
    };
  }
  