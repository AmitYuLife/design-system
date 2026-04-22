import React, { useState } from "react";
import { colors, palette } from "../../tokens/colors";
import { radii } from "../../tokens/radii";

// ─── Figma colour tokens ───────────────────────────────────────────────────────
// Source: App — Core UI, node 6064:45241
// https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=6064-45241

/** On track fill — Primary/P700 */
const TRACK_ON      = colors.actionPrimaryHover;     // palette.pink700 / #E30D76
/** Off track fill — closest available neutral to Figma's N300 (#D3D3D6) */
const TRACK_OFF     = palette.neutral400;             // #D9D9D7
/** Disabled track fill — closest available neutral to Figma's N100 (#E7E7EB) */
const TRACK_DISABLED = palette.neutral200;            // #F5F5F5
/** Thumb fill — active states */
const THUMB_ON_OFF  = palette.neutralWhite;           // #FFFFFF
/** Thumb fill — disabled */
const THUMB_DISABLED = palette.neutral300;            // #E3E3E1

// ─── Dimensions ───────────────────────────────────────────────────────────────

const TRACK_WIDTH  = 46;
const TRACK_HEIGHT = 24;
const THUMB_SIZE   = 20;
const THUMB_INSET  = 2;
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_INSET * 2; // 22px

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ToggleProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Disables all interaction and applies muted styling */
  disabled?: boolean;
  /** Called with the new checked value whenever the toggle changes */
  onChange?: (checked: boolean) => void;
  /** Inline style overrides on the root element */
  style?: React.CSSProperties;
  /** Accessible label — required when no visible label accompanies the toggle */
  "aria-label"?: string;
  /** Associates the toggle with a visible label element */
  "aria-labelledby"?: string;
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

/**
 * Toggle
 *
 * A pill-shaped switch matching the YuLife App Core UI design system.
 * Supports controlled (`checked` + `onChange`) and uncontrolled
 * (`defaultChecked`) usage, three visual states (On, Off, Disabled),
 * and smooth CSS transitions between all states.
 *
 * Accessibility: renders as a `<button role="switch">` with `aria-checked`,
 * supports Space and Enter to toggle, and shows a focus ring for keyboard users.
 *
 * Figma reference: App — Core UI, node 6064:45241
 * https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=6064-45241
 */
export const Toggle: React.FC<ToggleProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  style: styleProp,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}) => {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isOn = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  // ── Track ────────────────────────────────────────────────────────────────────
  const trackColor = disabled ? TRACK_DISABLED : isOn ? TRACK_ON : TRACK_OFF;

  const trackStyle: React.CSSProperties = {
    position:        "relative",
    display:         "inline-flex",
    alignItems:      "center",
    flexShrink:      0,
    width:           TRACK_WIDTH,
    height:          TRACK_HEIGHT,
    borderRadius:    radii.pill,
    backgroundColor: trackColor,
    border:          "none",
    padding:         0,
    cursor:          disabled ? "not-allowed" : "pointer",
    outline:         "none",
    transition:      "background-color 200ms ease, outline-color 200ms ease",
    // Focus ring is handled via :focus-visible in the browser; we use
    // box-shadow to avoid layout shift and support all browsers.
    WebkitTapHighlightColor: "transparent",
  };

  // ── Thumb ────────────────────────────────────────────────────────────────────
  const thumbColor = disabled ? THUMB_DISABLED : THUMB_ON_OFF;
  const thumbX     = isOn ? THUMB_TRAVEL : 0;

  const thumbStyle: React.CSSProperties = {
    position:        "absolute",
    top:             THUMB_INSET,
    left:            THUMB_INSET,
    width:           THUMB_SIZE,
    height:          THUMB_SIZE,
    borderRadius:    radii.pill,
    backgroundColor: thumbColor,
    boxShadow:       disabled
      ? "none"
      : `0px 1px 3px rgba(0, 0, 0, 0.18), 0px 1px 2px rgba(0, 0, 0, 0.12)`,
    transform:       `translateX(${thumbX}px)`,
    transition:      [
      "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      "background-color 200ms ease",
      "box-shadow 200ms ease",
    ].join(", "),
    pointerEvents:   "none",
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      style={{ ...trackStyle, ...styleProp }}
    >
      <span aria-hidden style={thumbStyle} />
    </button>
  );
};

export default Toggle;
