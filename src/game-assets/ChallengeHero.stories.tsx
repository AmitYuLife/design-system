import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

// ─── Asset discovery ──────────────────────────────────────────────────────────
// Eagerly import every PNG/SVG inside challenge-hero, keyed by relative path.

const allImages = import.meta.glob(
  "../assets/challenge-hero/**/*.{png,svg}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroAsset {
  world: string;
  challenge: string;
  src: string;
  filename: string;
}

// ─── Parsing ──────────────────────────────────────────────────────────────────

// Matches: "World=Forest, Challenge=Steps@3x.png"
const FILENAME_RE = /World=([^,]+), Challenge=([^@]+)@3x\.(png|svg)$/;

function parseAsset(globPath: string, src: string): HeroAsset | null {
  const filename = globPath.split("/").pop() ?? "";
  const m = filename.match(FILENAME_RE);
  if (!m) return null;

  return {
    world: m[1].trim(),
    challenge: m[2].trim(),
    src,
    filename,
  };
}

const heroes: HeroAsset[] = Object.entries(allImages)
  .map(([path, src]) => parseAsset(path, src))
  .filter((h): h is HeroAsset => h !== null);

// ─── Grouping helpers ─────────────────────────────────────────────────────────

type ByChallenge = Record<string, HeroAsset[]>;
type ByWorld = Record<string, ByChallenge>;

const byWorld: ByWorld = {};
for (const hero of heroes) {
  (byWorld[hero.world] ??= {})[hero.challenge] ??= [];
  byWorld[hero.world][hero.challenge].push(hero);
}

const WORLD_ORDER = ["Forest", "Ocean", "Desert", "Mountain", "Yuniversal"];
const CHALLENGE_ORDER = ["Steps", "Meditation", "Workouts", "Yudoku"];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CardProps {
  asset: HeroAsset;
}

const HeroCard: React.FC<CardProps> = ({ asset }) => (
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
          height: "auto",
          aspectRatio: "164 / 152",
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
      {asset.challenge}
    </div>
  </div>
);

interface ChallengeRowProps {
  challenge: string;
  assets: HeroAsset[];
}

const ChallengeRow: React.FC<ChallengeRowProps> = ({ challenge, assets }) => (
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
      {challenge}
    </h3>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {assets.map((asset) => (
        <HeroCard key={asset.filename} asset={asset} />
      ))}
    </div>
  </section>
);

interface WorldGridProps {
  world: string;
}

const WorldGrid: React.FC<WorldGridProps> = ({ world }) => {
  const challenges = byWorld[world];
  if (!challenges) {
    return (
      <div style={{ padding: 32, color: "#9ca3af", fontFamily: "sans-serif" }}>
        No assets found for world "{world}".
      </div>
    );
  }

  const challengeKeys = [
    ...CHALLENGE_ORDER.filter((c) => c in challenges),
    ...Object.keys(challenges)
      .filter((c) => !CHALLENGE_ORDER.includes(c))
      .sort(),
  ];

  const total = heroes.filter((h) => h.world === world).length;

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
        {world}
      </h2>
      <p
        style={{
          margin: "0 0 32px",
          fontSize: 13,
          color: "#6b7280",
        }}
      >
        {total} hero image{total !== 1 ? "s" : ""} across {challengeKeys.length}{" "}
        challenge{challengeKeys.length !== 1 ? "s" : ""}
      </p>

      {challengeKeys.map((challenge) => (
        <ChallengeRow
          key={challenge}
          challenge={challenge}
          assets={challenges[challenge]}
        />
      ))}
    </div>
  );
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Game Assets/ChallengeHero",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Challenge Hero Images

Hero card images used on the Challenge screen, displayed at the top of each challenge type.
Each image is defined by two properties:

| Property      | Values |
|---------------|--------|
| **World**     | Forest · Ocean · Desert · Mountain · Yuniversal |
| **Challenge** | Steps · Meditation · Workouts · Yudoku |

Assets are 3× retina resolution and live in \`src/assets/challenge-hero/\`.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Stories — one per world ───────────────────────────────────────────────────

export const Forest: Story = {
  render: () => <WorldGrid world="Forest" />,
  name: "Forest",
};

export const Ocean: Story = {
  render: () => <WorldGrid world="Ocean" />,
  name: "Ocean",
};

export const Desert: Story = {
  render: () => <WorldGrid world="Desert" />,
  name: "Desert",
};

export const Mountain: Story = {
  render: () => <WorldGrid world="Mountain" />,
  name: "Mountain",
};

export const Yuniversal: Story = {
  render: () => <WorldGrid world="Yuniversal" />,
  name: "Yuniversal",
};
