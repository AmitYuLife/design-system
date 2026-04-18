import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
} from "./typography";

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Typography

The type system is built on **Inter** (sans-serif) with **Fira Code** for
monospaced contexts.

### Usage

Reference the pre-composed \`textStyles\` presets directly in StyleSheet or inline styles:

\`\`\`ts
import { textStyles, colors } from "@/tokens";

const styles = StyleSheet.create({
  title: {
    ...textStyles.headingLG,
    color: colors.textPrimary,
  },
});
\`\`\`

Or use individual tokens when you need a single axis of control:

\`\`\`ts
import { fontSize, fontWeight } from "@/tokens/typography";

fontSize.md       // 15
fontWeight.semibold // "600"
\`\`\`
        `,
      },
    },
  },
};

export default meta;

// ─── Text styles — full specimen ─────────────────────────────────────────────

const specimen = "The quick brown fox jumps over the lazy dog";
const shortSpecimen = "Aa Bb Cc 012";

const styleRows: Array<{ key: keyof typeof textStyles; label: string; text?: string }> = [
  { key: "displayLarge",  label: "Display Large",  text: shortSpecimen },
  { key: "displaySmall",  label: "Display Small",  text: shortSpecimen },
  { key: "headingXL",     label: "Heading XL",     text: shortSpecimen },
  { key: "headingLG",     label: "Heading LG" },
  { key: "headingMD",     label: "Heading MD" },
  { key: "headingSM",     label: "Heading SM" },
  { key: "bodyLG",        label: "Body LG" },
  { key: "bodyMD",        label: "Body MD" },
  { key: "bodySM",        label: "Body SM" },
  { key: "labelLG",       label: "Label LG" },
  { key: "labelMD",       label: "Label MD" },
  { key: "labelSM",       label: "Label SM" },
  { key: "caption",       label: "Caption" },
  { key: "overline",      label: "Overline" },
  { key: "code",          label: "Code",      text: "const hello = 'world';" },
];

export const TypeSpecimen: StoryObj = {
  name: "Type Specimen",
  render: () => (
    <div style={{ padding: "32px 24px", fontFamily: "Inter, system-ui, sans-serif", maxWidth: 720 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #E5E7EB" }}>
            {["Style", "Preview", "Size", "Weight", "Line height"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#6B7280" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {styleRows.map(({ key, label, text }) => {
            const style = textStyles[key];
            return (
              <tr key={key} style={{ borderBottom: "1px solid #F3F4F6" }}>
                <td style={{ padding: "12px", fontSize: 11, color: "#6B7280", fontFamily: "monospace", whiteSpace: "nowrap" }}>
                  {label}
                </td>
                <td style={{ padding: "12px", maxWidth: 300 }}>
                  <span style={style as React.CSSProperties}>
                    {text ?? specimen}
                  </span>
                </td>
                <td style={{ padding: "12px", fontSize: 12, color: "#9CA3AF", fontFamily: "monospace", whiteSpace: "nowrap" }}>
                  {style.fontSize}px
                </td>
                <td style={{ padding: "12px", fontSize: 12, color: "#9CA3AF", fontFamily: "monospace" }}>
                  {style.fontWeight}
                </td>
                <td style={{ padding: "12px", fontSize: 12, color: "#9CA3AF", fontFamily: "monospace" }}>
                  {style.lineHeight}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "All pre-composed text style presets with a live preview." },
    },
  },
};

// ─── Scale ────────────────────────────────────────────────────────────────────

export const Scale: StoryObj = {
  name: "Size Scale",
  render: () => (
    <div style={{ padding: "32px 24px", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {(Object.entries(fontSize) as [string, number][])
          .sort((a, b) => a[1] - b[1])
          .map(([key, px]) => (
            <div key={key} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={{ width: 40, fontSize: 11, color: "#9CA3AF", fontFamily: "monospace", flexShrink: 0 }}>
                {key}
              </span>
              <span style={{ fontSize: px, fontFamily: fontFamily.sans, lineHeight: 1.2, color: "#1A1A1A" }}>
                The quick brown fox
              </span>
              <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "monospace", flexShrink: 0 }}>
                {px}px
              </span>
            </div>
          ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "The complete font-size scale from 2xs (11px) to 5xl (40px)." },
    },
  },
};

// ─── Weights ──────────────────────────────────────────────────────────────────

export const Weights: StoryObj = {
  name: "Font Weights",
  render: () => (
    <div style={{ padding: "32px 24px", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {(Object.entries(fontWeight) as [string, string][]).map(([key, weight]) => (
          <div key={key} style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
            <span style={{ width: 100, fontSize: 11, color: "#9CA3AF", fontFamily: "monospace", flexShrink: 0 }}>
              {key} ({weight})
            </span>
            <span style={{ fontSize: fontSize.xl, fontWeight: weight, fontFamily: fontFamily.sans, color: "#1A1A1A" }}>
              Mindthrone Design System
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "The five font weights available in the system." },
    },
  },
};

// ─── Font families ────────────────────────────────────────────────────────────

export const FontFamilies: StoryObj = {
  name: "Font Families",
  render: () => (
    <div style={{ padding: "32px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#6B7280", marginBottom: 12 }}>
          sans — Inter
        </div>
        <div style={{ fontFamily: fontFamily.sans, fontSize: 28, fontWeight: "600", color: "#1A1A1A", lineHeight: 1.3 }}>
          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
          abcdefghijklmnopqrstuvwxyz<br />
          0123456789 !@#$%&
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#6B7280", marginBottom: 12 }}>
          mono — Fira Code
        </div>
        <div style={{ fontFamily: fontFamily.mono, fontSize: 20, color: "#1A1A1A", lineHeight: 1.5 }}>
          const greeting = "Hello, world!";<br />
          {'function add(a: number, b: number) { return a + b; }'}<br />
          {`[1, 2, 3].map((n) => n * 2); // → [2, 4, 6]`}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "The two typefaces: Inter (sans) for UI copy, Fira Code (mono) for technical strings and code." },
    },
  },
};
