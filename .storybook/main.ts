import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../src/Welcome.mdx",
    "../src/tokens/**/*.stories.@(ts|tsx|mdx)",
    "../src/icons/**/*.stories.@(ts|tsx|mdx)",
    "../src/components/**/*.stories.@(ts|tsx|mdx)",
    "../src/templates/**/*.stories.@(ts|tsx|mdx)",
    "../src/game-assets/**/*.stories.@(ts|tsx|mdx)",
    "../src/pages/**/*.stories.@(ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      base: process.env.STORYBOOK_BASE_URL || "/",
      plugins: [
        svgr({
          svgrOptions: {
            svgProps: { role: "img" },
            titleProp: true,
            jsxRuntime: "automatic",
          },
        }),
      ],
      resolve: {
        alias: {
          "react-native": resolve(
            __dirname,
            "../node_modules/react-native-web/dist/index"
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
  },
};

export default config;
