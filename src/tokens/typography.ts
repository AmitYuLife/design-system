/**
 * Typography tokens
 *
 * Covers: font families, the type scale, font weights, line heights,
 * letter spacing, and pre-composed text style presets.
 */

// ─── Font families ────────────────────────────────────────────────────────────

export const fontFamily = {
  /**
   * The primary brand typeface. Loaded via @fontsource/inter or the Google
   * Fonts API; falls back to the system UI stack.
   */
  sans: [
    "Inter",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(", "),

  /**
   * Monospaced face for code snippets and technical strings.
   */
  mono: [
    '"Fira Code"',
    '"Fira Mono"',
    '"Cascadia Code"',
    '"JetBrains Mono"',
    "Menlo",
    "Monaco",
    "Consolas",
    '"Courier New"',
    "monospace",
  ].join(", "),
} as const;

// ─── Type scale ───────────────────────────────────────────────────────────────
// Values in pixels (applied via fontSize on React Native / web).

export const fontSize = {
  /** 11px — legal copy, sub-labels */
  "2xs": 11,
  /** 12px — captions, helper text */
  xs:    12,
  /** 13px — small body text, secondary info */
  sm:    13,
  /** 15px — default body copy */
  md:    15,
  /** 17px — large body / prominent inline text */
  lg:    17,
  /** 20px — section sub-headings */
  xl:    20,
  /** 24px — page sub-headings */
  "2xl": 24,
  /** 28px — page headings */
  "3xl": 28,
  /** 34px — hero titles */
  "4xl": 34,
  /** 40px — display */
  "5xl": 40,
} as const;

// ─── Font weights ─────────────────────────────────────────────────────────────

export const fontWeight = {
  regular:   "400",
  medium:    "500",
  semibold:  "600",
  bold:      "700",
  extrabold: "800",
} as const;

// ─── Line heights ─────────────────────────────────────────────────────────────
// Unitless multipliers relative to the font size.

export const lineHeight = {
  tight:   1.2,
  snug:    1.35,
  normal:  1.5,
  relaxed: 1.65,
  loose:   2.0,
} as const;

// ─── Letter spacing ───────────────────────────────────────────────────────────
// In em units (string).

export const letterSpacing = {
  tighter: "-0.04em",
  tight:   "-0.02em",
  normal:  "0em",
  wide:    "0.02em",
  wider:   "0.04em",
  widest:  "0.08em",
} as const;

// ─── Preset text styles ───────────────────────────────────────────────────────
// Ready-made compositions used by the Text component and Storybook docs.

export type TextStyle = {
  fontFamily:    string;
  fontSize:      number;
  fontWeight:    string;
  lineHeight:    number;
  letterSpacing: string;
};

export const textStyles: Record<string, TextStyle> = {
  // Display
  displayLarge: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize["5xl"],
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.tight,
    letterSpacing: letterSpacing.tighter,
  },
  displaySmall: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize["4xl"],
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.tight,
    letterSpacing: letterSpacing.tighter,
  },

  // Headings
  headingXL: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize["3xl"],
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },
  headingLG: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize["2xl"],
    fontWeight:    fontWeight.semibold,
    lineHeight:    lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },
  headingMD: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.xl,
    fontWeight:    fontWeight.semibold,
    lineHeight:    lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  headingSM: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.lg,
    fontWeight:    fontWeight.semibold,
    lineHeight:    lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },

  // Body
  bodyLG: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.lg,
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodyMD: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.md,
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodySM: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.sm,
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Labels (UI chrome)
  labelLG: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.md,
    fontWeight:    fontWeight.medium,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  labelMD: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.sm,
    fontWeight:    fontWeight.medium,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  labelSM: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.xs,
    fontWeight:    fontWeight.medium,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.wider,
  },

  // Caption / micro
  caption: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.xs,
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  overline: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize["2xs"],
    fontWeight:    fontWeight.semibold,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.widest,
  },

  // Code
  code: {
    fontFamily:    fontFamily.mono,
    fontSize:      fontSize.sm,
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
} as const;
