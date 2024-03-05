import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
  plugins: [react()],

  // 👇 Insert these lines
  build: {
    lib: {
      entry: "./src/index.tsx",
      name: "wcLifiWidget",
      fileName: (format) => `wcLifiWidget.${format}.js`,
    },
    target: "esnext",
  },
});