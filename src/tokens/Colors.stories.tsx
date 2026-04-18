import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { palette, colors } from "./colors";
import type { PaletteKey, SemanticKey } from "./colors";

const meta: Meta = {
  title: "Foundations/Colours",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Colour system

Two-layer colour architecture:

**Palette** — raw named values (greys, primary, success, warning, danger). Do not
reference palette tokens in component code; always use semantic tokens.

**Semantic tokens** — purpose-driven aliases (text, background, border, action,
feedback). These are the tokens components should consume.

### Usage

\`\`\`ts
import { colors } from "@/tokens/colors";

<View style={{ backgroundColor: colors.bgSurface }}>
  <Text style={{ color: colors.textPrimary }}>Hello</Text>
</View>
\`\`\`
        `,
      },
    },
  },
};

export default meta;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

function luminance(hex: string) {
  const rgb = hexToRgb(hex).split(", ").map(Number);
  const [r, g, b] = rgb.map((c) => {
    const n = c / 255;
    return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.0722 * b + 0.0722 * g;
}

function isDark(hex: string) {
  return luminance(hex) < 0.35;
}

// ─── Palette story ────────────────────────────────────────────────────────────

type PaletteGroup = {
  label: string;
  keys: PaletteKey[];
};

const paletteGroups: PaletteGroup[] = [
  {
    label: "Neutrals",
    keys: ["white", "grey50", "grey100", "grey200", "grey300", "grey400", "grey500", "grey600", "grey700", "grey800", "grey900", "black"],
  },
  {
    label: "Primary",
    keys: ["primary50", "primary100", "primary200", "primary300", "primary400", "primary500", "primary600", "primary700", "primary800", "primary900"],
  },
  {
    label: "Success",
    keys: ["success50", "success100", "success200", "success300", "success400", "success500", "success600", "success700", "success800", "success900"],
  },
  {
    label: "Warning",
    keys: ["warning50", "warning100", "warning200", "warning300", "warning400", "warning500", "warning600", "warning700", "warning800", "warning900"],
  },
  {
    label: "Danger",
    keys: ["danger50", "danger100", "danger200", "danger300", "danger400", "danger500", "danger600", "danger700", "danger800", "danger900"],
  },
];

export const Palette: StoryObj = {
  name: "Palette",
  render: () => (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      {paletteGroups.map(({ label, keys }) => (
        <div key={label} style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#6B7280", marginBottom: 12 }}>
            {label}
          </h3>
          <div style={{ display: "flex", gap: 0, borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            {keys.map((key) => {
              const value = palette[key];
              const dark = isDark(value);
              return (
                <div
                  key={key}
                  title={`${key}: ${value}`}
                  style={{
                    flex: 1,
                    height: 72,
                    background: value,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "6px 5px",
                    minWidth: 0,
                  }}
                >
                  <span style={{ fontSize: 9, fontWeight: 600, color: dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.55)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {key}
                  </span>
                  <span style={{ fontSize: 8, color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.35)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "The raw colour palette. Do not use these directly in component code — use semantic tokens instead." },
    },
  },
};

// ─── Semantic tokens story ────────────────────────────────────────────────────

type SemanticGroup = {
  label: string;
  keys: SemanticKey[];
};

const semanticGroups: SemanticGroup[] = [
  {
    label: "Text",
    keys: ["textPrimary", "textSecondary", "textDisabled", "textInverse", "textLink", "textDanger"],
  },
  {
    label: "Backgrounds",
    keys: ["bgBase", "bgSurface", "bgElevated", "bgOverlay", "bgDisabled"],
  },
  {
    label: "Borders",
    keys: ["borderDefault", "borderFocused", "borderDanger"],
  },
  {
    label: "Action — Primary",
    keys: ["actionPrimary", "actionPrimaryHover", "actionPrimaryPressed", "actionPrimaryText"],
  },
  {
    label: "Action — Secondary",
    keys: ["actionSecondary", "actionSecondaryBorder", "actionSecondaryText"],
  },
  {
    label: "Action — Destructive",
    keys: ["actionDestructive", "actionDestructiveText"],
  },
  {
    label: "Feedback",
    keys: ["feedbackSuccess", "feedbackWarning", "feedbackDanger", "feedbackInfo"],
  },
  {
    label: "Status Surfaces",
    keys: ["successSurface", "warningSurface", "dangerSurface", "infoSurface"],
  },
];

export const SemanticTokens: StoryObj = {
  name: "Semantic Tokens",
  render: () => (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif" }}>
      {semanticGroups.map(({ label, keys }) => (
        <div key={label} style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#6B7280", marginBottom: 12 }}>
            {label}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
            {keys.map((key) => {
              const value = colors[key];
              const dark = isDark(value);
              return (
                <div
                  key={key}
                  style={{
                    borderRadius: 8,
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    border: "1px solid #F0F0F0",
                  }}
                >
                  <div style={{ height: 56, background: value }} />
                  <div style={{ padding: "8px 10px", background: "#FAFAFA" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{key}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "monospace", marginTop: 2 }}>{value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Semantic colour tokens. Always reference these in component code, never raw palette values." },
    },
  },
};
