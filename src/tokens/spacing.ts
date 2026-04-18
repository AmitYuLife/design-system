/**
 * Spacing tokens
 *
 * An 8-point grid extended with sub-grid values for tight layouts.
 * Use these tokens for padding, margin, gap, and size values.
 */

export const spacing = {
  /** 0px */
  0:   0,
  /** 2px — hairline/divider nudge */
  px:  2,
  /** 4px — micro */
  1:   4,
  /** 6px */
  1.5: 6,
  /** 8px — xs */
  2:   8,
  /** 10px */
  2.5: 10,
  /** 12px — sm */
  3:   12,
  /** 14px */
  3.5: 14,
  /** 16px — md (base) */
  4:   16,
  /** 20px */
  5:   20,
  /** 24px — lg */
  6:   24,
  /** 28px */
  7:   28,
  /** 32px — xl */
  8:   32,
  /** 36px */
  9:   36,
  /** 40px — 2xl */
  10:  40,
  /** 48px */
  12:  48,
  /** 56px */
  14:  56,
  /** 64px — 3xl */
  16:  64,
  /** 80px */
  20:  80,
  /** 96px */
  24:  96,
  /** 128px */
  32:  128,
} as const;

export type SpacingKey = keyof typeof spacing;

/**
 * Named semantic spacing aliases — prefer these over raw numbers
 * so intent is clear in component code.
 */
export const space = {
  componentPaddingXS: spacing[2],   // 8
  componentPaddingSM: spacing[3],   // 12
  componentPaddingMD: spacing[4],   // 16
  componentPaddingLG: spacing[6],   // 24

  pagePaddingHorizontal: spacing[4], // 16
  pagePaddingVertical:   spacing[6], // 24

  stackXS:  spacing[1],  // 4
  stackSM:  spacing[2],  // 8
  stackMD:  spacing[4],  // 16
  stackLG:  spacing[6],  // 24
  stackXL:  spacing[8],  // 32

  inlineXS: spacing[1],  // 4
  inlineSM: spacing[2],  // 8
  inlineMD: spacing[4],  // 16
} as const;
