import React from "react";
import { NavigationHeader } from "../../components/NavigationHeader";
import { ActionBar } from "../../components/ActionBar";
import { Icon } from "../../icons";
import {
  HamburgerIcon,
  TodaysYuCoinIcon,
  MapIcon,
  HeartIcon,
  TrophyIcon,
  ChestIcon,
  CyclingIcon,
  MindfulnessIcon,
} from "../../icons";
import { colors, palette } from "../../tokens/colors";
import { fontFamily, fontSize, fontWeight } from "../../tokens/typography";
import { spacing } from "../../tokens/spacing";
import type { ActionBarItem } from "../../components/ActionBar";

// ─── Asset imports ────────────────────────────────────────────────────────────
// All illustration assets exported from the Figma "Today Screen" (node 28:15936).
// Source: YuLife App — Login Spec, https://www.figma.com/design/4tvQWEu6I2nmPKK8eSVtOM

import yucoinComposite from "./assets/yucoin-composite.png";
import notificationBell from "./assets/notification-bell.png";
import surgeBadgeShape from "./assets/surge-badge-shape.png";
import surgeStreakIcon from "./assets/surge-streak-icon.png";
import challengeBackground from "./assets/challenge-background.png";

// ─── Colour constants ─────────────────────────────────────────────────────────

const BG_CREAM = "#fffcd7";
const COLOR_HEADING = palette.neutral700;   // #464647
const COLOR_BODY = "#5A5A5C";              // Neutral/N800
const COLOR_CTA = colors.actionPrimaryHover; // #E30D76
const COLOR_CTA_SHADOW = palette.pink900;    // #900860
const COLOR_SURGE = "#F43E8E";             // Primary/P400

// ─── Default nav items ────────────────────────────────────────────────────────

const HOME_SCREEN_NAV_ITEMS: ActionBarItem[] = [
  {
    id: "yucoin",
    icon: TodaysYuCoinIcon,
    label: "YuCoin",
    accessibilityLabel: "YuCoin home screen",
  },
  {
    id: "quests",
    icon: MapIcon,
    label: "Quests",
    accessibilityLabel: "Quests",
  },
  {
    id: "yu",
    icon: HeartIcon,
    label: "Yu",
    accessibilityLabel: "Yu",
  },
  {
    id: "leaderboard",
    icon: TrophyIcon,
    label: "Leaderboard",
    accessibilityLabel: "Leaderboard",
  },
  {
    id: "rewards",
    icon: ChestIcon,
    label: "Rewards",
    accessibilityLabel: "Rewards",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface YuCoinBalanceProps {
  amount: string | number;
}

const YuCoinBalance: React.FC<YuCoinBalanceProps> = ({ amount }) => (
  <div style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
    <span
      style={{
        fontFamily: fontFamily.sans,
        fontSize: 18,
        fontWeight: fontWeight.regular,
        lineHeight: "24px",
        color: COLOR_HEADING,
        textAlign: "right",
        whiteSpace: "nowrap",
      }}
    >
      {amount}
    </span>
    <Icon
      svg={TodaysYuCoinIcon}
      size={24}
      color={COLOR_HEADING}
      accessibilityLabel="YuCoin balance"
    />
  </div>
);

interface ActivityStatProps {
  icon: React.ReactNode;
  value: string;
}

const ActivityStat: React.FC<ActivityStatProps> = ({ icon, value }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: spacing[1],
    }}
  >
    {icon}
    <span
      style={{
        fontFamily: fontFamily.sans,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.regular,
        lineHeight: "24px",
        color: COLOR_HEADING,
        letterSpacing: "0.6px",
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  </div>
);

interface SurgeBadgeProps {
  challengesDone: number;
  challengesTotal: number;
}

const SurgeBadge: React.FC<SurgeBadgeProps> = ({
  challengesDone,
  challengesTotal,
}) => (
  <div
    style={{
      position: "fixed",
      right: 16,
      top: 104,
      width: 64,
      height: 72,
      zIndex: 101,
      userSelect: "none",
    }}
    aria-label={`Surge: ${challengesDone} of ${challengesTotal} challenges completed`}
    role="img"
  >
    {/* Pink circular bubble */}
    <img
      alt=""
      src={surgeBadgeShape}
      style={{
        position: "absolute",
        inset: "0 0 25% 0",
        width: "100%",
        height: "75%",
        objectFit: "fill",
      }}
    />
    {/* Streak bar chart inside */}
    <img
      alt=""
      src={surgeStreakIcon}
      style={{
        position: "absolute",
        top: "22%",
        left: "28%",
        right: "28%",
        bottom: "39%",
        width: "44%",
        objectFit: "contain",
      }}
    />
    {/* Counter label */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "14%",
        right: "14%",
        height: "26%",
        backgroundColor: COLOR_SURGE,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: fontFamily.sans,
          fontSize: fontSize.xs,
          fontWeight: fontWeight.bold,
          color: "#FFFFFF",
          letterSpacing: "0.4px",
        }}
      >
        {challengesDone}/{challengesTotal}
      </span>
    </div>
  </div>
);

// ─── HomeScreen ───────────────────────────────────────────────────────────────

export interface HomeScreenActivity {
  /** Step count. */
  steps: number;
  /** Distance in km. */
  distanceKm: number;
  /** Active minutes. */
  minutes: number;
}

export interface HomeScreenProps {
  /**
   * User's current YuCoin balance displayed in the navigation header.
   * @default 400
   */
  yuCoinBalance?: string | number;
  /**
   * Total YuCoins available to earn today.
   * @default 200
   */
  yuCoinToday?: number;
  /**
   * Today's activity statistics.
   */
  activity?: HomeScreenActivity;
  /**
   * Text for the main call-to-action button.
   * @default "Take a challenge (1 left)"
   */
  ctaLabel?: string;
  /**
   * Called when the CTA button is pressed.
   */
  onCtaPress?: () => void;
  /**
   * Surge widget — number of challenges completed today.
   * @default 0
   */
  surgeCompleted?: number;
  /**
   * Surge widget — total challenges available today.
   * @default 5
   */
  surgeTotal?: number;
  /**
   * Whether the notification bell shows an unread dot.
   * @default false
   */
  hasNotification?: boolean;
  /**
   * The currently active navigation tab id.
   * @default "yucoin"
   */
  activeTabId?: string;
  /**
   * Callback fired when a nav tab is pressed.
   */
  onTabPress?: (id: string) => void;
}

// ─── Layout constants ─────────────────────────────────────────────────────────

/** Height of the NavigationHeader (status bar 44 + nav bar 40 + sub-nav 8). */
const HEADER_HEIGHT = 92;

/** Height of the ActionBar pill + its bottom padding. */
const ACTION_BAR_HEIGHT = 82;

/**
 * HomeScreen
 *
 * Full-screen template for the YuLife app home (Today) screen. Combines the
 * `NavigationHeader` and `ActionBar` design-system components with the
 * illustrated YuCoin background, coin graphic, surge badge, and activity
 * statistics — matching the Figma "Today Screen" spec.
 *
 * Both `NavigationHeader` and `ActionBar` retain their natural positioning and
 * scaling from their own component stories:
 * - `NavigationHeader` is `position: fixed` at the top of the viewport.
 * - `ActionBar` sits at the bottom inside a `position: fixed` strip that
 *   mirrors the padding from its own story decorator (`0 16px`).
 *
 * Figma reference: YuLife App — Login Spec, node 28:15936
 * https://www.figma.com/design/4tvQWEu6I2nmPKK8eSVtOM/YuLife-App---Login--Spec-?node-id=28-15936
 */
export const HomeScreen: React.FC<HomeScreenProps> = ({
  yuCoinBalance = 400,
  yuCoinToday = 200,
  activity = { steps: 0, distanceKm: 0, minutes: 0 },
  ctaLabel = "Take a challenge (1 left)",
  onCtaPress,
  surgeCompleted = 0,
  surgeTotal = 5,
  hasNotification = false,
  activeTabId = "yucoin",
  onTabPress,
}) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: BG_CREAM,
        position: "relative",
      }}
      aria-label="YuCoin home screen"
    >
      {/* ── Background illustration ───────────────────────────────────────── */}
      {/* Figma node 28:15937 (Challenge / Background). Covers the full viewport. */}
      <img
        aria-hidden
        alt=""
        src={challengeBackground}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Navigation Header ────────────────────────────────────────────── */}
      {/* Uses its natural position: fixed — no style override. */}
      <NavigationHeader
        darkMode={false}
        leftSlot={
          <Icon
            svg={HamburgerIcon}
            size={24}
            color={colors.textPrimary}
            accessibilityLabel="Open menu"
          />
        }
        rightSlot={<YuCoinBalance amount={yuCoinBalance} />}
      />

      {/* ── Notification bell ─────────────────────────────────────────────── */}
      {/*
       * Fixed to the viewport, aligned with the navigation bar row (y=52).
       * Sits at x=56 next to the hamburger (Figma node 28:15943).
       */}
      <div
        style={{
          position: "fixed",
          left: 56,
          top: 52,
          width: 24,
          height: 24,
          zIndex: 101,
        }}
        aria-label={hasNotification ? "Notifications (unread)" : "Notifications"}
        role="img"
      >
        <img
          alt=""
          src={notificationBell}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        {hasNotification && (
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 1,
              right: 1,
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: COLOR_CTA,
              border: `1.5px solid ${BG_CREAM}`,
              boxSizing: "border-box",
            }}
          />
        )}
      </div>

      {/* ── Surge badge (top-right floating) ──────────────────────────────── */}
      {/* Fixed to viewport top-right. 16px from right edge (375 - 295 - 64). */}
      <SurgeBadge challengesDone={surgeCompleted} challengesTotal={surgeTotal} />

      {/* ── Scrollable content area ───────────────────────────────────────── */}
      {/*
       * Flex column centred between the fixed header and fixed action bar.
       * Padding reserves space so content is never obscured by either.
       */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          paddingTop: HEADER_HEIGHT,
          paddingBottom: ACTION_BAR_HEIGHT,
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* YuCoin coin — Figma node 28:15942 */}
        <img
          alt="YuCoin"
          src={yucoinComposite}
          style={{
            width: 200,
            height: 200,
            objectFit: "contain",
            marginTop: 40,
            flexShrink: 0,
          }}
        />

        {/* "200 YuCoin Today" heading */}
        <p
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 32,
            fontWeight: fontWeight.bold,
            lineHeight: "40px",
            color: COLOR_BODY,
            letterSpacing: "1px",
            textAlign: "center",
            margin: `${spacing[4]}px 0 0`,
            userSelect: "none",
          }}
        >
          {yuCoinToday} YuCoin Today
        </p>

        {/* Activity statistics row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing[4],
            marginTop: spacing[1],
          }}
        >
          <ActivityStat
            icon={
              <Icon
                svg={MindfulnessIcon}
                size={16}
                color={COLOR_HEADING}
                accessibilityLabel="Steps"
              />
            }
            value={`${activity.steps} steps`}
          />
          <ActivityStat
            icon={
              <Icon
                svg={CyclingIcon}
                size={16}
                color={COLOR_HEADING}
                accessibilityLabel="Distance"
              />
            }
            value={`${activity.distanceKm} km`}
          />
          <ActivityStat
            icon={
              <Icon
                svg={MindfulnessIcon}
                size={16}
                color={COLOR_HEADING}
                accessibilityLabel="Active minutes"
              />
            }
            value={`${activity.minutes} min`}
          />
        </div>

        {/* Pushes the CTA button toward the bottom of the content area */}
        <div style={{ flex: 1 }} />

        {/* Call-to-action button */}
        <button
          onClick={onCtaPress}
          style={{
            width: 327,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLOR_CTA,
            borderRadius: 48,
            boxShadow: `0px 4px 0px 0px ${COLOR_CTA_SHADOW}`,
            border: "none",
            cursor: "pointer",
            padding: `${spacing[4]}px ${spacing[8]}px`,
            boxSizing: "border-box",
            flexShrink: 0,
            marginBottom: spacing[6],
          }}
        >
          <span
            style={{
              fontFamily: fontFamily.sans,
              fontSize: fontSize.sm,
              fontWeight: fontWeight.bold,
              lineHeight: "16px",
              color: "#FFFFFF",
              letterSpacing: "0.4px",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {ctaLabel}
          </span>
        </button>
      </div>

      {/* ── Action Bar ────────────────────────────────────────────────────── */}
      {/*
       * Fixed strip at the bottom of the viewport. The inner padding (0 16px)
       * matches the story decorator used in ActionBar.stories.tsx so the
       * component renders at the same scale and position as its own story.
       */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: `0 ${spacing[4]}px`,
          zIndex: 100,
        }}
      >
        <ActionBar
          items={HOME_SCREEN_NAV_ITEMS}
          activeId={activeTabId}
          onPress={onTabPress}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
