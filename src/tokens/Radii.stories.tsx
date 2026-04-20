import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { radii } from "./radii";
import type { RadiusKey } from "./radii";

const meta: Meta = {
  title: "Foundations/Radii",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Border Radius

Token-driven radius scale used for all rounded corners across the app.
Sourced from the [YuLife App Storybook — Variables](https://www.figma.com/design/ERkTigxQV1eQ7jooI8pgQp/YuLife-App-Storybook?vars=1&var-set-id=10757-1089) Figma file.

### Usage

\`\`\`ts
import { radii } from "@/tokens/radii";

const styles = StyleSheet.create({
  card:   { borderRadius: radii.md },    // 8
  button: { borderRadius: radii.pill },  // 9999
  badge:  { borderRadius: radii.sm },    // 4
});
\`\`\`
        `,
      },
    },
  },
};

export default meta;

// ─── Shared ───────────────────────────────────────────────────────────────────

const MONO: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: 11,
  color: "#9CA3AF",
};

const SWATCH_SIZE = 80;

// ─── Scale story ──────────────────────────────────────────────────────────────

type RadiusEntry = { key: RadiusKey; value: number; description: string };

const entries: RadiusEntry[] = [
  { key: "none", value: radii.none,  description: "No rounding — sharp corners" },
  { key: "xs",   value: radii.xs,    description: "Hairline — decorative elements, SVG shapes" },
  { key: "sm",   value: radii.sm,    description: "Subtle — tags, badges, code snippets" },
  { key: "md",   value: radii.md,    description: "Standard — cards, inputs, chips" },
  { key: "lg",   value: radii.lg,    description: "Prominent — icon containers, dialogs" },
  { key: "xl",   value: radii.xl,    description: "Large — bottom sheets, elevated surfaces" },
  { key: "2xl",  value: radii["2xl"], description: "Heavy — large cards, onboarding panels" },
  { key: "pill", value: radii.pill,  description: "Pill — buttons, toggles, fully rounded" },
];

export const Scale: StoryObj = {
  name: "Scale",
  render: () => (
    <div style={{ padding: "40px 48px", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#9CA3AF",
          marginBottom: 32,
        }}
      >
        Border radius scale
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {entries.map(({ key, value, description }) => {
          const displayRadius = Math.min(value, SWATCH_SIZE / 2);
          return (
            <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
              {/* Swatch */}
              <div
                style={{
                  width: SWATCH_SIZE,
                  height: SWATCH_SIZE,
                  borderRadius: displayRadius,
                  background: "linear-gradient(135deg, #7C3AED22, #7C3AED44)",
                  border: "2px solid #7C3AED44",
                  flexShrink: 0,
                }}
              />

              {/* Token name */}
              <code
                style={{
                  fontSize: 12,
                  background: "#F3F4F6",
                  padding: "2px 7px",
                  borderRadius: 4,
                  color: "#374151",
                  fontFamily: "monospace",
                }}
              >
                {key}
              </code>

              {/* Pixel value */}
              <span style={{ ...MONO }}>
                {value >= 9999 ? "9999 (pill)" : `${value}px`}
              </span>

              {/* Description */}
              <span style={{ fontSize: 11, color: "#9CA3AF", maxWidth: SWATCH_SIZE + 16, lineHeight: 1.4 }}>
                {description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "All eight radius tokens. The swatch corner rounding matches the token value (capped at 50% of the swatch size for the `pill` token)." },
    },
  },
};

// ─── Usage examples ───────────────────────────────────────────────────────────

export const UsageExamples: StoryObj = {
  name: "Usage Examples",
  render: () => {
    const BG = "#F9FAFB";
    const BORDER = "#E5E7EB";
    const TEXT: React.CSSProperties = { fontSize: 13, color: "#374151", fontWeight: 500 };
    const SUB: React.CSSProperties = { fontSize: 11, color: "#9CA3AF", marginTop: 4 };

    return (
      <div style={{ padding: "40px 48px", fontFamily: "Inter, system-ui, sans-serif", display: "flex", flexDirection: "column", gap: 48 }}>

        {/* Card */}
        <div>
          <div style={{ ...MONO, marginBottom: 16, color: "#6B7280" }}>radii.md — card / input</div>
          <div style={{ width: 280, padding: 20, background: "#fff", borderRadius: radii.md, border: `1px solid ${BORDER}`, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
            <div style={TEXT}>Card title</div>
            <div style={SUB}>A standard surface using radii.md ({radii.md}px)</div>
          </div>
        </div>

        {/* Button */}
        <div>
          <div style={{ ...MONO, marginBottom: 16, color: "#6B7280" }}>radii.pill — button / toggle</div>
          <button
            style={{
              padding: "12px 28px",
              borderRadius: radii.pill,
              background: "#7C3AED",
              color: "#fff",
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            Get started
          </button>
        </div>

        {/* Badge */}
        <div>
          <div style={{ ...MONO, marginBottom: 16, color: "#6B7280" }}>radii.sm — badge / tag</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Active", "Pending", "Completed"].map((label) => (
              <span
                key={label}
                style={{
                  padding: "4px 10px",
                  borderRadius: radii.sm,
                  background: "#EDE9FE",
                  color: "#6D28D9",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Icon container */}
        <div>
          <div style={{ ...MONO, marginBottom: 16, color: "#6B7280" }}>radii.lg — icon container</div>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: radii.lg,
              background: BG,
              border: `1px solid ${BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            🏆
          </div>
        </div>

        {/* Bottom sheet preview */}
        <div>
          <div style={{ ...MONO, marginBottom: 16, color: "#6B7280" }}>radii.xl — bottom sheet / modal</div>
          <div
            style={{
              width: 320,
              padding: 24,
              background: "#fff",
              borderRadius: `${radii.xl}px ${radii.xl}px 0 0`,
              border: `1px solid ${BORDER}`,
              boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ width: 36, height: 4, borderRadius: 2, background: "#D1D5DB", margin: "0 auto 16px" }} />
            <div style={TEXT}>Bottom sheet</div>
            <div style={SUB}>Top corners use radii.xl ({radii.xl}px), bottom corners are 0</div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: "Common UI patterns demonstrating the appropriate radius token for each context." },
    },
  },
};

// ─── Token table ─────────────────────────────────────────────────────────────

export const TokenTable: StoryObj = {
  name: "Token Table",
  render: () => (
    <div style={{ padding: "40px 48px", fontFamily: "Inter, system-ui, sans-serif", maxWidth: 560 }}>
      {/* Column headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 64px 1fr",
          gap: "0 16px",
          padding: "6px 0",
          borderBottom: "2px solid #E5E7EB",
        }}
      >
        {["Token", "Value", "Usage"].map((h) => (
          <span key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9CA3AF" }}>
            {h}
          </span>
        ))}
      </div>

      {entries.map(({ key, value, description }) => (
        <div
          key={key}
          style={{
            display: "grid",
            gridTemplateColumns: "80px 64px 1fr",
            gap: "0 16px",
            alignItems: "center",
            padding: "12px 0",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <code style={{ fontSize: 11, background: "#F3F4F6", padding: "2px 6px", borderRadius: 4, color: "#374151", whiteSpace: "nowrap", display: "inline-block" }}>
            {key}
          </code>
          <span style={{ ...MONO }}>{value >= 9999 ? "9999" : `${value}px`}</span>
          <span style={{ fontSize: 12, color: "#6B7280" }}>{description}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Quick-reference table mapping every radius token to its pixel value and intended usage context." },
    },
  },
};
