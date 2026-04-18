import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        svgProps: { role: "img" },
        titleProp: true,
        jsxRuntime: "automatic",
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      // Redirect all react-native imports to react-native-web
      "react-native": path.resolve(
        __dirname,
        "node_modules/react-native-web/dist/index"
      ),
    },
    extensions: [
      ".web.tsx",
      ".web.ts",
      ".web.jsx",
      ".web.js",
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
    ],
  },
});
