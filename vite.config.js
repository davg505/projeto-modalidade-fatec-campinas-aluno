import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/projeto-modalidade-fatec-campinas-aluno/',
  plugins: [react()],
});
