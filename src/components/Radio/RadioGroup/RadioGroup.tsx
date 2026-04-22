import React, { useRef, useState } from "react";
import { palette, colors } from "../../../tokens/colors";
import { textStyles } from "../../../tokens/typography";
import { spacing } from "../../../tokens/spacing";
import { Radio } from "../Radio/Radio";

// ─── Figma colour tokens ───────────────────────────────────────────────────────
// Source: App — Core UI, node 11035:1411

/** Label colour for active / inactive items — closest to Figma's #6E6E70 */
const LABEL_DEFAULT  = colors.textPrimary;        // palette.neutral700 / #464647
/** Label colour for disabled items — closest to Figma's #ABABAD */
const LABEL_DISABLED = palette.neutral500;         // #A0A09B

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RadioOption {
  /** Unique value for this option */
  value: string;
  /** Visible label rendered beside the radio knob */
  label: React.ReactNode;
  /** Disables just this option, regardless of the group's `disabled` prop */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** The options to display */
  options: RadioOption[];
  /** Controlled selected value */
  value?: string;
  /** Initial selected value for uncontrolled usage */
  defaultValue?: string;
  /** Called with the new value when selection changes */
  onChange?: (value: string) => void;
  /** Disables all options in the group */
  disabled?: boolean;
  /** Inline style overrides on the root element */
  style?: React.CSSProperties;
  /** Accessible label for the group — required when no visible heading is nearby */
  "aria-label"?: string;
  /** Associates the group with a visible heading element */
  "aria-labelledby"?: string;
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

/**
 * RadioGroup
 *
 * A vertically stacked set of radio options matching the YuLife App Core UI
 * "Radio Item" design. Each row shows a 24×24 radio knob beside a body-2
 * text label.
 *
 * Keyboard navigation follows the ARIA radio group pattern:
 * - Arrow Down / Right — select the next enabled option and move focus
 * - Arrow Up / Left    — select the previous enabled option and move focus
 * - Tab                — moves focus to the selected option (or first enabled)
 *
 * Supports controlled (`value` + `onChange`) and uncontrolled (`defaultValue`)
 * usage. Per-option `disabled` is respected independently of the group-level
 * `disabled` prop.
 *
 * Figma reference: App — Core UI, node 11035:1411
 * https://www.figma.com/design/aNnODOQlMlk38LrQVs63oq/App---Core-UI?node-id=11035-1411
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled: groupDisabled = false,
  style: styleProp,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const selectedValue = isControlled ? controlledValue : internalValue;

  // One ref per option for roving focus management.
  const buttonRefs = useRef<(React.RefObject<HTMLButtonElement | null>)[]>(
    options.map(() => React.createRef<HTMLButtonElement>()),
  );

  const enabledIndexes = options.reduce<number[]>((acc, opt, i) => {
    if (!opt.disabled && !groupDisabled) acc.push(i);
    return acc;
  }, []);

  const handleSelect = (optionValue: string) => {
    if (!isControlled) setInternalValue(optionValue);
    onChange?.(optionValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowRight" &&
        e.key !== "ArrowUp"   && e.key !== "ArrowLeft") return;

    e.preventDefault();

    const pos = enabledIndexes.indexOf(currentIndex);
    if (pos === -1) return;

    const isForward = e.key === "ArrowDown" || e.key === "ArrowRight";
    const nextPos   = isForward
      ? (pos + 1) % enabledIndexes.length
      : (pos - 1 + enabledIndexes.length) % enabledIndexes.length;

    const nextIndex = enabledIndexes[nextPos];
    const nextValue = options[nextIndex].value;

    handleSelect(nextValue);
    buttonRefs.current[nextIndex]?.current?.focus();
  };

  // Roving tabIndex: only the selected (or first enabled) option is in the tab order.
  const tabStopIndex = (() => {
    const selectedIndex = options.findIndex(o => o.value === selectedValue);
    if (selectedIndex !== -1 && enabledIndexes.includes(selectedIndex)) return selectedIndex;
    return enabledIndexes[0] ?? -1;
  })();

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      style={{ display: "flex", flexDirection: "column", gap: spacing[10], ...styleProp }}
    >
      {options.map((option, index) => {
        const isDisabled = groupDisabled || !!option.disabled;
        const isChecked  = option.value === selectedValue;
        const labelColor = isDisabled ? LABEL_DISABLED : LABEL_DEFAULT;
        const labelTs    = textStyles.body2Regular;
        const tabIdx     = isDisabled ? -1 : index === tabStopIndex ? 0 : -1;

        return (
          <div
            key={option.value}
            onClick={() => { if (!isDisabled) handleSelect(option.value); }}
            style={{
              display:    "flex",
              alignItems: "center",
              gap:        spacing[4],
              height:     32,
              padding:    `${spacing[1]}px 0`,
              cursor:     isDisabled ? "not-allowed" : "pointer",
              boxSizing:  "border-box",
            }}
          >
            <Radio
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => handleSelect(option.value)}
              tabIndex={tabIdx}
              buttonRef={buttonRefs.current[index]}
              aria-label={typeof option.label === "string" ? option.label : undefined}
              onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => handleKeyDown(e, index)}
            />
            <span
              aria-hidden
              style={{
                ...labelTs,
                lineHeight:    `${labelTs.lineHeight}px`,
                letterSpacing: `${labelTs.letterSpacing}px`,
                color:         labelColor,
                flexShrink:    0,
                userSelect:    "none",
              }}
            >
              {option.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RadioGroup;
