import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SinglePageTemplate } from "../../templates/SinglePageTemplate";
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
  PolicySummaryColourIcon,
  MembersColourIcon,
  CalendarColourIcon,
  HintsColourIcon,
  TalkColourIcon,
  FAQColourIcon,
} from "../../icons";
import { palette, colors } from "../../tokens/colors";
import { textStyles } from "../../tokens/typography";
import { spacing, space } from "../../tokens/spacing";
import { radii } from "../../tokens/radii";

// ─── Story-level helpers ──────────────────────────────────────────────────────

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


// ─── ServiceCard ──────────────────────────────────────────────────────────────
// ⚠ Gap: no ServiceCard / health-tools carousel DS component exists.
// The horizontally-scrollable branded-service card pattern needs its own DS
// component with an image thumbnail prop.

interface HealthService {
  name: string;
  description?: string;
  /** Approximate brand background colour for the thumbnail placeholder. */
  thumbBg: string;
}

const ServiceCard: React.FC<{ service: HealthService }> = ({ service }) => (
  <div
    style={{
      flexShrink: 0,
      width: 120,
      backgroundColor: colors.bgElevated,
      border: `1px solid ${palette.neutral300}`,
      borderRadius: radii.xl, // 16px — matches Figma spec
      boxShadow: `0px 4px 0px 0px ${palette.neutral300}`,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Branded thumbnail — placeholder colour; real impl passes an image src */}
    <div
      style={{
        height: 84,
        backgroundColor: service.thumbBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: spacing[2],
        flexShrink: 0,
      }}
    >
      <span
        style={{
          ...textStyles.label1Bold,
          lineHeight: `${textStyles.label1Bold.lineHeight}px`,
          letterSpacing: `${textStyles.label1Bold.letterSpacing}px`,
          color: palette.neutralWhite,
          textAlign: "center",
        }}
      >
        {service.name}
      </span>
    </div>

    {/* Text label */}
    <div
      style={{
        padding: spacing[2],
        paddingBottom: spacing[4],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <span
        style={{
          ...textStyles.label1Bold,
          lineHeight: `${textStyles.label1Bold.lineHeight}px`,
          letterSpacing: `${textStyles.label1Bold.letterSpacing}px`,
          color: palette.neutral600,
        }}
      >
        {service.name}
      </span>
      {service.description != null && service.description !== "" && (
        <span
          style={{
            ...textStyles.label1Regular,
            lineHeight: `${textStyles.label1Regular.lineHeight}px`,
            letterSpacing: `${textStyles.label1Regular.letterSpacing}px`,
            color: palette.neutral600,
          }}
        >
          {service.description}
        </span>
      )}
    </div>
  </div>
);

const HEALTH_SERVICES: HealthService[] = [
  { name: "Phio.", description: "Digital muscle and joint support", thumbBg: "#1C2C5B" },
  { name: "betterhelp", description: "Digital GP service", thumbBg: "#13A167" },
  { name: "SkinVision", description: "Digital GP service", thumbBg: "#0A5F8C" },
  { name: "Asos", thumbBg: "#000000" },
  { name: "Breathwrk", thumbBg: "#0F1A5C" },
];

// ─── Page content ─────────────────────────────────────────────────────────────

const HealthCashPlanContent = () => (
  <>
    {/* ── 1. Tile group ─────────────────────────────────────────────────────── */}
    <TileGroup>
      <Tile colourIcon={<CoverDetailsColourIcon size={24} />} label="What I can claim for" />
      <Tile colourIcon={<PolicySummaryColourIcon size={24} />} label="Make a claim" />
      <Tile colourIcon={<HintsColourIcon size={24} />} label="Key policy information" />
    </TileGroup>

    {/* ── 2. Key info ───────────────────────────────────────────────────────── */}
    <Card overline="Key info" style={{ gap: spacing[4] }}>
      <CardInfoContent
        leftAsset="ColourIcon"
        leftSlot={<CoverDetailsColourIcon size={24} />}
        title="Cover level"
        description="[Key / Level 1]"
      />
      <CardInfoContent
        leftAsset="ColourIcon"
        leftSlot={<MembersColourIcon size={24} />}
        title="Membership no."
        description="[000000000000000]"
      />
      <CardInfoContent
        leftAsset="ColourIcon"
        leftSlot={<CalendarColourIcon size={24} />}
        title="Start date"
        description="[Key / Level 1]"
      />
    </Card>

    {/* ── 3. Resources and support ──────────────────────────────────────────── */}
    <Card overline="Resources and support" style={{ gap: spacing[4] }}>
      <CardInfoContent
        leftAsset="ColourIcon"
        leftSlot={<TalkColourIcon size={24} />}
        title="Talk to us"
        description="0345 606 6003"
        rightSlot={trailing}
      />
      <CardInfoContent
        leftAsset="ColourIcon"
        leftSlot={<HintsColourIcon size={24} />}
        title="Email us"
        rightSlot={trailing}
      />
      <CardInfoContent
        leftAsset="ColourIcon"
        leftSlot={<FAQColourIcon size={24} />}
        title="Find Bupa healthcare providers"
        rightSlot={trailing}
      />
    </Card>

    {/* ── 4. Included on your policy ────────────────────────────────────────── */}
    <Card overline="Included on your policy" style={{ gap: spacing[4] }}>
      <CardInfoContent
        title="[Full name]"
        description="[Relationship]"
        rightSlot={
          <Button colour="Primary" variant="Outline" size="Small">
            Invite
          </Button>
        }
      />
      <CardInfoContent title="[Full name]" description="[Relationship]" />
    </Card>

    {/* ── 5. Your health tools and services ────────────────────────────────── */}
    {/* ⚠ Gap: ServiceCarousel is not a DS component — built inline here. */}
    <div style={{ width: "100%" }}>
      <p
        style={{
          ...textStyles.label2Bold,
          lineHeight: `${textStyles.label2Bold.lineHeight}px`,
          letterSpacing: `${textStyles.label2Bold.letterSpacing}px`,
          color: colors.textPrimary,
          margin: 0,
          marginBottom: spacing[2],
        }}
      >
        Your health tools and services
      </p>
      <div
        style={{
          display: "flex",
          gap: spacing[4],
          overflowX: "auto",
          paddingBottom: spacing[2],
          marginLeft: -space.pagePaddingHorizontal,
          marginRight: -space.pagePaddingHorizontal,
          paddingLeft: space.pagePaddingHorizontal,
          paddingRight: space.pagePaddingHorizontal,
        }}
      >
        {HEALTH_SERVICES.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </div>
    </div>

    {/* ── 6. Disclaimer ─────────────────────────────────────────────────────── */}
    <p
      style={{
        ...textStyles.label1Regular,
        lineHeight: `${textStyles.label1Regular.lineHeight}px`,
        letterSpacing: `${textStyles.label1Regular.letterSpacing}px`,
        color: palette.neutral600,
        margin: 0,
      }}
    >
      This is a group insurance product, should you have any questions about
      your cover, please contact your employer.
      {"\n\n"}
      Policies paid for by your employer may have implications on your tax
      status and take-home pay.
    </p>
  </>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SinglePageTemplate> = {
  title: "Pages/Health Cash Plan",
  component: SinglePageTemplate,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Health Cash Plan

A working example of a full product details page built from the
[Figma Product Details spec](https://www.figma.com/design/rcvmDvx5OVZQWEMMhhtqLa/Product-Details--Spec-?node-id=6239-736),
using \`SinglePageTemplate\` as the layout chassis.

### DS components used

| Section | Component |
|---------|-----------|
| Hero | \`HeroProductDetails\` (Bupa + YuLife co-brand logo) |
| Tile row | \`TileGroup\` with \`CoverDetailsColourIcon\`, \`PolicySummaryColourIcon\`, \`HintsColourIcon\` |
| Key info | \`Card\` (overline) + 3× \`CardInfoContent\` |
| Resources and support | \`Card\` + 3× \`CardInfoContent\` + \`RightIcon\` trailing |
| Included on your policy | \`Card\` + 2× \`CardInfoContent\` + \`Button\` (Outline / Small) |

### Component gaps

| Gap | Description |
|-----|-------------|
| \`ServiceCarousel\` | Horizontally-scrollable branded service cards. No DS component — built inline with colour placeholders. Thumbnail images would be passed as props in the real implementation. |
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

// ─── Story ────────────────────────────────────────────────────────────────────

/**
 * Health Cash Plan product page — Bupa + YuLife co-brand.
 *
 * Scroll to see the parallax overlap between hero and content.
 *
 * **Component gap:** `ServiceCarousel` (horizontally-scrollable service cards) — needs a DS component.
 *
 * Figma: https://www.figma.com/design/rcvmDvx5OVZQWEMMhhtqLa/Product-Details--Spec-?node-id=6239-736
 */
export const Default: Story = {
  args: {
    hero: (
      <HeroProductDetails
        backgroundImage={defaultHeroBackground}
        logo={<BupaYuLifeLogo />}
        heading="Health Cash Plan"
      />
    ),
    children: <HealthCashPlanContent />,
  },
};
