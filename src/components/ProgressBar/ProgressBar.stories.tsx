import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";
import type { MilestoneState } from "./ProgressBar";
import { palette } from "../../tokens/colors";
import { spacing } from "../../tokens/spacing";

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A responsive progress bar with optional milestone markers.",
          "",
          "| Prop | Purpose |",
          "|---|---|",
          "| `progress` | Fill amount from 0 to 1 |",
          "| `size` | Track thickness — `small` (8 px) or `large` (14 px) |",
          "| `milestones` | Array of milestone states — evenly distributed along the bar |",
          "| `animated` | Enables CSS transitions between states |",
          "",
          "**Milestone states:** `default`, `claimable`, `claimed`, `complete`",
          "",
          "Figma: [Progress Bar](https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=11032-186)",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    progress: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
    size: {
      control: "inline-radio",
      options: ["small", "large"],
    },
    animated: { control: "boolean" },
    animationDuration: { control: { type: "number", min: 0, max: 3000, step: 50 } },
    milestones: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const label: React.CSSProperties = {
  color: palette.neutral600,
  fontSize: 12,
  fontFamily: "sans-serif",
  marginBottom: spacing[1],
};

const row: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: spacing[3],
  maxWidth: 360,
};

// ─── Playground ──────────────────────────────────────────────────────────────

/** Fully controllable story — tweak every prop via Storybook controls. */
export const Playground: Story = {
  args: {
    progress: 0.5,
    size: "large",
    animated: true,
    animationDuration: 500,
    milestones: undefined,
    "aria-label": "Progress",
  },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <ProgressBar {...args} />
    </div>
  ),
};

// ─── Small ───────────────────────────────────────────────────────────────────

/** Small track (8 px) at several progress levels. */
export const Small: Story = {
  name: "Small",
  render: () => (
    <div style={row}>
      <div>
        <div style={label}>Empty</div>
        <ProgressBar progress={0} size="small" animated={false} />
      </div>
      <div>
        <div style={label}>30%</div>
        <ProgressBar progress={0.3} size="small" animated={false} />
      </div>
      <div>
        <div style={label}>80%</div>
        <ProgressBar progress={0.8} size="small" animated={false} />
      </div>
      <div>
        <div style={label}>Full</div>
        <ProgressBar progress={1} size="small" animated={false} />
      </div>
    </div>
  ),
};

// ─── Large ───────────────────────────────────────────────────────────────────

/** Large track (14 px) at several progress levels. */
export const Large: Story = {
  name: "Large",
  render: () => (
    <div style={row}>
      <div>
        <div style={label}>Empty</div>
        <ProgressBar progress={0} size="large" animated={false} />
      </div>
      <div>
        <div style={label}>30%</div>
        <ProgressBar progress={0.3} size="large" animated={false} />
      </div>
      <div>
        <div style={label}>80%</div>
        <ProgressBar progress={0.8} size="large" animated={false} />
      </div>
      <div>
        <div style={label}>Full</div>
        <ProgressBar progress={1} size="large" animated={false} />
      </div>
    </div>
  ),
};

// ─── With Milestones ─────────────────────────────────────────────────────────

/** Large bar with 3 milestones at progressive states. */
export const WithMilestones: Story = {
  name: "With milestones",
  render: () => (
    <div style={{ ...row, gap: spacing[6] }}>
      <div>
        <div style={label}>Empty — 3 milestones (all default)</div>
        <ProgressBar
          progress={0}
          size="large"
          milestones={["default", "default", "default"]}
          animated={false}
        />
      </div>
      <div>
        <div style={label}>1 reached — first complete</div>
        <ProgressBar
          progress={0.33}
          size="large"
          milestones={["complete", "default", "default"]}
          animated={false}
        />
      </div>
      <div>
        <div style={label}>2 reached — first claimed, second claimable</div>
        <ProgressBar
          progress={0.66}
          size="large"
          milestones={["claimed", "claimable", "default"]}
          animated={false}
        />
      </div>
      <div>
        <div style={label}>All reached — all claimed</div>
        <ProgressBar
          progress={1}
          size="large"
          milestones={["claimed", "claimed", "claimed"]}
          animated={false}
        />
      </div>
    </div>
  ),
};

// ─── Milestone States ────────────────────────────────────────────────────────

/** All four milestone states shown side-by-side. */
export const MilestoneStates: Story = {
  name: "Milestone states",
  render: () => {
    const states: MilestoneState[] = [
      "default",
      "complete",
      "claimable",
      "claimed",
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: spacing[6], maxWidth: 360 }}>
        {states.map((state) => (
          <div key={state}>
            <div style={label}>{state}</div>
            <ProgressBar
              progress={state === "default" ? 0 : 1}
              size="large"
              milestones={[state]}
              animated={false}
            />
          </div>
        ))}
      </div>
    );
  },
};

// ─── Animated ────────────────────────────────────────────────────────────────

/** Interactive demo — click the button to advance through milestone states. */
export const Animated: Story = {
  name: "Animated",
  parameters: {
    docs: {
      description: {
        story:
          'Click "Next step" to cycle through states. The fill and milestones animate smoothly.',
      },
    },
  },
  render: function AnimatedStory() {
    const steps: { progress: number; milestones: MilestoneState[] }[] = [
      { progress: 0, milestones: ["default", "default", "default"] },
      { progress: 0.33, milestones: ["claimable", "default", "default"] },
      { progress: 0.33, milestones: ["claimed", "default", "default"] },
      { progress: 0.66, milestones: ["claimed", "claimable", "default"] },
      { progress: 0.66, milestones: ["claimed", "claimed", "default"] },
      { progress: 1.0, milestones: ["claimed", "claimed", "claimable"] },
      { progress: 1.0, milestones: ["claimed", "claimed", "claimed"] },
    ];

    const [step, setStep] = useState(0);
    const current = steps[step];

    return (
      <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: spacing[4] }}>
        <ProgressBar
          progress={current.progress}
          size="large"
          milestones={current.milestones}
          animated
          animationDuration={600}
        />
        <div style={{ display: "flex", gap: spacing[2], alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) % steps.length)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Next step
          </button>
          <span style={{ ...label, marginBottom: 0 }}>
            Step {step + 1} / {steps.length}
          </span>
        </div>
      </div>
    );
  },
};

// ─── Auto Animated ───────────────────────────────────────────────────────────

/** Automatically cycles through progress values to demonstrate animation. */
export const AutoAnimated: Story = {
  name: "Auto animated",
  render: function AutoAnimatedStory() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 1 ? 0 : Math.min(p + 0.2, 1)));
      }, 1200);
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ ...row, gap: spacing[4] }}>
        <div>
          <div style={label}>Large — auto-cycling</div>
          <ProgressBar progress={progress} size="large" animated animationDuration={800} />
        </div>
        <div>
          <div style={label}>Small — auto-cycling</div>
          <ProgressBar progress={progress} size="small" animated animationDuration={800} />
        </div>
      </div>
    );
  },
};

// ─── All Variants ────────────────────────────────────────────────────────────

/** Visual matrix of all size × milestone combinations. */
export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing[8], maxWidth: 400 }}>
      {/* Standard bars */}
      <div>
        <div style={{ ...label, fontWeight: 700, fontSize: 13, marginBottom: spacing[2] }}>
          Standard (no milestones)
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3] }}>
          {(["small", "large"] as const).map((sz) => (
            <div key={sz}>
              <div style={label}>{sz} — 60%</div>
              <ProgressBar progress={0.6} size={sz} animated={false} />
            </div>
          ))}
        </div>
      </div>

      {/* With milestones — varying counts */}
      {[1, 2, 3].map((count) => (
        <div key={count}>
          <div style={{ ...label, fontWeight: 700, fontSize: 13, marginBottom: spacing[2] }}>
            {count} milestone{count > 1 ? "s" : ""}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing[3] }}>
            <div>
              <div style={label}>All default</div>
              <ProgressBar
                progress={0}
                size="large"
                milestones={Array.from({ length: count }, () => "default" as MilestoneState)}
                animated={false}
              />
            </div>
            <div>
              <div style={label}>Mixed states</div>
              <ProgressBar
                progress={0.5}
                size="large"
                milestones={Array.from({ length: count }, (_, i) => {
                  const options: MilestoneState[] = ["claimed", "claimable", "default"];
                  return options[Math.min(i, options.length - 1)];
                })}
                animated={false}
              />
            </div>
            <div>
              <div style={label}>All claimed</div>
              <ProgressBar
                progress={1}
                size="large"
                milestones={Array.from({ length: count }, () => "claimed" as MilestoneState)}
                animated={false}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
