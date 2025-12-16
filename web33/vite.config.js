import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true, // No necesitarás importar 'describe', 'it', 'expect'
    environment: 'jsdom', // Simula el navegador
    setupFiles: 'src/tests/setup.js', // Archivo de configuración (siguiente paso)
  },
  // --- FIN DE LA SECCIÓN ---
})