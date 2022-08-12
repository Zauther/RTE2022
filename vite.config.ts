import { defineConfig } from "vite";
import path from "path";
import pkg from "./package.json";
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [
    react(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // additionalData: `@import "${path.resolve(__dirname, 'src/theme.module.less')}";`,
      }
    }
  },
  build: {
    // lib: {
    //   entry: path.resolve(__dirname, "src/index.tsx"),
    //   formats: ["cjs", "es"],
    //   fileName: "index",
    // },
    sourcemap: mode === "production",
    outDir: "dist",
    rollupOptions: {
      // external: ["@netless/fastboard", "@netless/window-manager", "white-web-sdk"],
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
        exports: "named",
      },
      input: {
        main:  path.resolve(__dirname, 'index.html'),
      }
    },
    minify: mode === "production",
  },
  clearScreen: true,
  server: {
    open: true,
  },
}));
