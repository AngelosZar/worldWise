import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnError: false, // This prevents ESLint warnings from stopping your dev server
      lintOnStart: true, // Run ESLint on server start
      emitWarning: true, // Show warnings
      emitError: false, // Don't treat warnings as errors
      cache: true, // Enable caching for better performance
    }),
  ],
});
