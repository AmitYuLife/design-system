/**
 * Colour tokens
 *
 * Two layers:
 *  1. Palette  – raw, named colour values (brand-agnostic)
 *  2. Semantic – purpose-driven aliases that map onto the palette
 *
 * Replace values here to re-theme the entire system.
 */

// ─── Palette ─────────────────────────────────────────────────────────────────

export const palette = {
  // Neutrals
  white: "#FFFFFF",
  black: "#000000",
  grey50:  "#F9FAFB",
  grey100: "#F3F4F6",
  grey200: "#E5E7EB",
  grey300: "#D1D5DB",
  grey400: "#9CA3AF",
  grey500: "#6B7280",
  grey600: "#4B5563",
  grey700: "#374151",
  grey800: "#1F2937",
  grey900: "#111827",

  // Primary (Blue)
  primary50:  "#EFF6FF",
  primary100: "#DBEAFE",
  primary200: "#BFDBFE",
  primary300: "#93C5FD",
  primary400: "#60A5FA",
  primary500: "#3B82F6",
  primary600: "#2563EB",
  primary700: "#1D4ED8",
  primary800: "#1E40AF",
  primary900: "#1E3A8A",

  // Success (Green)
  success50:  "#F0FDF4",
  success100: "#DCFCE7",
  success200: "#BBF7D0",
  success300: "#86EFAC",
  success400: "#4ADE80",
  success500: "#22C55E",
  success600: "#16A34A",
  success700: "#15803D",
  success800: "#166534",
  success900: "#14532D",

  // Warning (Amber)
  warning50:  "#FFFBEB",
  warning100: "#FEF3C7",
  warning200: "#FDE68A",
  warning300: "#FCD34D",
  warning400: "#FBBF24",
  warning500: "#F59E0B",
  warning600: "#D97706",
  warning700: "#B45309",
  warning800: "#92400E",
  warning900: "#78350F",

  // Danger (Red)
  danger50:  "#FEF2F2",
  danger100: "#FEE2E2",
  danger200: "#FECACA",
  danger300: "#FCA5A5",
  danger400: "#F87171",
  danger500: "#EF4444",
  danger600: "#DC2626",
  danger700: "#B91C1C",
  danger800: "#991B1B",
  danger900: "#7F1D1D",
} as const;

// ─── Semantic tokens ──────────────────────────────────────────────────────────

export const colors = {
  // Text
  textPrimary:   palette.grey900,
  textSecondary: palette.grey500,
  textDisabled:  palette.grey300,
  textInverse:   palette.white,
  textLink:      palette.primary600,
  textDanger:    palette.danger600,

  // Backgrounds
  bgBase:       palette.white,
  bgSurface:    palette.grey50,
  bgElevated:   palette.white,
  bgOverlay:    palette.grey900,      // 50% opacity applied at usage site
  bgDisabled:   palette.grey100,

  // Borders
  borderDefault: palette.grey200,
  borderFocused: palette.primary500,
  borderDanger:  palette.danger500,

  // Interactive
  actionPrimary:        palette.primary600,
  actionPrimaryHover:   palette.primary700,
  actionPrimaryPressed: palette.primary800,
  actionPrimaryText:    palette.white,

  actionSecondary:        palette.white,
  actionSecondaryBorder:  palette.grey200,
  actionSecondaryText:    palette.grey900,

  actionDestructive:      palette.danger600,
  actionDestructiveText:  palette.white,

  // Feedback
  feedbackSuccess: palette.success600,
  feedbackWarning: palette.warning600,
  feedbackDanger:  palette.danger600,
  feedbackInfo:    palette.primary600,

  // Status surfaces
  successSurface: palette.success50,
  warningSurface: palette.warning50,
  dangerSurface:  palette.danger50,
  infoSurface:    palette.primary50,
} as const;

export type PaletteKey  = keyof typeof palette;
export type SemanticKey = keyof typeof colors;
