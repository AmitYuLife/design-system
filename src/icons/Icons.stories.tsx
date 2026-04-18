import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import type { IconSize } from "./Icon";

// Import all SVG icons directly for the gallery
import HomeIcon from "./svg/Home.svg";
import SearchIcon from "./svg/Search.svg";
import BellIcon from "./svg/Bell.svg";
import SettingsIcon from "./svg/Settings.svg";
import UserIcon from "./svg/User.svg";
import HeartIcon from "./svg/Heart.svg";
import ArrowLeftIcon from "./svg/ArrowLeft.svg";
import ArrowRightIcon from "./svg/ArrowRight.svg";
import ChevronDownIcon from "./svg/ChevronDown.svg";
import ChevronRightIcon from "./svg/ChevronRight.svg";
import CloseIcon from "./svg/Close.svg";
import MenuIcon from "./svg/Menu.svg";
import PlusIcon from "./svg/Plus.svg";
import CheckIcon from "./svg/Check.svg";
import InfoIcon from "./svg/Info.svg";
import WarningIcon from "./svg/Warning.svg";
import StarIcon from "./svg/Star.svg";
import ShareIcon from "./svg/Share.svg";
import BookmarkIcon from "./svg/Bookmark.svg";
import CameraIcon from "./svg/Camera.svg";
import MapIcon from "./svg/Map.svg";
import LockIcon from "./svg/Lock.svg";
import MailIcon from "./svg/Mail.svg";
import PhoneIcon from "./svg/Phone.svg";

// Catalogue used by the gallery story
const ALL_ICONS = [
  { name: "Home", component: HomeIcon, import: "HomeIcon", category: "Navigation" },
  { name: "Search", component: SearchIcon, import: "SearchIcon", category: "Navigation" },
  { name: "Bell", component: BellIcon, import: "BellIcon", category: "Navigation" },
  { name: "Settings", component: SettingsIcon, import: "SettingsIcon", category: "Navigation" },
  { name: "Menu", component: MenuIcon, import: "MenuIcon", category: "Navigation" },
  { name: "User", component: UserIcon, import: "UserIcon", category: "Actions" },
  { name: "Heart", component: HeartIcon, import: "HeartIcon", category: "Actions" },
  { name: "Star", component: StarIcon, import: "StarIcon", category: "Actions" },
  { name: "Share", component: ShareIcon, import: "ShareIcon", category: "Actions" },
  { name: "Bookmark", component: BookmarkIcon, import: "BookmarkIcon", category: "Actions" },
  { name: "Plus", component: PlusIcon, import: "PlusIcon", category: "Actions" },
  { name: "Close", component: CloseIcon, import: "CloseIcon", category: "Actions" },
  { name: "Camera", component: CameraIcon, import: "CameraIcon", category: "Actions" },
  { name: "ArrowLeft", component: ArrowLeftIcon, import: "ArrowLeftIcon", category: "Directional" },
  { name: "ArrowRight", component: ArrowRightIcon, import: "ArrowRightIcon", category: "Directional" },
  { name: "ChevronDown", component: ChevronDownIcon, import: "ChevronDownIcon", category: "Directional" },
  { name: "ChevronRight", component: ChevronRightIcon, import: "ChevronRightIcon", category: "Directional" },
  { name: "Check", component: CheckIcon, import: "CheckIcon", category: "Feedback" },
  { name: "Info", component: InfoIcon, import: "InfoIcon", category: "Feedback" },
  { name: "Warning", component: WarningIcon, import: "WarningIcon", category: "Feedback" },
  { name: "Lock", component: LockIcon, import: "LockIcon", category: "Communication" },
  { name: "Mail", component: MailIcon, import: "MailIcon", category: "Communication" },
  { name: "Phone", component: PhoneIcon, import: "PhoneIcon", category: "Communication" },
  { name: "Map", component: MapIcon, import: "MapIcon", category: "Communication" },
] as const;

type IconEntry = (typeof ALL_ICONS)[number];

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundations/Iconography",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Iconography

The icon library uses stroke-based SVG icons at a 24×24 grid. All icons accept \`currentColor\`
so they inherit colour from their parent and respond to any CSS colour value.

### Usage

\`\`\`tsx
import { Icon, HomeIcon } from "@/icons";

<Icon svg={HomeIcon} size={24} color="#0066FF" accessibilityLabel="Home" />
\`\`\`

### Sizes

| Token | Value |
|-------|-------|
| \`xs\` | 16px |
| \`sm\` | 20px |
| \`md\` | 24px (default) |
| \`lg\` | 28px |
| \`xl\` | 32px |

### Accessibility

Pass \`accessibilityLabel\` when the icon conveys meaning. Omit it for decorative icons
(they will be \`aria-hidden\` automatically).
        `,
      },
    },
  },
};

export default meta;

// ─── Gallery (all icons) ─────────────────────────────────────────────────────

function IconGallery({ size, color }: { size: IconSize; color: string }) {
  const [query, setQuery] = useState("");
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const categories = [...new Set(ALL_ICONS.map((i) => i.category))];

  const filtered = ALL_ICONS.filter((icon) =>
    icon.name.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = categories.reduce<Record<string, IconEntry[]>>((acc, cat) => {
    const items = filtered.filter((i) => i.category === cat);
    if (items.length) acc[cat] = items as IconEntry[];
    return acc;
  }, {});

  function handleCopy(name: string) {
    const snippet = `import { ${name}Icon } from "@/icons";`;
    navigator.clipboard.writeText(snippet).then(() => {
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 1800);
    });
  }

  return (
    <div style={{ padding: "24px", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Search bar */}
      <div style={{ marginBottom: "24px" }}>
        <input
          type="search"
          placeholder="Search icons…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: 360,
            padding: "10px 14px",
            fontSize: 15,
            border: "1.5px solid #E5E5E5",
            borderRadius: 8,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {Object.entries(grouped).map(([category, icons]) => (
        <div key={category} style={{ marginBottom: 40 }}>
          <h3
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#6B7280",
              marginBottom: 16,
              borderBottom: "1px solid #F0F0F0",
              paddingBottom: 8,
            }}
          >
            {category}
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 12,
            }}
          >
            {icons.map((icon) => (
              <button
                key={icon.name}
                title={`Click to copy import for ${icon.name}`}
                onClick={() => handleCopy(icon.name)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 8px",
                  border: "1.5px solid",
                  borderColor:
                    copiedName === icon.name ? "#0066FF" : "#F0F0F0",
                  borderRadius: 10,
                  background:
                    copiedName === icon.name ? "#EFF6FF" : "#FAFAFA",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon svg={icon.component} size={size} color={color} />
                <span
                  style={{
                    fontSize: 11,
                    color: "#374151",
                    fontWeight: 500,
                    textAlign: "center",
                    wordBreak: "break-word",
                  }}
                >
                  {copiedName === icon.name ? "Copied!" : icon.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(grouped).length === 0 && (
        <p style={{ color: "#9CA3AF", textAlign: "center", marginTop: 40 }}>
          No icons match &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}

export const Gallery: StoryObj = {
  name: "Gallery",
  args: {
    size: 24,
    color: "#1A1A1A",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: [16, 20, 24, 28, 32],
      description: "Icon size in pixels",
    },
    color: {
      control: { type: "color" },
      description: "Icon stroke colour",
    },
  },
  render: (args) => (
    <IconGallery size={args.size as IconSize} color={args.color as string} />
  ),
};

// ─── Single icon with all controls ──────────────────────────────────────────

export const SingleIcon: StoryObj<typeof Icon> = {
  name: "Single Icon",
  args: {
    size: 24,
    color: "#1A1A1A",
    accessibilityLabel: "",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: [16, 20, 24, 28, 32],
      description: "Icon size",
    },
    color: {
      control: { type: "color" },
      description: "Icon colour",
    },
    accessibilityLabel: {
      control: "text",
      description: "Accessible label (leave blank for decorative icons)",
    },
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        gap: 24,
        padding: 32,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {ALL_ICONS.slice(0, 8).map((icon) => (
        <div
          key={icon.name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon
            svg={icon.component}
            size={args.size as IconSize}
            color={args.color as string}
            accessibilityLabel={
              args.accessibilityLabel
                ? `${icon.name} icon`
                : undefined
            }
          />
          <span style={{ fontSize: 11, color: "#6B7280" }}>{icon.name}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the controls panel to adjust size and colour across a sample set of icons.",
      },
    },
  },
};

// ─── Size scale ──────────────────────────────────────────────────────────────

export const SizeScale: StoryObj = {
  name: "Size Scale",
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 24,
        padding: 40,
        flexWrap: "wrap",
      }}
    >
      {([16, 20, 24, 28, 32] as IconSize[]).map((s) => (
        <div
          key={s}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Icon svg={HomeIcon} size={s} color="#1A1A1A" />
          <span style={{ fontSize: 11, color: "#6B7280" }}>{s}px</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "The five canonical icon sizes (16, 20, 24, 28, 32 px).",
      },
    },
  },
};

// ─── Colour variants ─────────────────────────────────────────────────────────

export const ColourVariants: StoryObj = {
  name: "Colour Variants",
  render: () => {
    const colours = [
      { label: "Default", value: "#1A1A1A" },
      { label: "Primary", value: "#0066FF" },
      { label: "Success", value: "#16A34A" },
      { label: "Warning", value: "#D97706" },
      { label: "Danger", value: "#DC2626" },
      { label: "Muted", value: "#9CA3AF" },
    ];

    return (
      <div
        style={{
          display: "flex",
          gap: 32,
          padding: 40,
          flexWrap: "wrap",
        }}
      >
        {colours.map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#F8F8F8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #F0F0F0",
              }}
            >
              <Icon svg={StarIcon} size={24} color={value} />
            </div>
            <span style={{ fontSize: 11, color: "#6B7280" }}>{label}</span>
            <span style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace" }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Icons inherit `currentColor` and respond to any valid CSS color.",
      },
    },
  },
};
