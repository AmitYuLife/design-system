import React, { useState } from "react";
import { colors, palette } from "../../tokens/colors";
import { radii } from "../../tokens/radii";
import { CheckIcon } from "../../icons";

// ─── Figma colour tokens ───────────────────────────────────────────────────────
// Source: App — Core UI, node 10200:2292
// https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=10200-2292

/** Checked fill — Primary/P700 */
const CHECKED_BG          = colors.actionPrimaryHover;  // palette.pink700 / #E30D76
/** Checked disabled fill — Primary/50 (#F9CEE4 — exact palette match) */
const CHECKED_DISABLED_BG = palette.pink200;             // #F9CEE4
/** Inactive border — closest available neutral to Figma's #838385 */
const INACTIVE_BORDER     = palette.neutral600;          // #5C5757
/** Inactive disabled border — Neutral/40 (#D9D9D7 — exact palette match) */
const INACTIVE_DISABLED_BORDER = palette.neutral400;     // #D9D9D7

/** Checkmark stroke colour */
const CHECK_COLOUR = palette.neutralWhite;               // #FFFFFF

// ─── Dimensions ───────────────────────────────────────────────────────────────

const BOX_SIZE    = 24;
/** Border size kept consistent across all states (transparent when checked). */
const BORDER_SIZE = 1.5;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Initial checked state for uncontrolled usage */
  defaultChecked?: boolean;
  /** Disables all interaction and applies muted styling */
  disabled?: boolean;
  /** Called with the new checked value whenever the checkbox changes */
  onChange?: (checked: boolean) => void;
  /** Inline style overrides on the root element */
  style?: React.CSSProperties;
  /** Accessible label — required when no visible label accompanies the checkbox */
  "aria-label"?: string;
  /** Associates the checkbox with a visible label element */
  "aria-labelledby"?: string;
}

// ─── Checkmark ────────────────────────────────────────────────────────────────

const Checkmark: React.FC<{ colour: string; visible: boolean }> = ({ colour, visible }) => (
  <span
    aria-hidden
    style={{
      display:       "flex",
      transform:     visible ? "scale(1)" : "scale(0)",
      opacity:       visible ? 1 : 0,
      transition:    [
        "transform 180ms cubic-bezier(0.4, 0, 0.2, 1)",
        "opacity 120ms ease",
      ].join(", "),
      pointerEvents: "none",
      color:         colour,
    }}
  >
    <CheckIcon width={16} height={16} />
  </span>
);

// ─── Checkbox ─────────────────────────────────────────────────────────────────

/**
 * Checkbox
 *
 * A 24×24 square checkbox matching the YuLife App Core UI design system.
 * Four visual states: Checked, Checked+Disabled, Inactive, Inactive+Disabled.
 *
 * The checkmark animates in with a spring-like scale and fades out smoothly.
 * The box background and border transition on every state change.
 *
 * Renders as `<button role="checkbox" aria-checked>` for accessibility.
 * Supports both controlled (`checked` + `onChange`) and uncontrolled
 * (`defaultChecked`) usage.
 *
 * Provide `aria-label` or `aria-labelledby` whenever there is no adjacent
 * visible label. To pair with a visible label, wrap both in a `<label>`:
 *
 * ```tsx
 * <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
 *   <Checkbox checked={done} onChange={setDone} />
 *   <span>Accept terms</span>
 * </label>
 * ```
 *
 * Figma reference: App — Core UI, node 10200:2292
 * https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=10200-2292
 */
export const Checkbox: React.FC<CheckboxProps> = ({
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
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  // ── Derived visual state ─────────────────────────────────────────────────────

  const bgColor: string = (() => {
    if (isChecked && disabled)  return CHECKED_DISABLED_BG;
    if (isChecked)              return CHECKED_BG;
    return palette.neutralWhite;
  })();

  // Border is always present; transparent when checked so the box size stays constant.
  const borderColor: string = (() => {
    if (isChecked)  return bgColor;           // matches bg — visually invisible
    if (disabled)   return INACTIVE_DISABLED_BORDER;
    return INACTIVE_BORDER;
  })();

  // The checkmark is white for active-checked; same pink as the disabled bg for disabled-checked.
  const checkColour = disabled ? palette.pink400 : CHECK_COLOUR;

  // ── Box ──────────────────────────────────────────────────────────────────────

  const boxStyle: React.CSSProperties = {
    position:        "relative",
    display:         "inline-flex",
    alignItems:      "center",
    justifyContent:  "center",
    flexShrink:      0,
    width:           BOX_SIZE,
    height:          BOX_SIZE,
    borderRadius:    radii.sm,
    border:          `${BORDER_SIZE}px solid ${borderColor}`,
    backgroundColor: bgColor,
    padding:         0,
    cursor:          disabled ? "not-allowed" : "pointer",
    outline:         "none",
    boxSizing:       "border-box",
    transition:      [
      "background-color 180ms ease",
      "border-color 180ms ease",
    ].join(", "),
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      style={{ ...boxStyle, ...styleProp }}
    >
      <Checkmark colour={checkColour} visible={isChecked} />
    </button>
  );
};

export default Checkbox;
