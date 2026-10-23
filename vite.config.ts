/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';

/**
 * /opensearch.xml, so browsers can add ELUM Browse as a search engine. It needs the site's full
 * address: VITE_ELUM_BROWSE_URL, or https://browsebyelum.netlify.app.
 */
function openSearch(): Plugin {
  const base = (process.env.VITE_ELUM_BROWSE_URL?.trim() || 'https://browsebyelum.netlify.app').replace(/\/+$/, '');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>ELUM Browse</ShortName>
  <Description>Search the web with ELUM, without AI answers.</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="32" height="32" type="image/png">${base}/favicon-32.png</Image>
  <Url type="text/html" method="get" template="${base}/search?q={searchTerms}"/>
</OpenSearchDescription>
`;
  return {
    name: 'elum-opensearch',
    configureServer(server) {
      server.middlewares.use('/opensearch.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/opensearchdescription+xml');
        res.end(xml);
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'opensearch.xml', source: xml });
    },
  };
}

export default defineConfig({
  plugins: [react(), openSearch()],
  server: { port: 5177 },
  build: {
    rollupOptions: {
      output: {
        // React rarely changes, so it gets a long-lived chunk of its own.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler|react-router)\//.test(id)) return 'react';
          return undefined;
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
