import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const mobileViewports = {
  iphoneSE: {
    name: "iPhone SE",
    styles: { width: "375px", height: "667px" },
    type: "mobile" as const,
  },
  iphone15: {
    name: "iPhone 15",
    styles: { width: "393px", height: "852px" },
    type: "mobile" as const,
  },
  iphone15ProMax: {
    name: "iPhone 15 Pro Max",
    styles: { width: "430px", height: "932px" },
    type: "mobile" as const,
  },
  pixel7: {
    name: "Pixel 7",
    styles: { width: "412px", height: "915px" },
    type: "mobile" as const,
  },
  pixel7Pro: {
    name: "Pixel 7 Pro",
    styles: { width: "412px", height: "892px" },
    type: "mobile" as const,
  },
  galaxyS24: {
    name: "Samsung Galaxy S24",
    styles: { width: "360px", height: "780px" },
    type: "mobile" as const,
  },
};

const orderMap = {
  Foundations: 0,
  Components: 1,
  Templates: 2,
  "Game Assets": 3,
};

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    viewport: {
      viewports: {
        ...mobileViewports,
        ...INITIAL_VIEWPORTS,
      },
      defaultViewport: "iphone15",
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#FFFFFF" },
        { name: "dark", value: "#121212" },
        { name: "grey", value: "#F5F5F5" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

// Custom sort function for sidebar
if (typeof globalThis !== "undefined") {
  (globalThis as any).__STORYBOOK_CONFIG__ = {
    storySort: {
      order: ["Foundations", "Components", "Templates", "Game Assets"],
    },
  };
}

export default preview;
