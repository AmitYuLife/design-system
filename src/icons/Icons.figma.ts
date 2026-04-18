/**
 * Figma Code Connect — Iconography
 *
 * Maps each icon component to its Figma component node.
 * Replace FIGMA_FILE_KEY and each FIGMA_NODE_ID with real values from your
 * Figma file URL:
 *
 *   https://www.figma.com/design/FIGMA_FILE_KEY/...?node-id=FIGMA_NODE_ID
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
import HomeIcon from "./svg/Home.svg?react";
import SearchIcon from "./svg/Search.svg?react";
import BellIcon from "./svg/Bell.svg?react";
import SettingsIcon from "./svg/Settings.svg?react";
import UserIcon from "./svg/User.svg?react";
import HeartIcon from "./svg/Heart.svg?react";
import ArrowLeftIcon from "./svg/ArrowLeft.svg?react";
import ArrowRightIcon from "./svg/ArrowRight.svg?react";
import ChevronDownIcon from "./svg/ChevronDown.svg?react";
import ChevronRightIcon from "./svg/ChevronRight.svg?react";
import CloseIcon from "./svg/Close.svg?react";
import MenuIcon from "./svg/Menu.svg?react";
import PlusIcon from "./svg/Plus.svg?react";
import CheckIcon from "./svg/Check.svg?react";
import InfoIcon from "./svg/Info.svg?react";
import WarningIcon from "./svg/Warning.svg?react";
import StarIcon from "./svg/Star.svg?react";
import ShareIcon from "./svg/Share.svg?react";
import BookmarkIcon from "./svg/Bookmark.svg?react";
import CameraIcon from "./svg/Camera.svg?react";
import MapIcon from "./svg/Map.svg?react";
import LockIcon from "./svg/Lock.svg?react";
import MailIcon from "./svg/Mail.svg?react";
import PhoneIcon from "./svg/Phone.svg?react";

// ─── Helper ───────────────────────────────────────────────────────────────────
// Convenience so every connection declaration is one line.
function iconConnect(
  SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>,
  figmaUrl: string,
  name: string
) {
  figma.connect(Icon, figmaUrl, {
    props: {
      size: figma.enum("Size", {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 28,
        xl: 32,
      }),
      color: figma.string("Color"),
    },
    example: ({ size, color }) => (
      <Icon
        svg={SvgComponent}
        size={size ?? 24}
        color={color ?? "currentColor"}
        accessibilityLabel={name}
      />
    ),
  });
}

// ─── Icon connections ────────────────────────────────────────────────────────
// Replace the placeholder URLs with your actual Figma node URLs.

const FILE = "https://www.figma.com/design/FIGMA_FILE_KEY/Design-System";

iconConnect(HomeIcon,        `${FILE}?node-id=ICON_HOME`,         "Home");
iconConnect(SearchIcon,      `${FILE}?node-id=ICON_SEARCH`,       "Search");
iconConnect(BellIcon,        `${FILE}?node-id=ICON_BELL`,         "Bell");
iconConnect(SettingsIcon,    `${FILE}?node-id=ICON_SETTINGS`,     "Settings");
iconConnect(UserIcon,        `${FILE}?node-id=ICON_USER`,         "User");
iconConnect(HeartIcon,       `${FILE}?node-id=ICON_HEART`,        "Heart");
iconConnect(ArrowLeftIcon,   `${FILE}?node-id=ICON_ARROW_LEFT`,   "Arrow Left");
iconConnect(ArrowRightIcon,  `${FILE}?node-id=ICON_ARROW_RIGHT`,  "Arrow Right");
iconConnect(ChevronDownIcon, `${FILE}?node-id=ICON_CHEVRON_DOWN`, "Chevron Down");
iconConnect(ChevronRightIcon,`${FILE}?node-id=ICON_CHEVRON_RIGHT`,"Chevron Right");
iconConnect(CloseIcon,       `${FILE}?node-id=ICON_CLOSE`,        "Close");
iconConnect(MenuIcon,        `${FILE}?node-id=ICON_MENU`,         "Menu");
iconConnect(PlusIcon,        `${FILE}?node-id=ICON_PLUS`,         "Plus");
iconConnect(CheckIcon,       `${FILE}?node-id=ICON_CHECK`,        "Check");
iconConnect(InfoIcon,        `${FILE}?node-id=ICON_INFO`,         "Info");
iconConnect(WarningIcon,     `${FILE}?node-id=ICON_WARNING`,      "Warning");
iconConnect(StarIcon,        `${FILE}?node-id=ICON_STAR`,         "Star");
iconConnect(ShareIcon,       `${FILE}?node-id=ICON_SHARE`,        "Share");
iconConnect(BookmarkIcon,    `${FILE}?node-id=ICON_BOOKMARK`,     "Bookmark");
iconConnect(CameraIcon,      `${FILE}?node-id=ICON_CAMERA`,       "Camera");
iconConnect(MapIcon,         `${FILE}?node-id=ICON_MAP`,          "Map");
iconConnect(LockIcon,        `${FILE}?node-id=ICON_LOCK`,         "Lock");
iconConnect(MailIcon,        `${FILE}?node-id=ICON_MAIL`,         "Mail");
iconConnect(PhoneIcon,       `${FILE}?node-id=ICON_PHONE`,        "Phone");
