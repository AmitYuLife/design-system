import React, { useId } from "react";
import { palette, colors } from "../../tokens/colors";
import { radii } from "../../tokens/radii";
import { Icon, CheckIcon, StarFillIcon } from "../../icons";

// ─── Figma reference ─────────────────────────────────────────────────────────
// Source: App — Core UI, "Progress Bar" section, node 11032:186
// https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=11032-186

// ─── Constants ───────────────────────────────────────────────────────────────

const TRACK_HEIGHT = { small: 8, large: 14 } as const;
const MILESTONE_SIZE = 24;
const MILESTONE_ICON_SIZE = 16;

const TRACK_BORDER_COLOR = "#D3D3D6";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProgressBarSize = "small" | "large";
export type MilestoneState = "default" | "claimable" | "claimed" | "complete";

export interface ProgressBarProps {
  /** Progress from 0 to 1 */
  progress: number;
  /** Track height: small = 8 px, large = 14 px */
  size?: ProgressBarSize;
  /** Milestone states — auto-distributed evenly along the bar */
  milestones?: MilestoneState[];
  /** Animate progress and state changes via CSS transitions */
  animated?: boolean;
  /** Transition duration in ms @default 500 */
  animationDuration?: number;
  /** Inline style overrides applied to the outer container */
  style?: React.CSSProperties;
  /** Accessible label */
  "aria-label"?: string;
}

// ─── Milestone helpers ───────────────────────────────────────────────────────

function getMilestoneStyles(state: MilestoneState): {
  background: string;
  border: string;
  iconColor: string;
} {
  switch (state) {
    case "claimable":
      return {
        background: palette.yellow600,
        border: "none",
        iconColor: palette.neutralWhite,
      };
    case "claimed":
      return {
        background: colors.actionPrimaryHover,
        border: "none",
        iconColor: palette.neutralWhite,
      };
    case "complete":
      return {
        background: colors.actionPrimaryHover,
        border: "none",
        iconColor: palette.neutralWhite,
      };
    case "default":
    default:
      return {
        background: palette.neutralWhite,
        border: `1px solid ${TRACK_BORDER_COLOR}`,
        iconColor: palette.neutral400,
      };
  }
}

const MilestoneCircle: React.FC<{
  state: MilestoneState;
  animated: boolean;
  duration: number;
  pulseClass?: string;
}> = ({ state, animated, duration, pulseClass }) => {
  const { background, border, iconColor } = getMilestoneStyles(state);

  const circleStyle: React.CSSProperties = {
    width: MILESTONE_SIZE,
    height: MILESTONE_SIZE,
    borderRadius: radii.pill,
    backgroundColor: background,
    border,
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: animated
      ? `background-color ${duration}ms ease-in-out, border-color ${duration}ms ease-in-out`
      : undefined,
  };

  if (state === "claimable" && pulseClass) {
    Object.assign(circleStyle, {
      animationName: pulseClass,
      animationDuration: "1.6s",
      animationIterationCount: "infinite",
      animationTimingFunction: "ease-in-out",
    });
  }

  const SvgIcon = state === "claimed" ? CheckIcon : StarFillIcon;

  return (
    <div style={circleStyle}>
      <Icon svg={SvgIcon} size={MILESTONE_ICON_SIZE} color={iconColor} />
    </div>
  );
};

// ─── ProgressBar ─────────────────────────────────────────────────────────────

/**
 * ProgressBar
 *
 * A responsive progress bar with optional milestone markers. Supports two
 * track sizes (small / large) and four milestone states (default, claimable,
 * claimed, complete). The fill and milestones animate between states via CSS
 * transitions when `animated` is true.
 *
 * Milestones are evenly distributed along the bar. The component fills its
 * parent width, so milestone positions scale proportionally at any size.
 *
 * Figma reference: App — Core UI, node 11032:186
 * https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=11032-186
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = "large",
  milestones,
  animated = true,
  animationDuration = 500,
  style: styleProp,
  "aria-label": ariaLabel,
}) => {
  const keyframeId = useId().replace(/:/g, "");
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const trackHeight = TRACK_HEIGHT[size];
  const hasMilestones = milestones && milestones.length > 0;
  const containerHeight = hasMilestones ? MILESTONE_SIZE : trackHeight;
  const trackTop = hasMilestones ? (MILESTONE_SIZE - trackHeight) / 2 : 0;

  // Horizontal padding so the track doesn't extend behind the outermost milestones.
  // Each milestone center sits at (i+1)/N * 100%. The last one is at 100% so we
  // inset half a milestone so its center aligns with the track's visual end.
  const trackInset = hasMilestones ? MILESTONE_SIZE / 2 : 0;

  const pulseKeyframeName = `progressPulse_${keyframeId}`;

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: containerHeight,
    ...styleProp,
  };

  const trackStyle: React.CSSProperties = {
    position: "absolute",
    top: trackTop,
    left: trackInset,
    right: trackInset,
    height: trackHeight,
    backgroundColor: palette.neutralWhite,
    border: `1px solid ${TRACK_BORDER_COLOR}`,
    borderRadius: radii.pill,
    boxSizing: "border-box",
    overflow: "hidden",
  };

  const fillStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: `${clampedProgress * 100}%`,
    backgroundColor: colors.actionPrimaryHover,
    borderRadius: radii.pill,
    transition: animated
      ? `width ${animationDuration}ms ease-in-out`
      : undefined,
  };

  const needsPulseKeyframe =
    hasMilestones && milestones!.some((s) => s === "claimable");

  return (
    <div
      style={containerStyle}
      role="progressbar"
      aria-valuenow={Math.round(clampedProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      {needsPulseKeyframe && (
        <style>{`@keyframes ${pulseKeyframeName} { 0%, 100% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.15); } }`}</style>
      )}

      {/* Track */}
      <div style={trackStyle}>
        {/* Fill */}
        <div style={fillStyle} />
      </div>

      {/* Milestones */}
      {hasMilestones &&
        milestones!.map((state, i) => {
          const position = ((i + 1) / milestones!.length) * 100;
          const milestoneStyle: React.CSSProperties = {
            position: "absolute",
            top: 0,
            left: `${position}%`,
            transform: "translateX(-50%)",
            zIndex: 1,
          };

          if (state === "claimable") {
            milestoneStyle.animationName = pulseKeyframeName;
            milestoneStyle.animationDuration = "1.6s";
            milestoneStyle.animationIterationCount = "infinite";
            milestoneStyle.animationTimingFunction = "ease-in-out";
          }

          return (
            <div key={i} style={milestoneStyle}>
              <MilestoneCircle
                state={state}
                animated={animated}
                duration={animationDuration}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ProgressBar;
