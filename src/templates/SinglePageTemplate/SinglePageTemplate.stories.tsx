import type { Meta, StoryObj } from "@storybook/react";
import { SinglePageTemplate } from "./SinglePageTemplate";
import { HeroProductDetails } from "../../components/Hero";
import { Card, CardInfoContent } from "../../components/Card";
import { Tile, TileGroup } from "../../components/Tile";
import { Button } from "../../components/Button";
import {
  defaultHeroBackground,
  BupaLogo,
  BupaPipeSeparator,
} from "../../assets/insurance-products";
import YuLifeSquareMonoSvg from "../../icons/svg/YuLifeSquareMono.svg?react";
import {
  Icon,
  RightIcon,
  CoverDetailsColourIcon,
} from "../../icons";
import { palette, colors } from "../../tokens/colors";
import { textStyles } from "../../tokens/typography";
import { spacing } from "../../tokens/spacing";

// ─── Shared helpers ──────────────────────────────────────────────────────────

const BupaYuLifeLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 0, height: 24 }}>
    <BupaLogo
      width={60}
      height={17}
      style={{ display: "block", flexShrink: 0 }}
    />
    <BupaPipeSeparator
      width={1}
      height={20}
      style={{ display: "block", flexShrink: 0, margin: "0 8px" }}
    />
    <YuLifeSquareMonoSvg
      width={20}
      height={20}
      style={{ display: "block", flexShrink: 0 }}
    />
  </div>
);

const trailing = (
  <Icon svg={RightIcon} size={24} color={palette.pink700} accessibilityLabel="" />
);

// ─── Default example content ──────────────────────────────────────────────────

const ExampleMainContent = () => (
  <>
    {/* Tile row — using TileGroup DS component */}
    <TileGroup>
      <Tile colourIcon={<CoverDetailsColourIcon size={24} />} label="Label text goes here maximum..." />
      <Tile colourIcon={<CoverDetailsColourIcon size={24} />} label="Label text goes here maximum..." />
    </TileGroup>

    {/* Placeholder card */}
    <div style={{ width: "100%" }}>
      <Card />
    </div>

    {/* Info card */}
    <div style={{ width: "100%" }}>
      <Card>
        <CardInfoContent
          leftAsset="ColourIcon"
          leftSlot={<CoverDetailsColourIcon size={24} />}
          title="Your title here"
          description="Your description copy goes here. Should be no more than three lines of copy."
          rightSlot={trailing}
        />
      </Card>
    </div>

    {/* Button group */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing[2],
        width: "100%",
      }}
    >
      <Button colour="Primary" variant="Solid" size="Large" style={{ width: "100%" }}>
        Button text
      </Button>
      <Button colour="Primary" variant="Outline" size="Large" style={{ width: "100%" }}>
        Button text
      </Button>
    </div>
  </>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SinglePageTemplate> = {
  title: "Templates/SinglePageTemplate",
  component: SinglePageTemplate,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## SinglePageTemplate

A generic single-page layout template that pairs a full-bleed **Hero** at the
top with a scrollable **MainLayout** content container below. The MainLayout
overlaps the hero with rounded top corners and slides over the hero as the user
scrolls — creating a subtle parallax effect using pure CSS.

### Composition

| Slot | Accepts | Purpose |
|------|---------|---------|
| \`hero\` | Any \`Hero\` variant (\`HeroProductDetails\`, custom, etc.) | Full-bleed page header |
| \`children\` | Any \`ReactNode\` | Scrollable content area (cards, tiles, buttons, lists…) |

### Parallax behaviour

The hero stays pinned at the top of the viewport (\`position: sticky\`) while
the white MainLayout container scrolls over it with rounded top corners,
creating a natural card-over-image parallax effect.

### Figma reference

[YuLife App Storybook — SinglePageTemplate](https://www.figma.com/design/ERkTigxQV1eQ7jooI8pgQp/YuLife-App-Storybook?node-id=10971-1317)

### Real-world usage

See **Pages / Health Cash Plan** for a fully worked product page example.
        `.trim(),
      },
    },
  },
  argTypes: {
    hero: { control: false },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof SinglePageTemplate>;

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Default — demonstrates the template with `HeroProductDetails` and a set of
 * generic content blocks (tiles, card, info card, buttons). Scroll to observe
 * the parallax overlap effect.
 */
export const Default: Story = {
  args: {
    hero: (
      <HeroProductDetails
        backgroundImage={defaultHeroBackground}
        logo={<BupaYuLifeLogo />}
        heading="Life Insurance"
        flagLabel="Core Cover"
      />
    ),
    children: <ExampleMainContent />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Generic composition with `HeroProductDetails` and placeholder content " +
          "(tile row, card, info card, button group). Scroll to observe the " +
          "parallax overlap behaviour.",
      },
    },
  },
};

/**
 * Minimal — hero only with a single line of body copy. Shows the raw template
 * chassis and the MainLayout overlapping the hero's bottom edge.
 */
export const Minimal: Story = {
  args: {
    hero: (
      <HeroProductDetails
        backgroundImage={defaultHeroBackground}
        heading="Life Insurance"
      />
    ),
    children: (
      <p
        style={{
          ...textStyles.body1Regular,
          lineHeight: `${textStyles.body1Regular.lineHeight}px`,
          letterSpacing: `${textStyles.body1Regular.letterSpacing}px`,
          color: colors.textPrimary,
          margin: 0,
        }}
      >
        Minimal content — the MainLayout still overlaps the hero with rounded
        corners.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Minimal usage — a single text paragraph as children, " +
          "demonstrating the overlap without additional components.",
      },
    },
  },
};
