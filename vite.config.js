import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Проксирование всех запросов, начинающихся с '/api':
      "/api": {
        target: "http://itgirlschool.justmakeit.ru",
        changeOrigin: true,
      },
    },
  },
});
