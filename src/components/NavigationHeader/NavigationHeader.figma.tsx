/**
 * Figma Code Connect — NavigationHeader
 *
 * Maps the NavigationHeader Figma component variants to the React component.
 * File: https://www.figma.com/design/ERkTigxQV1eQ7jooI8pgQp/YuLife-App-Storybook
 *
 * To publish:
 *   FIGMA_ACCESS_TOKEN=<token> npx figma connect publish
 *
 * To unpublish:
 *   FIGMA_ACCESS_TOKEN=<token> npx figma connect unpublish
 */

import React from "react";
import figma from "@figma/code-connect";
import { NavigationHeader } from "./NavigationHeader";
import { Icon } from "../../icons/Icon";
import type { FC, SVGProps } from "react";
import { HamburgerIcon, TodaysYuCoinIcon } from "../../icons/figma-stubs";
import { colors, fontFamily } from "../../tokens";

type SvgStub = FC<SVGProps<SVGSVGElement>>;

// ─── Shared slot examples ─────────────────────────────────────────────────────

const hamburgerSlot = (
  <Icon
    svg={HamburgerIcon as SvgStub}
    size={24}
    color={colors.textPrimary}
    accessibilityLabel="Open menu"
  />
);

const yuCoinBalanceSlot = (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ fontFamily: fontFamily.sans, fontSize: 18, color: colors.textPrimary }}>
      123,131
    </span>
    {/* Replace TodaysYuCoinIcon with the YuCoin colour nav icon when available */}
    <Icon
      svg={TodaysYuCoinIcon as SvgStub}
      size={24}
      color={colors.textPrimary}
      accessibilityLabel="YuCoin"
    />
  </div>
);

// ─── Variant: Background=Off, Shadow=Off (default / transparent) ──────────────

figma.connect(
  NavigationHeader,
  "https://www.figma.com/design/ERkTigxQV1eQ7jooI8pgQp/YuLife-App-Storybook?node-id=10298-936",
  {
    imports: [
      'import { NavigationHeader } from "@/components"',
      'import { Icon, HamburgerIcon, TodaysYuCoinIcon } from "@/icons"',
      'import { colors, fontFamily } from "@/tokens"',
    ],
    example: () => (
      <NavigationHeader
        leftSlot={hamburgerSlot}
        rightSlot={yuCoinBalanceSlot}
      />
    ),
  }
);

// ─── Variant: Background=On, Shadow=Off ───────────────────────────────────────

figma.connect(
  NavigationHeader,
  "https://www.figma.com/design/ERkTigxQV1eQ7jooI8pgQp/YuLife-App-Storybook?node-id=10326-1245",
  {
    imports: [
      'import { NavigationHeader } from "@/components"',
      'import { Icon, HamburgerIcon, TodaysYuCoinIcon } from "@/icons"',
      'import { colors, fontFamily } from "@/tokens"',
    ],
    example: () => (
      <NavigationHeader
        background
        leftSlot={hamburgerSlot}
        rightSlot={yuCoinBalanceSlot}
      />
    ),
  }
);

// ─── Variant: Background=On, Shadow=On ────────────────────────────────────────

figma.connect(
  NavigationHeader,
  "https://www.figma.com/design/ERkTigxQV1eQ7jooI8pgQp/YuLife-App-Storybook?node-id=10326-1626",
  {
    imports: [
      'import { NavigationHeader } from "@/components"',
      'import { Icon, HamburgerIcon, TodaysYuCoinIcon } from "@/icons"',
      'import { colors, fontFamily } from "@/tokens"',
    ],
    example: () => (
      <NavigationHeader
        background
        shadow
        leftSlot={hamburgerSlot}
        rightSlot={yuCoinBalanceSlot}
      />
    ),
  }
);

