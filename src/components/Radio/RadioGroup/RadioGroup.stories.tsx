import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./RadioGroup";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Radio/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## RadioGroup

A vertically stacked set of radio options matching the YuLife App Core UI "Radio Item" design.
Each row shows a 24×24 radio knob alongside a Body 2 Regular label.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`options\` | \`RadioOption[]\` | — | Array of \`{ value, label, disabled? }\` |
| \`value\` | \`string\` | — | Controlled selected value |
| \`defaultValue\` | \`string\` | — | Initial value for uncontrolled usage |
| \`onChange\` | \`(value: string) => void\` | — | Called with the new value on change |
| \`disabled\` | \`boolean\` | \`false\` | Disables all options in the group |
| \`aria-label\` | \`string\` | — | Accessible group label |

### Keyboard navigation

Arrow keys (↑ ↓ ← →) navigate between options and select the focused one.
Only the active option is in the tab stop (roving tabIndex pattern).

### Figma reference

[App — Core UI, node 11035-1411](https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=11035-1411)
        `,
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disables all options in the group.",
    },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// ─── Shared options ───────────────────────────────────────────────────────────

const PLAN_OPTIONS = [
  { value: "basic",    label: "Basic" },
  { value: "standard", label: "Standard" },
  { value: "premium",  label: "Premium" },
];

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Uncontrolled group with a default selection.
 */
export const Default: Story = {
  args: {
    options:      PLAN_OPTIONS,
    defaultValue: "standard",
    "aria-label": "Plan",
  },
  parameters: {
    docs: {
      description: { story: "Uncontrolled group — `defaultValue` sets the initial selection. Click or use arrow keys to change." },
    },
  },
};

// ─── No selection ─────────────────────────────────────────────────────────────

/**
 * Group with no initial selection.
 */
export const NoSelection: Story = {
  args: {
    options:      PLAN_OPTIONS,
    "aria-label": "Plan",
  },
  parameters: {
    docs: {
      description: { story: "No initial selection — all options appear in the Inactive state." },
    },
  },
};

// ─── Disabled group ───────────────────────────────────────────────────────────

/**
 * All options disabled at the group level.
 */
export const DisabledGroup: Story = {
  args: {
    options:      PLAN_OPTIONS,
    defaultValue: "basic",
    disabled:     true,
    "aria-label": "Plan",
  },
  parameters: {
    docs: {
      description: { story: "Group-level `disabled` disables every option." },
    },
  },
};

// ─── Mixed disabled ───────────────────────────────────────────────────────────

/**
 * Individual options can be disabled independently.
 */
export const MixedDisabled: Story = {
  args: {
    options: [
      { value: "basic",    label: "Basic" },
      { value: "standard", label: "Standard (unavailable)", disabled: true },
      { value: "premium",  label: "Premium" },
    ],
    defaultValue: "basic",
    "aria-label": "Plan",
  },
  parameters: {
    docs: {
      description: { story: "Per-option `disabled` flag — only the Standard option is unavailable." },
    },
  },
};

// ─── Controlled ───────────────────────────────────────────────────────────────

/**
 * Controlled group — value managed externally via `useState`.
 */
export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState("basic");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <RadioGroup
          options={PLAN_OPTIONS}
          value={selected}
          onChange={setSelected}
          aria-label="Plan"
        />
        <p style={{ fontSize: 13, fontFamily: "sans-serif", color: "#5A5A5C", margin: 0 }}>
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled usage — `value` and `onChange` are both provided. The current selection is displayed below.",
      },
    },
  },
};

// ─── All states ───────────────────────────────────────────────────────────────

/**
 * Matches the Figma reference frame — Active, Disabled, and Inactive items in one group.
 */
export const AllStates: Story = {
  args: {
    options: [
      { value: "active",   label: "Label here" },
      { value: "disabled", label: "Label here", disabled: true },
      { value: "inactive", label: "Label here" },
    ],
    value:        "active",
    "aria-label": "Example",
  },
  parameters: {
    docs: {
      description: {
        story: "Mirrors the Figma reference frame — Active (top), Disabled (middle), Inactive (bottom).",
      },
    },
  },
};
