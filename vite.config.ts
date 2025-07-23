
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Detectar se está sendo executado no Vercel
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
  // Para GitHub Pages, usar o nome do repositório
  const isGitHubPages = mode === 'production' && !isVercel;
  
  let base = '/';
  if (isGitHubPages) {
    base = '/aspergillus-vista-hub/';
  }
  
  console.log('Build environment:', { mode, isVercel, isGitHubPages, base });

  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-toast', 'sonner']
          }
        }
      }
    },
  };
});
