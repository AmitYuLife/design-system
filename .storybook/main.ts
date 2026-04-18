import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-viewport",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
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
          "react-native": path.resolve(
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
