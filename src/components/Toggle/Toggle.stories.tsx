import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./Toggle";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Toggle

A pill-shaped switch for binary on/off settings, matching the YuLife App Core UI design system.

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
<Toggle defaultChecked onChange={(on) => console.log(on)} aria-label="Enable notifications" />

// Controlled
const [on, setOn] = useState(false);
<Toggle checked={on} onChange={setOn} aria-label="Enable notifications" />
\`\`\`

### Accessibility

Renders as \`<button role="switch" aria-checked>\`. Togglable with **Space** or **Enter**.
Provide \`aria-label\` or \`aria-labelledby\` whenever there is no adjacent visible label.

### Figma reference

[App — Core UI, node 6064-45241](https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=6064-45241)
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
    "aria-label": "Toggle",
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Default uncontrolled toggle — starts On and can be clicked to toggle.
 */
export const Default: Story = {
  args: {
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: { story: "Uncontrolled toggle, starts in the On state. Click to toggle." },
    },
  },
};

// ─── Off ──────────────────────────────────────────────────────────────────────

/**
 * Toggle in the Off state.
 */
export const Off: Story = {
  args: {
    defaultChecked: false,
  },
  parameters: {
    docs: {
      description: { story: "Uncontrolled toggle starting in the Off state." },
    },
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

/**
 * Both disabled states side-by-side — On (disabled) and Off (disabled).
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Toggle checked disabled aria-label="Disabled on" />
      <Toggle checked={false} disabled aria-label="Disabled off" />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Disabled state — no interaction possible. Shown checked (left) and unchecked (right)." },
    },
  },
};

// ─── All states ───────────────────────────────────────────────────────────────

/**
 * All three states — On, Off, and Disabled — shown side-by-side.
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Toggle checked aria-label="On" />
        <span style={{ fontSize: 11, fontFamily: "sans-serif", color: "#5A5A5C" }}>On</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Toggle checked={false} aria-label="Off" />
        <span style={{ fontSize: 11, fontFamily: "sans-serif", color: "#5A5A5C" }}>Off</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Toggle checked={false} disabled aria-label="Disabled" />
        <span style={{ fontSize: 11, fontFamily: "sans-serif", color: "#5A5A5C" }}>Disabled</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "All three visual states from the Figma design side-by-side." },
    },
  },
};

// ─── Controlled ───────────────────────────────────────────────────────────────

/**
 * Controlled toggle — state is managed externally via `useState`.
 */
export const Controlled: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Toggle
          checked={on}
          onChange={setOn}
          aria-label="Controlled toggle"
        />
        <span style={{ fontSize: 13, fontFamily: "sans-serif", color: "#5A5A5C" }}>
          {on ? "On" : "Off"}
        </span>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled usage: `checked` and `onChange` are both provided. The label reflects the current state.",
      },
    },
  },
};

// ─── With label ───────────────────────────────────────────────────────────────

/**
 * Toggle paired with an adjacent text label — the label click also toggles.
 */
export const WithLabel: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <label
        htmlFor="notifications-toggle"
        style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
      >
        <Toggle
          checked={on}
          onChange={setOn}
          aria-labelledby="notifications-label"
        />
        <span
          id="notifications-label"
          style={{ fontSize: 14, fontFamily: "sans-serif", color: "#464647" }}
        >
          Enable notifications
        </span>
      </label>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Toggle paired with a visible label. Uses `aria-labelledby` instead of `aria-label`.",
      },
    },
  },
};
