import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    sourcemap: false,      // No source maps — hides original code structure
    minify: 'esbuild',     // Minify + mangle all variable names
    rollupOptions: {
      output: {
        // Randomise chunk filenames so file purpose is not obvious
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
      },
    },
  },
})
