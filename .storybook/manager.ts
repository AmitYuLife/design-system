import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

// Colour tokens (palette values from src/tokens/colors.ts)
const purple800  = "#340080"; // palette.purple800  — primary accent
const purple100  = "#F4F0FF"; // palette.purple100  — accent tint
const neutral50  = "#FAFAFE"; // palette.neutral50  — bgSurface
const neutral300 = "#E3E3E1"; // palette.neutral300 — borders
const neutral500 = "#A0A09B"; // palette.neutral500 — textSecondary
const neutral700 = "#464647"; // palette.neutral700 — textPrimary
const white      = "#FFFFFF"; // palette.neutralWhite

const theme = create({
  base: "light",
  brandTitle: "Journey for App",
  brandImage: "./logo.png",
  brandUrl: "https://amityulife.github.io/design-system/",
  brandTarget: "_self",

  colorPrimary: purple800,
  colorSecondary: purple800,

  appBg: neutral50,
  appContentBg: white,
  appPreviewBg: white,
  appBorderColor: neutral300,
  appBorderRadius: 8,

  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"Fira Code", "Fira Mono", monospace',

  textColor: neutral700,
  textInverseColor: white,
  textMutedColor: neutral500,

  barTextColor: neutral500,
  barHoverColor: neutral700,
  barSelectedColor: purple800,
  barBg: white,

  inputBg: white,
  inputBorder: neutral300,
  inputTextColor: neutral700,
  inputBorderRadius: 6,

  booleanBg: neutral300,
  booleanSelectedBg: purple800,

  buttonBg: neutral50,
  buttonBorder: neutral300,

  highlightColor: purple100,
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  },
});
