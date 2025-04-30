import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";


export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      '/backendapi': {
        target: 'http://keralaoffer.com/backendapi',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backendapi/, ''),
      },
    },
  },
});
