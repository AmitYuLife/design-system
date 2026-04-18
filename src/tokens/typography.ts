/**
 * Typography tokens
 *
 * Source: Brand — Foundations › App Typography section
 * https://www.figma.com/design/Ac90Diav91cBdIGET9uCXs/Brand---Foundations?node-id=6786-26
 *
 * Typeface: Bariol (Thin 100 · Light 300 · Regular 400 · Bold 700)
 *
 * Two layers:
 *  1. Scale tokens  – individual axes (size, weight, line-height, spacing)
 *  2. Text styles   – pre-composed presets matching Figma named styles
 */

// ─── Font family ──────────────────────────────────────────────────────────────

export const fontFamily = {
  /**
   * Bariol — the brand typeface. Loaded via @font-face in preview-head.html;
   * falls back to the system UI stack.
   */
  sans: [
    "Bariol",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(", "),
} as const;

// ─── Font sizes ───────────────────────────────────────────────────────────────
// Values in pixels. Named to match their Figma role.

export const fontSize = {
  /** 10px — Label 3 */
  "3xs": 10,
  /** 12px — Label 2 */
  "2xs": 12,
  /** 14px — Label 1 */
  xs:    14,
  /** 16px — Body 2, Button */
  sm:    16,
  /** 20px — Body 1 */
  md:    20,
  /** 24px — Heading 3 */
  lg:    24,
  /** 28px — Heading 2 */
  xl:    28,
  /** 32px — Heading 1 */
  "2xl": 32,
} as const;

// ─── Font weights ─────────────────────────────────────────────────────────────

export const fontWeight = {
  thin:    "100",
  light:   "300",
  regular: "400",
  bold:    "700",
} as const;

// ─── Line heights ─────────────────────────────────────────────────────────────
// Absolute pixel values from Figma (React Native-compatible).

export const lineHeight = {
  /** 16px — Labels */
  tight:    16,
  /** 24px — Body */
  normal:   24,
  /** 32px — Heading 2 & 3 */
  loose:    32,
  /** 40px — Heading 1 */
  spacious: 40,
} as const;

// ─── Letter spacing ───────────────────────────────────────────────────────────
// Absolute pixel values from Figma (React Native-compatible).

export const letterSpacing = {
  /** 0.4px — Labels */
  xs: 0.4,
  /** 0.6px — Body 2 */
  sm: 0.6,
  /** 0.8px — Body 1 */
  md: 0.8,
  /** 1px   — Headings */
  lg: 1,
} as const;

// ─── Text styles ──────────────────────────────────────────────────────────────
// Pre-composed presets matching Figma's named text styles exactly.
// lineHeight and letterSpacing are in pixels (React Native / web px).

export type TextStyle = {
  fontFamily:    string;
  fontSize:      number;
  fontWeight:    string;
  lineHeight:    number;
  letterSpacing: number;
};

export const textStyles: Record<string, TextStyle> = {
  // ── Headings ────────────────────────────────────────────────────────────────
  heading1: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize["2xl"],   // 32px
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.spacious, // 40px
    letterSpacing: letterSpacing.lg,  // 1px
  },
  heading2: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.xl,       // 28px
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.loose,  // 32px
    letterSpacing: letterSpacing.lg,  // 1px
  },
  heading3: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.lg,       // 24px
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.loose,  // 32px
    letterSpacing: letterSpacing.lg,  // 1px
  },

  // ── Body ────────────────────────────────────────────────────────────────────
  body1Regular: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.md,       // 20px
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.normal, // 24px
    letterSpacing: letterSpacing.md,  // 0.8px
  },
  body1Bold: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.md,       // 20px
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.normal, // 24px
    letterSpacing: letterSpacing.md,  // 0.8px
  },
  body2Regular: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.sm,       // 16px
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.normal, // 24px
    letterSpacing: letterSpacing.sm,  // 0.6px
  },
  body2Bold: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.sm,       // 16px
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.normal, // 24px
    letterSpacing: letterSpacing.sm,  // 0.6px
  },

  // ── Labels ──────────────────────────────────────────────────────────────────
  button: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.sm,       // 16px
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.tight,  // 16px
    letterSpacing: letterSpacing.xs,  // 0.4px
  },
  label1Regular: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.xs,       // 14px
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.tight,  // 16px
    letterSpacing: letterSpacing.xs,  // 0.4px
  },
  label1Bold: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize.xs,       // 14px
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.tight,  // 16px
    letterSpacing: letterSpacing.xs,  // 0.4px
  },
  label2Regular: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize["2xs"],   // 12px
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.tight,  // 16px
    letterSpacing: letterSpacing.xs,  // 0.4px
  },
  label2Bold: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize["2xs"],   // 12px
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.tight,  // 16px
    letterSpacing: letterSpacing.xs,  // 0.4px
  },
  label3Regular: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize["3xs"],   // 10px
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.tight,  // 16px
    letterSpacing: letterSpacing.xs,  // 0.4px
  },
  label3Bold: {
    fontFamily:    fontFamily.sans,
    fontSize:      fontSize["3xs"],   // 10px
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.tight,  // 16px
    letterSpacing: letterSpacing.xs,  // 0.4px
  },
} as const;
