import React from "react";
import { Tile, TileProps } from "./Tile";
import { spacing } from "../../tokens/spacing";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TileItem extends Pick<TileProps, "colourIcon" | "label"> {}

export interface TileGroupProps {
  /**
   * Array of tile items to render. Each item requires a `colourIcon` (24 × 24
   * ColourIcon component) and a `label` string.
   *
   * The Figma spec shows 2–3 tiles. More tiles will still share width equally
   * but may become visually crowded below 3 tiles wide.
   */
  tiles: TileItem[];
  /**
   * Inline style overrides for the root element.
   */
  style?: React.CSSProperties;
}

// ─── TileGroup ────────────────────────────────────────────────────────────────

/**
 * TileGroup
 *
 * A full-width horizontal row of `Tile` components that share the available
 * width equally. Each tile receives `flex: 1` so the group adapts to any
 * container width — suitable for use inside `SinglePageTemplate`'s MainLayout
 * or any full-width content area.
 *
 * Pass tile data via the `tiles` prop (array of `{ colourIcon, label }`).
 * Designed for 2–3 tiles; the Figma spec shows 3-up as the primary layout.
 *
 * Figma reference: YuLife App Storybook → TileGroup → node 10972:4569
 * https://www.figma.com/design/ERkTigxQV1eQ7jooI8pgQp/YuLife-App-Storybook?node-id=10972-4569
 */
export const TileGroup: React.FC<TileGroupProps> = ({ tiles, style }) => (
  <div
    style={{
      display: "flex",
      width: "100%",
      gap: spacing[4],
      alignItems: "center",
      ...style,
    }}
  >
    {tiles.map((tile, index) => (
      <Tile
        key={index}
        colourIcon={tile.colourIcon}
        label={tile.label}
        style={{ flex: "1 0 0", width: "auto" }}
      />
    ))}
  </div>
);

export default TileGroup;
