import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.metamob.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'HTTP-X-APIKEY': env.VITE_API_KEY,
        },
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            proxyReq.setHeader('HTTP-X-APIKEY', env.VITE_API_KEY);
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (compatible; MetaMob-Client)');
            
            if (req.method === 'PUT' && req.headers['http-x-userkey']) {
              proxyReq.setHeader('HTTP-X-USERKEY', req.headers['http-x-userkey']);
            }
          });
        },
      },
    },
  },
  }
})
