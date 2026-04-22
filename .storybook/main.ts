import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import svgr from "vite-plugin-svgr";

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
    "@storybook/addon-essentials",
    "@storybook/addon-viewport",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableProjectJson: false,
  },
  managerHead: (head) => `
    ${head}
    <script>
      window.__STORYBOOK_CONFIG__ = {
        sidebarSort: ['Foundations', 'Components', 'Templates', 'Pages', 'Game Assets']
      };
    </script>
  `,
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
