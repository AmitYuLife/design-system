/**
 * Figma Code Connect — Iconography
 *
 * Maps each icon component to its Figma component node.
 * File: https://www.figma.com/design/sDuXCE69U5qvWYkOhEFHBd/App---Iconography
 *
 * To publish:
 *   FIGMA_ACCESS_TOKEN=<token> npx figma connect publish
 *
 * To unpublish:
 *   FIGMA_ACCESS_TOKEN=<token> npx figma connect unpublish
 */

import React from "react";
import figma from "@figma/code-connect";
import { Icon } from "./Icon";

import HamburgerIcon        from "./svg/Hamburger.svg?react";
import CheckIcon            from "./svg/Check.svg?react";
import LeftIcon             from "./svg/Left.svg?react";
import RightIcon            from "./svg/Right.svg?react";
import UpIcon               from "./svg/Up.svg?react";
import DownIcon             from "./svg/Down.svg?react";
import CloseIcon            from "./svg/Close.svg?react";
import AddIcon              from "./svg/Add.svg?react";
import CaretIcon            from "./svg/Caret.svg?react";
import BulletIcon           from "./svg/Bullet.svg?react";
import ChatHelpIcon         from "./svg/ChatHelp.svg?react";
import LogOutIcon           from "./svg/LogOut.svg?react";
import ClockIcon            from "./svg/Clock.svg?react";
import StarLineIcon         from "./svg/StarLine.svg?react";
import SettingsGearIcon     from "./svg/SettingsGear.svg?react";
import InfoIcon             from "./svg/Info.svg?react";
import StatusInfoIcon       from "./svg/StatusInfo.svg?react";
import StatusSuccessIcon    from "./svg/StatusSuccess.svg?react";
import StarFillIcon         from "./svg/StarFill.svg?react";
import AvailableRewardsIcon from "./svg/AvailableRewards.svg?react";
import QuestionOutlineIcon  from "./svg/QuestionOutline.svg?react";
import InviteIcon           from "./svg/Invite.svg?react";
import WorldIcon            from "./svg/World.svg?react";
import StreakIcon           from "./svg/Streak.svg?react";
import WellbeingHubIcon     from "./svg/WellbeingHub.svg?react";
import HeartIcon            from "./svg/Heart.svg?react";
import ActivityHistoryIcon  from "./svg/ActivityHistory.svg?react";
import CyclingIcon          from "./svg/Cycling.svg?react";
import MindfulnessIcon      from "./svg/Mindfulness.svg?react";
import FiitIcon             from "./svg/Fiit.svg?react";
import YuniversityIcon      from "./svg/Yuniversity.svg?react";
import YudokuIcon           from "./svg/Yudoku.svg?react";
import PigIcon              from "./svg/Pig.svg?react";
import SmartPensionIcon     from "./svg/SmartPension.svg?react";
import EmotionIcon          from "./svg/Emotion.svg?react";
import AccountIcon          from "./svg/Account.svg?react";
import SleepIcon            from "./svg/Sleep.svg?react";
import PlantIcon            from "./svg/Plant.svg?react";
import CalendarIcon         from "./svg/Calendar.svg?react";
import DropIcon             from "./svg/Drop.svg?react";
import MealIcon             from "./svg/Meal.svg?react";
import PlasticIcon          from "./svg/Plastic.svg?react";
import TodaysYuCoinIcon     from "./svg/TodaysYuCoin.svg?react";
import MapIcon              from "./svg/Map.svg?react";
import TrophyIcon           from "./svg/Trophy.svg?react";
import CoinStackIcon        from "./svg/CoinStack.svg?react";
import YugiHeadIcon         from "./svg/YugiHead.svg?react";
import ChestIcon            from "./svg/Chest.svg?react";
import TreasureChestIcon    from "./svg/TreasureChest.svg?react";
import UnityIcon            from "./svg/Unity.svg?react";
import LevelIcon            from "./svg/Level.svg?react";

// ─── Helper ───────────────────────────────────────────────────────────────────

const FILE = "sDuXCE69U5qvWYkOhEFHBd";

function iconConnect(
  SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>,
  nodeId: string,
  label: string
) {
  figma.connect(Icon, `https://www.figma.com/design/${FILE}/App---Iconography?node-id=${nodeId}`, {
    props: {
      size: figma.enum("Size", { xs: 16, sm: 20, md: 24, lg: 28, xl: 32 }),
      color: figma.string("Color"),
    },
    example: ({ size, color }) => (
      <Icon
        svg={SvgComponent}
        size={size ?? 24}
        color={color ?? "currentColor"}
        accessibilityLabel={label}
      />
    ),
  });
}

// ─── Navigation ───────────────────────────────────────────────────────────────
iconConnect(HamburgerIcon,        "5099:3082", "Hamburger");
iconConnect(CheckIcon,            "5099:3202", "Check");
iconConnect(LeftIcon,             "5099:3212", "Left");
iconConnect(RightIcon,            "5099:3214", "Right");
iconConnect(UpIcon,               "5099:3216", "Up");
iconConnect(DownIcon,             "5099:3218", "Down");
iconConnect(CloseIcon,            "5099:3220", "Close");
iconConnect(AddIcon,              "6525:2082", "Add");
iconConnect(CaretIcon,            "5099:3367", "Caret");
iconConnect(BulletIcon,           "8365:118",  "Bullet");

// ─── Action ───────────────────────────────────────────────────────────────────
iconConnect(ChatHelpIcon,         "5099:3135", "Chat Help");
iconConnect(LogOutIcon,           "5099:3137", "Log Out");
iconConnect(ClockIcon,            "5099:3165", "Clock");
iconConnect(StarLineIcon,         "5099:3169", "Star Line");
iconConnect(SettingsGearIcon,     "5099:3208", "Settings Gear");
iconConnect(InfoIcon,             "5099:3277", "Info");
iconConnect(StatusInfoIcon,       "5099:3281", "Status Info");
iconConnect(StatusSuccessIcon,    "5099:3289", "Status Success");
iconConnect(StarFillIcon,         "5099:3328", "Star Fill");
iconConnect(AvailableRewardsIcon, "5099:3395", "Available Rewards");
iconConnect(QuestionOutlineIcon,  "5099:3414", "Question Outline");
iconConnect(InviteIcon,           "7450:10",   "Invite");
iconConnect(WorldIcon,            "6710:35",   "World");

// ─── Activities ───────────────────────────────────────────────────────────────
iconConnect(StreakIcon,           "5099:3094", "Streak");
iconConnect(WellbeingHubIcon,     "5099:3102", "Wellbeing Hub");
iconConnect(HeartIcon,            "5099:3131", "Heart");
iconConnect(ActivityHistoryIcon,  "5099:3194", "Activity History");
iconConnect(CyclingIcon,          "5099:3300", "Cycling");
iconConnect(MindfulnessIcon,      "5099:3302", "Mindfulness");
iconConnect(FiitIcon,             "5110:2085", "Fiit");
iconConnect(YuniversityIcon,      "5813:2082", "Yuniversity");
iconConnect(YudokuIcon,           "6074:2084", "Yudoku");
iconConnect(PigIcon,              "6301:2096", "Pig");
iconConnect(SmartPensionIcon,     "6384:2089", "Smart Pension");
iconConnect(EmotionIcon,          "7424:573",  "Emotion");
iconConnect(AccountIcon,          "7424:576",  "Account");
iconConnect(SleepIcon,            "7424:577",  "Sleep");
iconConnect(PlantIcon,            "7758:72",   "Plant");
iconConnect(CalendarIcon,         "8132:9",    "Calendar");
iconConnect(DropIcon,             "7758:73",   "Drop");
iconConnect(MealIcon,             "7758:74",   "Meal");
iconConnect(PlasticIcon,          "7758:75",   "Plastic");

// ─── YuLife ───────────────────────────────────────────────────────────────────
iconConnect(TodaysYuCoinIcon,     "5099:3039", "Todays YuCoin");
iconConnect(MapIcon,              "5099:3049", "Map");
iconConnect(TrophyIcon,           "5099:3067", "Trophy");
iconConnect(CoinStackIcon,        "5099:3087", "Coin Stack");
iconConnect(YugiHeadIcon,         "5099:3142", "Yugi Head");
iconConnect(ChestIcon,            "5099:3185", "Chest");
iconConnect(TreasureChestIcon,    "5099:3382", "Treasure Chest");
iconConnect(UnityIcon,            "5110:2088", "Unity");
iconConnect(LevelIcon,            "7424:575",  "Level");
