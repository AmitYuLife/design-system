import type { Preview } from "@storybook/react-vite";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

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

const preview: Preview = {
  tags: ["autodocs", "test"],

  parameters: {
    viewport: {
      options: {
        ...mobileViewports,
        ...INITIAL_VIEWPORTS,
      }
    },

    backgrounds: {
      options: {
        light: { name: "light", value: "#FFFFFF" },
        dark: { name: "dark", value: "#121212" },
        grey: { name: "grey", value: "#F5F5F5" }
      }
    },

    controls: {
      matchers: {
        color: /Color$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        method: "alphabetical",
        order: ["Welcome", "Foundations", "Components", "Templates", "Game Assets", "Pages"],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },

  initialGlobals: {
    viewport: {
      value: "iphone15",
      isRotated: false
    },

    backgrounds: {
      value: "light"
    }
  }
};

export default preview;
