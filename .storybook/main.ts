import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import svgr from "@svgr/rollup";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-viewport",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinalConfig(config) {
    return config;
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      plugins: [
        svgr({
          svgProps: { role: "img" },
          titleProp: true,
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
