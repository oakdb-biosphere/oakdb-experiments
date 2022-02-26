import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdPlugin from "vite-plugin-markdown";

export default defineConfig({
  server: {
    port: 3005,
  },
  plugins: [
    react(), //
    mdPlugin({ mode: "html" }),
  ],
});
