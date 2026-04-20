import type { Meta, StoryObj } from "@storybook/react";
import { Tile } from "./Tile";
import { TileGroup } from "./TileGroup";
import {
  CoverDetailsColourIcon,
  PolicySummaryColourIcon,
  HintsColourIcon,
  FAQColourIcon,
  MembersColourIcon,
  CalendarColourIcon,
} from "../../icons";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Tile> = {
  title: "Components/Tile",
  component: Tile,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 32,
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Tile

A single icon + label tile with a white card chassis, border, and drop-shadow.
Used as a navigation shortcut to a key action or section.

| Element | Spec |
|---------|------|
| Icon | 24 × 24 ColourIcon — pass via \`colourIcon\` prop |
| Label | Body 2 Bold, \`palette.neutral600\`, 2-line clamp with ellipsis |
| Radius | \`radii.xl\` (16 px) |
| Shadow | \`0px 4px 0px 0px neutral300\` |

Use \`TileGroup\` to render 2–3 tiles in a full-width equal-width row.

### Figma reference

[YuLife App Storybook — Tile](https://www.figma.com/design/ERkTigxQV1eQ7jooI8pgQp/YuLife-App-Storybook?node-id=10972-5682)
        `.trim(),
      },
    },
  },
  argTypes: {
    colourIcon: { control: false },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Tile>;

// ─── Tile stories ─────────────────────────────────────────────────────────────

/**
 * Default — a single Tile with a ColourIcon and label.
 */
export const Default: Story = {
  args: {
    colourIcon: <CoverDetailsColourIcon size={24} />,
    label: "What I can claim for",
  },
};

/**
 * Long label — verifies 2-line clamping and ellipsis behaviour at the
 * standalone Tile width.
 */
export const LongLabel: Story = {
  args: {
    colourIcon: <CoverDetailsColourIcon size={24} />,
    label: "Label text goes here maximum 2 lines before ellipsis",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Labels longer than two lines are clamped with an ellipsis. " +
          "Copy should be kept short and action-oriented.",
      },
    },
  },
};

// ─── TileGroup stories ────────────────────────────────────────────────────────

/**
 * Two-tile group — tiles share the available width equally.
 */
export const TwoTiles: StoryObj<typeof TileGroup> = {
  render: () => (
    <div style={{ width: 327 }}>
      <TileGroup
        tiles={[
          { colourIcon: <CoverDetailsColourIcon size={24} />, label: "What I can claim for" },
          { colourIcon: <PolicySummaryColourIcon size={24} />, label: "Make a claim" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Two tiles sharing equal width inside a 327 px container." },
    },
  },
};

/**
 * Three-tile group — the primary Figma layout. Each tile expands equally
 * across the full content width.
 */
export const ThreeTiles: StoryObj<typeof TileGroup> = {
  render: () => (
    <div style={{ width: 327 }}>
      <TileGroup
        tiles={[
          { colourIcon: <CoverDetailsColourIcon size={24} />, label: "What I can claim for" },
          { colourIcon: <PolicySummaryColourIcon size={24} />, label: "Make a claim" },
          { colourIcon: <HintsColourIcon size={24} />, label: "Key policy information" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three tiles — the primary layout from the Figma spec. " +
          "Matches the TileGroup used in the Health Cash Plan product page.",
      },
    },
  },
};

/**
 * Four tiles — demonstrates that the equal-width flex layout adapts beyond
 * three tiles, though three is the designed maximum.
 */
export const FourTiles: StoryObj<typeof TileGroup> = {
  render: () => (
    <div style={{ width: 327 }}>
      <TileGroup
        tiles={[
          { colourIcon: <CoverDetailsColourIcon size={24} />, label: "Cover" },
          { colourIcon: <PolicySummaryColourIcon size={24} />, label: "Claims" },
          { colourIcon: <FAQColourIcon size={24} />, label: "FAQ" },
          { colourIcon: <MembersColourIcon size={24} />, label: "Members" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Four tiles — the layout adapts, but labels may become crowded. " +
          "Three tiles is the recommended maximum per the Figma spec.",
      },
    },
  },
};

/**
 * Product page example — the exact TileGroup used in the Health Cash Plan
 * story, showing real icon + label combinations.
 */
export const ProductPageExample: StoryObj<typeof TileGroup> = {
  render: () => (
    <div style={{ width: 327 }}>
      <TileGroup
        tiles={[
          {
            colourIcon: <CoverDetailsColourIcon size={24} />,
            label: "What I can claim for",
          },
          {
            colourIcon: <PolicySummaryColourIcon size={24} />,
            label: "Make a claim",
          },
          {
            colourIcon: <CalendarColourIcon size={24} />,
            label: "Key policy information",
          },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world tile group from the Health Cash Plan product page — " +
          "three action shortcuts matching the Figma Product Details spec.",
      },
    },
  },
};
