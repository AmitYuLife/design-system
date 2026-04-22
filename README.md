# Journey for App

**YuLife App Design System**

A lightweight Storybook for the React Native design system. Built with **react-native-web** so all components render in the browser — no device or simulator required.

Intended as a reference for product designers to prototype with, with each component linked back to Figma via **Figma Code Connect**.

## Getting started

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook
```

Storybook opens at [http://localhost:6006](http://localhost:6006).

## Stack

| Tool | Purpose |
|------|---------|
| [Storybook 10](https://storybook.js.org) | Component explorer |
| [react-native-web](https://necolas.github.io/react-native-web/) | Renders RN components in the browser |
| [Vite](https://vitejs.dev) | Bundler |
| [SVGR](https://react-svgr.com) | SVG → React component transform |
| [@figma/code-connect](https://github.com/figma/code-connect) | Links components to Figma nodes |

## Project structure

```
src/
├── tokens/         # Design tokens: colors, typography, spacing
├── icons/          # SVG icon library
├── atoms/          # Buttons, inputs, badges (coming soon)
├── molecules/      # Nav items, form groups (coming soon)
└── organisms/      # Navigation bars, page templates (coming soon)
```

## Figma Code Connect

Each component has a `.figma.ts` file that maps it to a Figma node.
To publish connections (requires a Figma access token):

```bash
FIGMA_ACCESS_TOKEN=<token> npx figma connect publish
```

## Adding icons

1. Export the icon as an SVG from Figma at 24×24.
2. Drop the file into `src/icons/svg/`.
3. Add an export to `src/icons/index.ts`.
4. Add an entry to `src/icons/Icons.stories.tsx` (the `ALL_ICONS` array).
5. Add a `figma.connect()` call in `src/icons/Icons.figma.ts`.
