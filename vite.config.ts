import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePluginFonts } from 'vite-plugin-fonts';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePluginFonts({
      google: {
        families: [{ name: 'Montserrat', styles: 'wght@500;600;800;900' }],
      },
    }),
  ],
});
