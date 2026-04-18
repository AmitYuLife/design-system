import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const theme = create({
  base: "light",
  brandTitle: "Design System",
  brandTarget: "_self",

  // Colors
  colorPrimary: "#1A1A1A",
  colorSecondary: "#0066FF",

  // UI
  appBg: "#F8F8F8",
  appContentBg: "#FFFFFF",
  appPreviewBg: "#FFFFFF",
  appBorderColor: "#E5E5E5",
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"Fira Code", "Fira Mono", monospace',

  // Text colors
  textColor: "#1A1A1A",
  textInverseColor: "#FFFFFF",
  textMutedColor: "#6B7280",

  // Toolbar default
  barTextColor: "#6B7280",
  barHoverColor: "#1A1A1A",
  barSelectedColor: "#0066FF",
  barBg: "#FFFFFF",

  // Form colors
  inputBg: "#FFFFFF",
  inputBorder: "#E5E5E5",
  inputTextColor: "#1A1A1A",
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
});
