import React, { useState } from "react";
import { colors, palette } from "../../../tokens/colors";
import { radii } from "../../../tokens/radii";

// ─── Figma colour tokens ───────────────────────────────────────────────────────
// Source: App — Core UI, node 11035:1411
// https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=11035-1411

/** Active ring and center dot fill — Primary/P700 */
const RING_ACTIVE    = colors.actionPrimaryHover;  // palette.pink700 / #E30D76
/** Inactive ring — closest available neutral to Figma's N300 (#D3D3D6) */
const RING_INACTIVE  = palette.neutral400;          // #D9D9D7
/** Disabled ring — closest available neutral to Figma's N100 (#E7E7EB) */
const RING_DISABLED  = palette.neutral300;          // #E3E3E1

/** Background fill — active/inactive */
const BG_DEFAULT  = palette.neutralWhite;           // #FFFFFF
/** Background fill — disabled */
const BG_DISABLED = palette.neutral200;             // #F5F5F5

// ─── Dimensions ───────────────────────────────────────────────────────────────

const KNOB_SIZE   = 24;
const BORDER_SIZE = 2;
/** Center dot diameter. Sits inside the 20px inner area (KNOB_SIZE - 2×BORDER_SIZE). */
const DOT_SIZE    = 10;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RadioProps {
  /** Whether the radio is selected */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Disables all interaction and applies muted styling */
  disabled?: boolean;
  /** Called when the radio is activated */
  onChange?: () => void;
  /** Inline style overrides on the root element */
  style?: React.CSSProperties;
  /** Accessible label — required when no visible label accompanies the radio */
  "aria-label"?: string;
  /** Associates the radio with a visible label element */
  "aria-labelledby"?: string;
  /** tabIndex override — used by RadioGroup for roving focus management */
  tabIndex?: number;
  /** Internal ref forwarded by RadioGroup for keyboard navigation */
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
  /** keyDown handler — used by RadioGroup to intercept arrow keys */
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

// ─── Radio ────────────────────────────────────────────────────────────────────

/**
 * Radio
 *
 * The bare 24×24 radio knob from the YuLife App Core UI design system.
 * Three visual states: Active (pink ring + center dot), Inactive (gray ring),
 * and Disabled (muted ring, no interaction).
 *
 * Renders as `<button role="radio" aria-checked>` for accessibility.
 * Supports both controlled (`checked` + `onChange`) and uncontrolled
 * (`defaultChecked`) usage.
 *
 * For typical usage, prefer `RadioGroup` which handles selection state, group
 * semantics, and keyboard navigation automatically.
 *
 * Figma reference: App — Core UI, node 11035:1411
 * https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=11035-1411
 */
export const Radio: React.FC<RadioProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  style: styleProp,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  tabIndex,
  buttonRef,
  onKeyDown: onKeyDownProp,
}) => {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleClick = () => {
    if (disabled || isChecked) return;
    if (!isControlled) setInternalChecked(true);
    onChange?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDownProp?.(e);
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  // ── Ring ─────────────────────────────────────────────────────────────────────
  const ringColor = disabled ? RING_DISABLED : isChecked ? RING_ACTIVE : RING_INACTIVE;
  const bgColor   = disabled ? BG_DISABLED : BG_DEFAULT;

  const knobStyle: React.CSSProperties = {
    position:        "relative",
    display:         "inline-flex",
    alignItems:      "center",
    justifyContent:  "center",
    flexShrink:      0,
    width:           KNOB_SIZE,
    height:          KNOB_SIZE,
    borderRadius:    radii.pill,
    border:          `${BORDER_SIZE}px solid ${ringColor}`,
    backgroundColor: bgColor,
    padding:         0,
    cursor:          disabled ? "not-allowed" : isChecked ? "default" : "pointer",
    outline:         "none",
    boxSizing:       "border-box",
    transition:      "border-color 200ms ease, background-color 200ms ease",
    WebkitTapHighlightColor: "transparent",
  };

  // ── Center dot ───────────────────────────────────────────────────────────────
  const dotStyle: React.CSSProperties = {
    width:           DOT_SIZE,
    height:          DOT_SIZE,
    borderRadius:    radii.pill,
    backgroundColor: disabled ? RING_DISABLED : RING_ACTIVE,
    transform:       isChecked ? "scale(1)" : "scale(0)",
    opacity:         isChecked ? 1 : 0,
    transition:      [
      "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      "opacity 150ms ease",
    ].join(", "),
    pointerEvents:   "none",
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
      tabIndex={tabIndex}
      ref={buttonRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ ...knobStyle, ...styleProp }}
    >
      <span aria-hidden style={dotStyle} />
    </button>
  );
};

export default Radio;
