import React from "react";
import { colors, palette } from "../../tokens/colors";
import { spacing, space } from "../../tokens/spacing";
import { radii } from "../../tokens/radii";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SinglePageTemplateProps {
  /**
   * Hero component rendered at the top of the page. Accepts any Hero variant
   * (e.g. `HeroProductDetails`, `Hero` with custom children, or any future
   * variant). The hero stays pinned at the top while the MainLayout content
   * scrolls over it with a parallax effect.
   */
  hero: React.ReactNode;
  /**
   * Content rendered inside the scrollable MainLayout container. This is an
   * open slot — pass any combination of components (cards, tiles, buttons,
   * lists, etc.) and they will be laid out in a vertical flex column with
   * consistent spacing.
   */
  children: React.ReactNode;
  /**
   * Inline style overrides applied to the root element.
   * Use sparingly — prefer composing content via the hero and children slots.
   */
  style?: React.CSSProperties;
}

// ─── SinglePageTemplate ───────────────────────────────────────────────────────

/**
 * SinglePageTemplate
 *
 * A generic single-page layout template that pairs a full-bleed Hero at the
 * top with a scrollable MainLayout content container below. The MainLayout
 * overlaps the hero by `spacing[6]` (24 px) with rounded top corners, and
 * slides over the hero as the user scrolls — creating a subtle parallax effect
 * using pure CSS (`position: sticky` + negative margin).
 *
 * Unlike the domain-specific `HomeScreen` / `YuCoinScreen` templates, this
 * template is fully generic: all content is composed via the `hero` and
 * `children` slots with no hardcoded domain props.
 *
 * Figma reference: YuLife App Storybook → SinglePageTemplate → node 10971:1317
 * https://www.figma.com/design/ERkTigxQV1eQ7jooI8pgQp/YuLife-App-Storybook?node-id=10971-1317
 */
export const SinglePageTemplate: React.FC<SinglePageTemplateProps> = ({
  hero,
  children,
  style,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: colors.bgBase,
        ...style,
      }}
    >
      {/* Scroll container — the only scrollable element */}
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Hero — sticky so it stays pinned while MainLayout scrolls over it */}
        <div style={{ position: "sticky", top: 0, zIndex: 0 }}>{hero}</div>

        {/* MainLayout — slides over the hero with rounded top corners */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: -spacing[6],
            borderTopLeftRadius: radii.md,
            borderTopRightRadius: radii.md,
            backgroundColor: palette.neutral50,
            paddingTop: space.pagePaddingVertical,
            paddingBottom: space.pagePaddingVertical,
            paddingLeft: space.pagePaddingHorizontal,
            paddingRight: space.pagePaddingHorizontal,
            display: "flex",
            flexDirection: "column",
            gap: space.stackMD,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SinglePageTemplate;
