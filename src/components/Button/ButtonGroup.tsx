import React from "react";
import { spacing } from "../../tokens/spacing";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ButtonGroupProps {
  /**
   * Button components to render.
   *
   * In **horizontal** mode each child shares the available width equally
   * (`flex: 1`). In **vertical** mode each child stretches to full width.
   */
  children: React.ReactNode;
  /**
   * Layout direction.
   *
   * - `"vertical"` (default) — buttons stack top-to-bottom at full width.
   * - `"horizontal"` — buttons sit side-by-side and share width equally.
   */
  direction?: "horizontal" | "vertical";
  /**
   * When `true`, renders a gradient background that fades from opaque white at
   * the bottom to fully transparent white at the top. Only applies when
   * `direction` is `"vertical"`. Use this when the button group is pinned to
   * the bottom of a scrollable area so it visually lifts out of the content
   * below it without a hard edge.
   */
  pinned?: boolean;
  /** Inline style overrides for the root element. */
  style?: React.CSSProperties;
}

// ─── ButtonGroup ──────────────────────────────────────────────────────────────

/**
 * ButtonGroup
 *
 * A layout wrapper that arranges `Button` components in either a vertical stack
 * (full-width, default) or a horizontal row (equal-width sharing). Uses the
 * same `spacing[4]` (16px) gap token as `TileGroup` for visual consistency.
 *
 * The optional `pinned` variant adds a white gradient background (opaque at
 * the bottom, transparent at the top) so the group can float above scrollable
 * content without a hard divider line.
 *
 * Figma reference: YuLife App Storybook → ButtonGroup
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  direction = "vertical",
  pinned = false,
  style,
}) => {
  const isVertical = direction === "vertical";
  const showGradient = pinned && isVertical;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        width: "100%",
        gap: spacing[4],
        alignItems: isVertical ? "stretch" : "center",
        ...(showGradient && {
          background:
            "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          paddingTop: spacing[8],
        }),
        ...style,
      }}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        return (
          <div
            style={
              isVertical
                ? { width: "100%" }
                : { flex: "1 0 0", minWidth: 0 }
            }
          >
            {React.cloneElement(child as React.ReactElement<any>, {
              style: {
                ...(child.props as any).style,
                width: "100%",
              },
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
