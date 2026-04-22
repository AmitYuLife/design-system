import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./Radio";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Radio> = {
  title: "Components/Radio/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## Radio

The bare 24×24 radio knob from the YuLife App Core UI design system. Three visual states:
Active (pink ring + animated center dot), Inactive (gray ring), and Disabled.

For standard usage in a form, prefer [\`RadioGroup\`](?path=/docs/components-radiogroup--docs),
which handles selection state, group semantics, and keyboard navigation automatically.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`checked\` | \`boolean\` | — | Controlled checked state |
| \`defaultChecked\` | \`boolean\` | \`false\` | Initial state for uncontrolled usage |
| \`disabled\` | \`boolean\` | \`false\` | Prevents interaction, applies muted styling |
| \`onChange\` | \`() => void\` | — | Called when the radio is activated |
| \`aria-label\` | \`string\` | — | Accessible label |

### Accessibility

Renders as \`<button role="radio" aria-checked>\`. Use \`aria-label\` or \`aria-labelledby\`
to describe the option.

### Figma reference

[App — Core UI, node 11035-1411](https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=11035-1411)
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
      description: "Disables interaction and applies muted styling.",
    },
    onChange: { action: "changed" },
    "aria-label": {
      control: "text",
      description: "Accessible label.",
    },
  },
  args: {
    "aria-label": "Radio option",
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// ─── Active ───────────────────────────────────────────────────────────────────

/**
 * Active state — the radio is selected.
 */
export const Active: Story = {
  args: {
    checked: true,
  },
  parameters: {
    docs: {
      description: { story: "Active (selected) state — pink ring with animated center dot." },
    },
  },
};

// ─── Inactive ─────────────────────────────────────────────────────────────────

/**
 * Inactive state — the radio is unselected.
 */
export const Inactive: Story = {
  args: {
    checked: false,
  },
  parameters: {
    docs: {
      description: { story: "Inactive (unselected) state — gray ring, no center dot." },
    },
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

/**
 * Disabled state — no interaction possible.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    checked: false,
  },
  parameters: {
    docs: {
      description: { story: "Disabled — muted ring, `not-allowed` cursor, no interaction." },
    },
  },
};

// ─── All states ───────────────────────────────────────────────────────────────

/**
 * All three states — Active, Inactive, and Disabled — matching the Figma reference frame.
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Radio checked aria-label="Active" />
        <span style={{ fontSize: 11, fontFamily: "sans-serif", color: "#5A5A5C" }}>Active</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Radio checked={false} aria-label="Inactive" />
        <span style={{ fontSize: 11, fontFamily: "sans-serif", color: "#5A5A5C" }}>Inactive</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Radio checked={false} disabled aria-label="Disabled" />
        <span style={{ fontSize: 11, fontFamily: "sans-serif", color: "#5A5A5C" }}>Disabled</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "All three visual states side-by-side, matching the Figma design." },
    },
  },
};
