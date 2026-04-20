import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

// ─── Asset discovery ──────────────────────────────────────────────────────────
// Eagerly import every PNG/SVG inside game-backgrounds, keyed by relative path.

const allImages = import.meta.glob(
  "../assets/game-backgrounds/**/*.{png,svg}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// ─── Types ────────────────────────────────────────────────────────────────────

interface BackgroundAsset {
  planet: string;
  world: string;
  challenge: string;
  section: string;
  src: string;
  filename: string;
}

// ─── Parsing ──────────────────────────────────────────────────────────────────

const FILENAME_RE =
  /Planet=([^,]+), World=([^,]+), Challenge=([^,]+), Online=On, Section=([^.]+)\.(png|svg)$/;

function parseAsset(globPath: string, src: string): BackgroundAsset | null {
  const filename = globPath.split("/").pop() ?? "";
  const m = filename.match(FILENAME_RE);
  if (!m) return null;

  // Derive planet from the folder name (Planet=None → Yuniversal)
  const folderParts = globPath.split("/");
  const folderPlanet = folderParts[folderParts.length - 2] ?? m[1].trim();

  return {
    planet: folderPlanet,
    world: m[2].trim(),
    challenge: m[3].trim(),
    section: m[4].trim(),
    src,
    filename,
  };
}

const backgrounds: BackgroundAsset[] = Object.entries(allImages)
  .map(([path, src]) => parseAsset(path, src))
  .filter((b): b is BackgroundAsset => b !== null);

// ─── Grouping helpers ─────────────────────────────────────────────────────────

type ByWorld = Record<string, BackgroundAsset[]>;
type ByPlanet = Record<string, ByWorld>;

const byPlanet: ByPlanet = {};
for (const bg of backgrounds) {
  (byPlanet[bg.planet] ??= {})[bg.world] ??= [];
  byPlanet[bg.planet][bg.world].push(bg);
}

const WORLD_ORDER = ["Forest", "Ocean", "Desert", "Mountain"];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CardProps {
  asset: BackgroundAsset;
}

const BackgroundCard: React.FC<CardProps> = ({ asset }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
    }}
  >
    <a href={asset.src} target="_blank" rel="noreferrer">
      <img
        src={asset.src}
        alt={asset.filename}
        style={{
          width: 200,
          height: 432,
          objectFit: "cover",
          borderRadius: 10,
          display: "block",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          cursor: "pointer",
        }}
      />
    </a>
    <div
      style={{
        fontSize: 10,
        fontWeight: 600,
        color: "#374151",
        lineHeight: "14px",
        textAlign: "center",
        maxWidth: 200,
      }}
    >
      {asset.challenge === "None" ? asset.section : asset.challenge}
    </div>
  </div>
);

interface WorldSectionProps {
  world: string;
  assets: BackgroundAsset[];
}

const WorldSection: React.FC<WorldSectionProps> = ({ world, assets }) => {
  const sorted = [...assets].sort((a, b) =>
    a.challenge.localeCompare(b.challenge)
  );
  return (
    <section style={{ marginBottom: 40 }}>
      <h3
        style={{
          margin: "0 0 14px",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#9ca3af",
        }}
      >
        {world}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {sorted.map((bg) => (
          <BackgroundCard key={bg.filename} asset={bg} />
        ))}
      </div>
    </section>
  );
};

interface PlanetGridProps {
  planet: string;
}

const PlanetGrid: React.FC<PlanetGridProps> = ({ planet }) => {
  const worlds = byPlanet[planet];
  if (!worlds) {
    return (
      <div style={{ padding: 32, color: "#9ca3af", fontFamily: "sans-serif" }}>
        No assets found for planet "{planet}".
      </div>
    );
  }

  const worldKeys = [
    ...WORLD_ORDER.filter((w) => w in worlds),
    ...Object.keys(worlds)
      .filter((w) => !WORLD_ORDER.includes(w))
      .sort(),
  ];

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: "32px 24px",
        backgroundColor: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          margin: "0 0 4px",
          fontSize: 22,
          fontWeight: 700,
          color: "#111827",
        }}
      >
        {planet}
      </h2>
      <p
        style={{
          margin: "0 0 32px",
          fontSize: 13,
          color: "#6b7280",
        }}
      >
        {backgrounds.filter((b) => b.planet === planet).length} backgrounds
        across {worldKeys.length} world{worldKeys.length !== 1 ? "s" : ""}
      </p>

      {worldKeys.map((world) => (
        <WorldSection key={world} world={world} assets={worlds[world]} />
      ))}
    </div>
  );
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Game Assets/ChallengeBackgrounds",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Challenge Backgrounds

Full-screen illustrated backgrounds used on the Challenge (Today) screen.
Each background is defined by four properties:

| Property  | Values |
|-----------|--------|
| **Planet**    | Earth · Red · Bright · Orange · Purple · Ring · Lunar · Yuniversal |
| **World**     | Forest · Ocean · Desert · Mountain (+ Yunity tiers) |
| **Challenge** | Brisk Walk · Short Stroll · Long Walk · Meditation · Fiit · None |
| **Section**   | Active · Select · Result · YuCoin · Mindfulness · Yuniversal |

Assets live in \`src/assets/game-backgrounds/{Planet}/\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Stories — one per planet ─────────────────────────────────────────────────

export const Earth: Story = {
  render: () => <PlanetGrid planet="Earth" />,
  name: "Earth",
};

export const Red: Story = {
  render: () => <PlanetGrid planet="Red" />,
  name: "Red",
};

export const Bright: Story = {
  render: () => <PlanetGrid planet="Bright" />,
  name: "Bright",
};

export const Orange: Story = {
  render: () => <PlanetGrid planet="Orange" />,
  name: "Orange",
};

export const Purple: Story = {
  render: () => <PlanetGrid planet="Purple" />,
  name: "Purple",
};

export const Ring: Story = {
  render: () => <PlanetGrid planet="Ring" />,
  name: "Ring",
};

export const Lunar: Story = {
  render: () => <PlanetGrid planet="Lunar" />,
  name: "Lunar",
};

export const Yuniversal: Story = {
  render: () => <PlanetGrid planet="Yuniversal" />,
  name: "Yuniversal",
};
