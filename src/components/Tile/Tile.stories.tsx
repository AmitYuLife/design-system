import type { Meta, StoryObj } from "@storybook/react";
import { Tile } from "./Tile";
import { TileImage } from "./TileImage";
import { TileGroup } from "./TileGroup";
import { YuCoinValue } from "../YuCoinValue";
import { palette } from "../../tokens/colors";
import { textStyles } from "../../tokens/typography";
import {
  Icon,
  RightIcon,
  CoverDetailsColourIcon,
  PolicySummaryColourIcon,
  HintsColourIcon,
  FAQColourIcon,
  MembersColourIcon,
  CalendarColourIcon,
} from "../../icons";

// ─── Challenge hero images ────────────────────────────────────────────────────
// Pick random images from the real challenge-hero asset set (3× retina PNGs).
// Resolved once at module load so each usage gets a stable, distinct image.

const challengeHeroGlob = import.meta.glob(
  "../../assets/challenge-hero/*.png",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

const challengeHeroImages = Object.values(challengeHeroGlob);

function pickRandom(pool: string[], exclude: string[] = []): string {
  const available = pool.filter((img) => !exclude.includes(img));
  const source = available.length > 0 ? available : pool;
  return source[Math.floor(Math.random() * source.length)];
}

const CHALLENGE_IMAGE_1 = pickRandom(challengeHeroImages);
const CHALLENGE_IMAGE_2 = pickRandom(challengeHeroImages, [CHALLENGE_IMAGE_1]);
const CHALLENGE_IMAGE_3 = pickRandom(challengeHeroImages, [CHALLENGE_IMAGE_1, CHALLENGE_IMAGE_2]);

// ─── Placeholder images ───────────────────────────────────────────────────────

const SERVICES_IMAGE = "https://picsum.photos/seed/wellbeing/328/304";
const REWARD_IMAGE = "https://picsum.photos/seed/reward-partner/328/304";

const ActiveBadge = () => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: 48,
      backgroundColor: palette.pink700,
      border: `1px solid ${palette.neutralWhite}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <Icon svg={RightIcon} size={16} color={palette.neutralWhite} accessibilityLabel="" />
  </div>
);

const BonusFlag = () => (
  <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
    <div
      style={{
        ...textStyles.label3Bold,
        lineHeight: `${textStyles.label3Bold.lineHeight}px`,
        letterSpacing: `${textStyles.label3Bold.letterSpacing}px`,
        backgroundColor: "#FCE7F1",
        color: palette.pink700,
        borderRadius: 8,
        border: `1px solid ${palette.neutralWhite}`,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 8,
        paddingRight: 28,
        whiteSpace: "nowrap",
      }}
    >
      Bonus
    </div>
    <div style={{ position: "absolute", right: 0 }}>
      <ActiveBadge />
    </div>
  </div>
);

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

### TileImage

An image tile variant with a raster image slot (152 px, \`object-fit: cover\`)
at the top and a content area below (title, body slot, action slot).

Use \`imageOverlay\` for photographic assets that need a dark scrim.

### TileGroup

Use \`TileGroup\` to arrange tiles in a horizontal row (equal width) or
vertical stack (full width). Accepts both \`Tile\` and \`TileImage\` as children.

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

// ─── TileImage stories ────────────────────────────────────────────────────────

/**
 * Challenge tile — illustrated image with YuCoin value and an active badge.
 */
export const ImageTileChallenge: StoryObj<typeof TileImage> = {
  render: () => (
    <TileImage
      imageSrc={CHALLENGE_IMAGE_1}
      title="Steps"
      bodySlot={<YuCoinValue value={666} size="small" />}
      actionSlot={<BonusFlag />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Challenge variant — illustrated image (no overlay), title, " +
          "YuCoin value, and a Bonus + Active badge in the action slot.",
      },
    },
  },
};

/**
 * Services tile — photographic image with dark overlay and body description.
 */
export const ImageTileServices: StoryObj<typeof TileImage> = {
  render: () => (
    <TileImage
      imageSrc={SERVICES_IMAGE}
      imageOverlay
      title="Steps"
      bodySlot={
        <span
          style={{
            ...textStyles.label1Bold,
            lineHeight: `${textStyles.label1Bold.lineHeight}px`,
            letterSpacing: `${textStyles.label1Bold.letterSpacing}px`,
            color: palette.neutral700,
          }}
        >
          Digital muscle &amp; joint support
        </span>
      }
      actionSlot={<ActiveBadge />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Services variant — photographic image with dark scrim " +
          "(`imageOverlay`), title, body description, and an active badge.",
      },
    },
  },
};

/**
 * Image tile with flag overlay on the image area.
 */
export const ImageTileWithFlags: StoryObj<typeof TileImage> = {
  render: () => (
    <TileImage
      imageSrc={CHALLENGE_IMAGE_2}
      title="Meditation"
      bodySlot={<YuCoinValue value={200} size="small" />}
      actionSlot={<ActiveBadge />}
      flagSlot={
        <div
          style={{
            ...textStyles.label3Bold,
            lineHeight: `${textStyles.label3Bold.lineHeight}px`,
            letterSpacing: `${textStyles.label3Bold.letterSpacing}px`,
            backgroundColor: palette.pink700,
            color: palette.neutralWhite,
            borderRadius: 48,
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          +1
        </div>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Image tile with a flag overlay (top-left corner of the image). " +
          "The `flagSlot` accepts any ReactNode for status badges.",
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
      <TileGroup>
        <Tile colourIcon={<CoverDetailsColourIcon size={24} />} label="What I can claim for" />
        <Tile colourIcon={<PolicySummaryColourIcon size={24} />} label="Make a claim" />
      </TileGroup>
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
      <TileGroup>
        <Tile colourIcon={<CoverDetailsColourIcon size={24} />} label="What I can claim for" />
        <Tile colourIcon={<PolicySummaryColourIcon size={24} />} label="Make a claim" />
        <Tile colourIcon={<HintsColourIcon size={24} />} label="Key policy information" />
      </TileGroup>
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
      <TileGroup>
        <Tile colourIcon={<CoverDetailsColourIcon size={24} />} label="Cover" />
        <Tile colourIcon={<PolicySummaryColourIcon size={24} />} label="Claims" />
        <Tile colourIcon={<FAQColourIcon size={24} />} label="FAQ" />
        <Tile colourIcon={<MembersColourIcon size={24} />} label="Members" />
      </TileGroup>
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
      <TileGroup>
        <Tile colourIcon={<CoverDetailsColourIcon size={24} />} label="What I can claim for" />
        <Tile colourIcon={<PolicySummaryColourIcon size={24} />} label="Make a claim" />
        <Tile colourIcon={<CalendarColourIcon size={24} />} label="Key policy information" />
      </TileGroup>
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

/**
 * Vertical tile group — TileImage tiles stacked top-to-bottom at full width.
 */
export const VerticalTileGroup: StoryObj<typeof TileGroup> = {
  render: () => (
    <div style={{ width: 327 }}>
      <TileGroup direction="vertical">
        <TileImage
          imageSrc={CHALLENGE_IMAGE_3}
          title="Steps"
          bodySlot={<YuCoinValue value={666} size="small" />}
          actionSlot={<BonusFlag />}
        />
        <TileImage
          imageSrc={SERVICES_IMAGE}
          imageOverlay
          title="Steps"
          bodySlot={
            <span
              style={{
                ...textStyles.label1Bold,
                lineHeight: `${textStyles.label1Bold.lineHeight}px`,
                letterSpacing: `${textStyles.label1Bold.letterSpacing}px`,
                color: palette.neutral700,
              }}
            >
              Digital muscle &amp; joint support
            </span>
          }
          actionSlot={<ActiveBadge />}
        />
      </TileGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Vertical TileGroup — image tiles stack top-to-bottom at full width. " +
          "Use `direction=\"vertical\"` on TileGroup.",
      },
    },
  },
};

/**
 * Horizontal image tile group — two TileImage tiles side-by-side sharing
 * equal width.
 */
export const HorizontalImageTiles: StoryObj<typeof TileGroup> = {
  render: () => (
    <div style={{ width: 327 }}>
      <TileGroup direction="horizontal">
        <TileImage
          imageSrc={CHALLENGE_IMAGE_1}
          title="Steps"
          bodySlot={<YuCoinValue value={666} size="small" />}
          actionSlot={<ActiveBadge />}
        />
        <TileImage
          imageSrc={REWARD_IMAGE}
          imageOverlay
          title="Yoga"
          bodySlot={
            <span
              style={{
                ...textStyles.label1Bold,
                lineHeight: `${textStyles.label1Bold.lineHeight}px`,
                letterSpacing: `${textStyles.label1Bold.letterSpacing}px`,
                color: palette.neutral700,
              }}
            >
              Intro session
            </span>
          }
          actionSlot={<ActiveBadge />}
        />
      </TileGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal image tile group — two TileImage tiles sharing " +
          "equal width inside a 327 px container.",
      },
    },
  },
};
