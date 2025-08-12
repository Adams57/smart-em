import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.join(__dirname, "src")
      }
    ]
  },
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      /* … */
    }
    // ...other test settings
  }
});
