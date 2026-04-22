import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";
import { textStyles } from "../../tokens/typography";
import { colors } from "../../tokens/colors";
import { spacing } from "../../tokens/spacing";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Checkbox

A 24×24 square checkbox matching the YuLife App Core UI design system.
Four visual states: Checked, Checked+Disabled, Inactive, and Inactive+Disabled.

The checkmark animates in with a spring-like scale and fades out on uncheck.
The box background and border transition smoothly on every state change.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`checked\` | \`boolean\` | — | Controlled checked state |
| \`defaultChecked\` | \`boolean\` | \`false\` | Initial state for uncontrolled usage |
| \`disabled\` | \`boolean\` | \`false\` | Prevents interaction, applies muted styling |
| \`onChange\` | \`(checked: boolean) => void\` | — | Called with the new value on change |
| \`aria-label\` | \`string\` | — | Accessible label (required without a visible label) |

### Usage

\`\`\`tsx
// Uncontrolled
<Checkbox defaultChecked onChange={(on) => console.log(on)} aria-label="Accept terms" />

// Controlled
const [on, setOn] = useState(false);
<Checkbox checked={on} onChange={setOn} aria-label="Accept terms" />

// Paired with a visible label
<label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
  <Checkbox checked={on} onChange={setOn} />
  <span>Accept terms and conditions</span>
</label>
\`\`\`

### Accessibility

Renders as \`<button role="checkbox" aria-checked>\`. Togglable with **Space** or **Enter**.
Pair with a visible label using \`<label>\` or supply \`aria-label\` / \`aria-labelledby\`.

### Figma reference

[App — Core UI, node 10200-2292](https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=10200-2292)
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Controlled checked state.",
    },
    defaultChecked: {
      control: "boolean",
      description: "Initial state for uncontrolled usage.",
    },
    disabled: {
      control: "boolean",
      description: "Disables all interaction and applies muted styling.",
    },
    onChange: { action: "changed" },
    "aria-label": {
      control: "text",
      description: "Accessible label.",
    },
  },
  args: {
    "aria-label": "Checkbox",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ─── Checked ──────────────────────────────────────────────────────────────────

/**
 * Checked — the pink active state.
 */
export const Checked: Story = {
  args: { checked: true },
  parameters: {
    docs: { description: { story: "Checked state — pink fill with white checkmark." } },
  },
};

// ─── Unchecked ────────────────────────────────────────────────────────────────

/**
 * Unchecked (Inactive) — white box with gray border.
 */
export const Unchecked: Story = {
  args: { checked: false },
  parameters: {
    docs: { description: { story: "Inactive (unchecked) state — white box with gray border." } },
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

/**
 * Both disabled states — Checked+Disabled and Inactive+Disabled side-by-side.
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Checkbox checked disabled aria-label="Checked disabled" />
      <Checkbox checked={false} disabled aria-label="Unchecked disabled" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled states — Checked+Disabled (left) uses a muted pink fill; Inactive+Disabled (right) uses a muted border.",
      },
    },
  },
};

// ─── All states ───────────────────────────────────────────────────────────────

/**
 * All four states matching the Figma reference frame.
 */
export const AllStates: Story = {
  render: () => {
    const states: Array<{ label: string; checked: boolean; disabled: boolean }> = [
      { label: "Checked",           checked: true,  disabled: false },
      { label: "Checked (disabled)", checked: true,  disabled: true  },
      { label: "Inactive",          checked: false, disabled: false },
      { label: "Inactive (disabled)", checked: false, disabled: true  },
    ];
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {states.map(({ label, checked, disabled }) => (
          <div
            key={label}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
          >
            <Checkbox checked={checked} disabled={disabled} aria-label={label} />
            <span style={{ fontSize: 11, fontFamily: "sans-serif", color: "#5A5A5C", textAlign: "center" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All four visual states from the Figma design side-by-side.",
      },
    },
  },
};

// ─── Interactive ──────────────────────────────────────────────────────────────

/**
 * Uncontrolled interactive checkbox — click to toggle.
 */
export const Interactive: Story = {
  args: {
    defaultChecked: false,
  },
  parameters: {
    docs: { description: { story: "Uncontrolled — click or press Space/Enter to toggle." } },
  },
};

// ─── Controlled ───────────────────────────────────────────────────────────────

/**
 * Controlled checkbox — state managed externally via `useState`.
 */
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Checkbox checked={checked} onChange={setChecked} aria-label="Controlled checkbox" />
        <span style={{ fontSize: 13, fontFamily: "sans-serif", color: "#5A5A5C" }}>
          {checked ? "Checked" : "Unchecked"}
        </span>
      </div>
    );
  },
  parameters: {
    docs: {
      description: { story: "Controlled usage — `checked` and `onChange` are both provided." },
    },
  },
};

// ─── With label ───────────────────────────────────────────────────────────────

/**
 * Composed with a visible label using a `<label>` element.
 * Clicking the label text also toggles the checkbox.
 */
export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const labelTs = textStyles.body2Regular;
    return (
      <label
        style={{ display: "flex", alignItems: "center", gap: spacing[3], cursor: "pointer" }}
      >
        <Checkbox checked={checked} onChange={setChecked} />
        <span
          style={{
            ...labelTs,
            lineHeight:    `${labelTs.lineHeight}px`,
            letterSpacing: `${labelTs.letterSpacing}px`,
            color:         colors.textPrimary,
            userSelect:    "none",
          }}
        >
          Accept terms and conditions
        </span>
      </label>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Composed with a `<label>` wrapper — clicking the text toggles the checkbox. Uses `textStyles.body2Regular` and `colors.textPrimary`.",
      },
    },
  },
};

// ─── Checklist ────────────────────────────────────────────────────────────────

/**
 * A practical multi-item checklist demonstrating independent state per checkbox.
 */
export const Checklist: Story = {
  render: () => {
    const items = [
      "Personal details",
      "Payment information",
      "Terms and conditions",
      "Marketing preferences",
    ];
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const labelTs = textStyles.body2Regular;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: spacing[4] }}>
        {items.map((item) => (
          <label
            key={item}
            style={{ display: "flex", alignItems: "center", gap: spacing[3], cursor: "pointer" }}
          >
            <Checkbox
              checked={!!checked[item]}
              onChange={(val) => setChecked((prev) => ({ ...prev, [item]: val }))}
            />
            <span
              style={{
                ...labelTs,
                lineHeight:    `${labelTs.lineHeight}px`,
                letterSpacing: `${labelTs.letterSpacing}px`,
                color:         checked[item] ? colors.textPrimary : colors.textSecondary,
                userSelect:    "none",
                transition:    "color 180ms ease",
              }}
            >
              {item}
            </span>
          </label>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Multi-item checklist — each checkbox manages its own state independently. The label colour transitions when checked.",
      },
    },
  },
};
