import React, { useId, useLayoutEffect, useRef, useState } from "react";
import { palette, colors } from "../../tokens/colors";
import { Icon, CheckIcon, StarFillIcon } from "../../icons";

// ─── Figma reference ─────────────────────────────────────────────────────────
// Source: App — Core UI, "Progress Bar" section, node 11032:186
// https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=11032-186

// ─── Constants ───────────────────────────────────────────────────────────────

const TRACK_HEIGHT = { small: 8, large: 14 } as const;

/** Full milestone footprint — matches Figma `_Milestones` at 24 px used in the
 *  "Events Dialog" progress-bar variant. */
const MILESTONE_SIZE = 24;
const MILESTONE_RADIUS = MILESTONE_SIZE / 2;
const MILESTONE_ICON_SIZE = 16;

/** Radius of the circular cutout punched through the track around each
 *  milestone. 2 px larger than the milestone so there is a visible gap
 *  between the milestone and the track edge. */
const CUTOUT_GAP = 2;
const CUTOUT_RADIUS = MILESTONE_RADIUS + CUTOUT_GAP;

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

// ─── MilestoneCircle ─────────────────────────────────────────────────────────

const MilestoneCircle: React.FC<{
  state: MilestoneState;
  animated: boolean;
  duration: number;
}> = ({ state, animated, duration }) => {
  const transition = animated
    ? `background-color ${duration}ms ease-in-out, border-color ${duration}ms ease-in-out`
    : undefined;

  // Claimable renders as an outer pink ring + inner pink disc with a 2 px
  // transparent gap between them — matching the Figma "Claimable" symbol.
  if (state === "claimable") {
    return (
      <div
        style={{
          position: "relative",
          width: MILESTONE_SIZE,
          height: MILESTONE_SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `2px solid ${colors.actionPrimaryHover}`,
            boxSizing: "border-box",
            transition,
          }}
        />
        <div
          style={{
            position: "relative",
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: colors.actionPrimaryHover,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition,
          }}
        >
          <Icon
            svg={StarFillIcon}
            size={MILESTONE_ICON_SIZE}
            color={palette.yellow600}
          />
        </div>
      </div>
    );
  }

  // Default / claimed / complete — single 24 px disc.
  const isDefault = state === "default";
  const background = isDefault ? palette.neutralWhite : colors.actionPrimaryHover;
  const border = isDefault ? `1px solid ${TRACK_BORDER_COLOR}` : "none";

  const SvgIcon = state === "claimed" ? CheckIcon : StarFillIcon;
  const iconColor = (() => {
    if (state === "claimed") return palette.neutralWhite;
    if (state === "complete") return palette.yellow600;
    return palette.neutral600;
  })();

  return (
    <div
      style={{
        width: MILESTONE_SIZE,
        height: MILESTONE_SIZE,
        borderRadius: "50%",
        backgroundColor: background,
        border,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition,
      }}
    >
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
 * claimed, complete).
 *
 * When milestones are present, the track is rendered as an SVG with a mask
 * that punches circular cutouts at each milestone position — creating a
 * single unified rounded shape with circular "bumps" around each milestone.
 * The track border flows around these cutouts, matching the Figma design.
 *
 * The inner wrapper is inset by half a milestone on each side so the last
 * milestone's center sits at the track's right edge (no overflow), and
 * milestone positions scale proportionally as the bar's width changes.
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
  const rawId = useId().replace(/:/g, "");
  const maskId = `progressMask_${rawId}`;
  const pulseKeyframeName = `progressPulse_${rawId}`;

  const innerRef = useRef<HTMLDivElement>(null);
  const [innerWidth, setInnerWidth] = useState(0);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    // Seed with the initial offsetWidth so the first paint has valid geometry.
    setInnerWidth(el.offsetWidth);
    const ro = new ResizeObserver(([entry]) => {
      setInnerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const clampedProgress = Math.max(0, Math.min(1, progress));
  const trackHeight = TRACK_HEIGHT[size];
  const hasMilestones = !!milestones && milestones.length > 0;
  const containerHeight = hasMilestones ? MILESTONE_SIZE : trackHeight;
  const innerInset = hasMilestones ? MILESTONE_RADIUS : 0;
  const hasClaimable =
    hasMilestones && milestones!.some((s) => s === "claimable");

  // Milestone positions along the inner wrapper (px). The last milestone lands
  // at the wrapper's right edge; the wrapper itself is inset by MILESTONE_RADIUS
  // so the milestone's right edge aligns with the outer container's right edge.
  const milestonePositions = hasMilestones && innerWidth > 0
    ? milestones!.map((_, i) => ((i + 1) / milestones!.length) * innerWidth)
    : [];

  const fillClipPath = `polygon(0 0, ${clampedProgress * 100}% 0, ${clampedProgress * 100}% 100%, 0 100%)`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: containerHeight,
        ...styleProp,
      }}
      role="progressbar"
      aria-valuenow={Math.round(clampedProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      {hasClaimable && (
        <style>{`@keyframes ${pulseKeyframeName} { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.12); } }`}</style>
      )}

      <div
        ref={innerRef}
        style={{
          position: "absolute",
          left: innerInset,
          right: innerInset,
          top: 0,
          bottom: 0,
        }}
      >
        {/* Track — rendered as SVG so we can mask out circular cutouts around
            each milestone. Mask is applied to both the empty track (white
            + neutral border) and the progress fill. */}
        <svg
          width={innerWidth || "100%"}
          height={trackHeight}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            display: "block",
            overflow: "visible",
          }}
          aria-hidden
        >
          {hasMilestones && innerWidth > 0 && (
            <defs>
              <mask id={maskId}>
                {/* Base mask: show everything. Extend beyond the SVG bounds so
                    the stroke on the track rect isn't clipped by the mask. */}
                <rect
                  x={-CUTOUT_RADIUS}
                  y={-CUTOUT_RADIUS}
                  width={innerWidth + CUTOUT_RADIUS * 2}
                  height={trackHeight + CUTOUT_RADIUS * 2}
                  fill="white"
                />
                {/* Cutouts: hide a circular region at each milestone position. */}
                {milestonePositions.map((x, i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={trackHeight / 2}
                    r={CUTOUT_RADIUS}
                    fill="black"
                  />
                ))}
              </mask>
            </defs>
          )}

          {/* Empty track — white fill + 1px neutral border, with cutouts.
              strokeWidth="2" means only the inner 1 px is visible after the
              outer half is clipped by the SVG viewport — saves us from
              fractional positioning calcs. */}
          <rect
            x={0}
            y={0}
            width={innerWidth || "100%"}
            height={trackHeight}
            rx={trackHeight / 2}
            fill={palette.neutralWhite}
            stroke={TRACK_BORDER_COLOR}
            strokeWidth={2}
            mask={hasMilestones && innerWidth > 0 ? `url(#${maskId})` : undefined}
          />

          {/* Progress fill — pink. Width animates via CSS clip-path for smooth
              transitions; the same mask ensures cutouts propagate. */}
          <rect
            x={0}
            y={0}
            width={innerWidth || "100%"}
            height={trackHeight}
            rx={trackHeight / 2}
            fill={colors.actionPrimaryHover}
            mask={hasMilestones && innerWidth > 0 ? `url(#${maskId})` : undefined}
            style={{
              clipPath: fillClipPath,
              WebkitClipPath: fillClipPath,
              transition: animated
                ? `clip-path ${animationDuration}ms ease-in-out, -webkit-clip-path ${animationDuration}ms ease-in-out`
                : undefined,
            }}
          />
        </svg>

        {/* Milestones — positioned at proportional percentages of the inner
            wrapper. With translate(-50%, -50%) centering, the last milestone's
            center aligns with the track's right edge. */}
        {hasMilestones &&
          milestones!.map((state, i) => {
            const positionPct = ((i + 1) / milestones!.length) * 100;
            const isPulsing = state === "claimable";
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${positionPct}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                  animationName: isPulsing ? pulseKeyframeName : undefined,
                  animationDuration: isPulsing ? "1.6s" : undefined,
                  animationIterationCount: isPulsing ? "infinite" : undefined,
                  animationTimingFunction: isPulsing ? "ease-in-out" : undefined,
                }}
              >
                <MilestoneCircle
                  state={state}
                  animated={animated}
                  duration={animationDuration}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProgressBar;
