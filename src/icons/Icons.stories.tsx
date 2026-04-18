import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import type { IconSize } from "./Icon";

// ─── Navigation ───────────────────────────────────────────────────────────────
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

// ─── Action ───────────────────────────────────────────────────────────────────
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

// ─── Activities ───────────────────────────────────────────────────────────────
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

// ─── YuLife ───────────────────────────────────────────────────────────────────
import TodaysYuCoinIcon     from "./svg/TodaysYuCoin.svg?react";
import MapIcon              from "./svg/Map.svg?react";
import TrophyIcon           from "./svg/Trophy.svg?react";
import CoinStackIcon        from "./svg/CoinStack.svg?react";
import YugiHeadIcon         from "./svg/YugiHead.svg?react";
import ChestIcon            from "./svg/Chest.svg?react";
import TreasureChestIcon    from "./svg/TreasureChest.svg?react";
import UnityIcon            from "./svg/Unity.svg?react";
import LevelIcon            from "./svg/Level.svg?react";

// ─── Icon catalogue ───────────────────────────────────────────────────────────

type IconEntry = {
  name: string;
  export: string;
  component: React.FC<React.SVGProps<SVGSVGElement>>;
  category: string;
  tags: string;
};

const ALL_ICONS: IconEntry[] = [
  // Navigation
  { name: "Hamburger",        export: "HamburgerIcon",        component: HamburgerIcon,        category: "Navigation", tags: "menu list navigation sidebar drawer" },
  { name: "Check",            export: "CheckIcon",            component: CheckIcon,            category: "Navigation", tags: "done ready complete finish tick mark" },
  { name: "Left",             export: "LeftIcon",             component: LeftIcon,             category: "Navigation", tags: "arrow direction back previous navigate" },
  { name: "Right",            export: "RightIcon",            component: RightIcon,            category: "Navigation", tags: "arrow direction forward next navigate continue" },
  { name: "Up",               export: "UpIcon",               component: UpIcon,               category: "Navigation", tags: "arrow direction top navigate scroll" },
  { name: "Down",             export: "DownIcon",             component: DownIcon,             category: "Navigation", tags: "arrow direction bottom navigate scroll" },
  { name: "Close",            export: "CloseIcon",            component: CloseIcon,            category: "Navigation", tags: "exit x cancel dismiss remove" },
  { name: "Add",              export: "AddIcon",              component: AddIcon,              category: "Navigation", tags: "plus create new more increase" },
  { name: "Caret",            export: "CaretIcon",            component: CaretIcon,            category: "Navigation", tags: "arrow dropdown expand chevron select" },
  { name: "Bullet",           export: "BulletIcon",           component: BulletIcon,           category: "Navigation", tags: "dot point list item marker" },
  // Action
  { name: "Chat Help",        export: "ChatHelpIcon",         component: ChatHelpIcon,         category: "Action", tags: "chat help support question ask message assistance" },
  { name: "Log Out",          export: "LogOutIcon",           component: LogOutIcon,           category: "Action", tags: "leave exit sign out logout arrow" },
  { name: "Clock",            export: "ClockIcon",            component: ClockIcon,            category: "Action", tags: "time hour minute schedule timer watch" },
  { name: "Star Line",        export: "StarLineIcon",         component: StarLineIcon,         category: "Action", tags: "star favourite save bookmark important rating" },
  { name: "Settings Gear",    export: "SettingsGearIcon",     component: SettingsGearIcon,     category: "Action", tags: "settings configure gear tools preferences cog" },
  { name: "Info",             export: "InfoIcon",             component: InfoIcon,             category: "Action", tags: "information more read explain describe guide detail" },
  { name: "Status Info",      export: "StatusInfoIcon",       component: StatusInfoIcon,       category: "Action", tags: "status information notice alert blue" },
  { name: "Status Success",   export: "StatusSuccessIcon",    component: StatusSuccessIcon,    category: "Action", tags: "status success complete done check green ok" },
  { name: "Star Fill",        export: "StarFillIcon",         component: StarFillIcon,         category: "Action", tags: "star favourite saved bookmarked important rating filled" },
  { name: "Available Rewards",export: "AvailableRewardsIcon", component: AvailableRewardsIcon, category: "Action", tags: "rewards available gift claim earn voucher unlock" },
  { name: "Question Outline", export: "QuestionOutlineIcon",  component: QuestionOutlineIcon,  category: "Action", tags: "question help ask faq support unknown query" },
  { name: "Invite",           export: "InviteIcon",           component: InviteIcon,           category: "Action", tags: "add invite share join send friend refer" },
  { name: "World",            export: "WorldIcon",            component: WorldIcon,            category: "Action", tags: "globe world planet web site link international" },
  // Activities
  { name: "Streak",           export: "StreakIcon",           component: StreakIcon,           category: "Activities", tags: "days consecutive calendar challenge fire progress habit" },
  { name: "Wellbeing Hub",    export: "WellbeingHubIcon",     component: WellbeingHubIcon,     category: "Activities", tags: "health wellness centre dashboard portal hub resources benefits" },
  { name: "Heart",            export: "HeartIcon",            component: HeartIcon,            category: "Activities", tags: "love health favourite like care life" },
  { name: "Activity History", export: "ActivityHistoryIcon",  component: ActivityHistoryIcon,  category: "Activities", tags: "history log past activity record timeline progress" },
  { name: "Cycling",          export: "CyclingIcon",          component: CyclingIcon,          category: "Activities", tags: "bike bicycle wheels ride exercise sport fitness" },
  { name: "Mindfulness",      export: "MindfulnessIcon",      component: MindfulnessIcon,      category: "Activities", tags: "meditation mind calm breathe relax zen focus" },
  { name: "Fiit",             export: "FiitIcon",             component: FiitIcon,             category: "Activities", tags: "workout fitness exercise training gym hiit" },
  { name: "Yuniversity",      export: "YuniversityIcon",      component: YuniversityIcon,      category: "Activities", tags: "learn education course school study university yulife" },
  { name: "Yudoku",           export: "YudokuIcon",           component: YudokuIcon,           category: "Activities", tags: "puzzle game brain sudoku challenge" },
  { name: "Pig",              export: "PigIcon",              component: PigIcon,              category: "Activities", tags: "pig savings piggy bank money finance" },
  { name: "Smart Pension",    export: "SmartPensionIcon",     component: SmartPensionIcon,     category: "Activities", tags: "smart pension savings retirement finance" },
  { name: "Emotion",          export: "EmotionIcon",          component: EmotionIcon,          category: "Activities", tags: "mood feel happy sad feeling wellbeing mental health" },
  { name: "Account",          export: "AccountIcon",          component: AccountIcon,          category: "Activities", tags: "profile user person settings login identity" },
  { name: "Sleep",            export: "SleepIcon",            component: SleepIcon,            category: "Activities", tags: "rest night moon bed nap recovery wellness" },
  { name: "Plant",            export: "PlantIcon",            component: PlantIcon,            category: "Activities", tags: "tree nature plant esg green environment forest" },
  { name: "Calendar",         export: "CalendarIcon",         component: CalendarIcon,         category: "Activities", tags: "date schedule month planner events agenda time" },
  { name: "Drop",             export: "DropIcon",             component: DropIcon,             category: "Activities", tags: "water drop h2o drink hydrate humidity health" },
  { name: "Meal",             export: "MealIcon",             component: MealIcon,             category: "Activities", tags: "food nutrition eat diet health energy meal" },
  { name: "Plastic",          export: "PlasticIcon",          component: PlasticIcon,          category: "Activities", tags: "ocean plastic trash planet save esg waste rubbish" },
  // YuLife
  { name: "Todays YuCoin",   export: "TodaysYuCoinIcon",     component: TodaysYuCoinIcon,     category: "YuLife", tags: "yucoin coin daily today earn points reward" },
  { name: "Map",              export: "MapIcon",              component: MapIcon,              category: "YuLife", tags: "quest guide world journey navigate location explore" },
  { name: "Trophy",           export: "TrophyIcon",           component: TrophyIcon,           category: "YuLife", tags: "win winner achievement gold leaderboard prize" },
  { name: "Coin Stack",       export: "CoinStackIcon",        component: CoinStackIcon,        category: "YuLife", tags: "coins yucoins money points earn rewards balance" },
  { name: "Yugi Head",        export: "YugiHeadIcon",         component: YugiHeadIcon,         category: "YuLife", tags: "yugi character avatar head yulife mascot" },
  { name: "Chest",            export: "ChestIcon",            component: ChestIcon,            category: "YuLife", tags: "treasure reward loot yucoins prize achievement" },
  { name: "Treasure Chest",   export: "TreasureChestIcon",    component: TreasureChestIcon,    category: "YuLife", tags: "treasure chest reward loot yucoins prize achievement open" },
  { name: "Unity",            export: "UnityIcon",            component: UnityIcon,            category: "YuLife", tags: "team together community people collaboration social" },
  { name: "Level",            export: "LevelIcon",            component: LevelIcon,            category: "YuLife", tags: "level up progress achievement rank tier xp" },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Foundations/Iconography",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Iconography

51 line icons exported from the [App — Iconography](https://www.figma.com/design/sDuXCE69U5qvWYkOhEFHBd/App---Iconography) Figma file.
Organised into four categories: **Navigation**, **Action**, **Activities**, and **YuLife**.

All icons use \`currentColor\` and respond to any CSS colour value.

### Usage

\`\`\`tsx
import { Icon, HeartIcon } from "@/icons";

<Icon svg={HeartIcon} size={24} color="#DC2626" accessibilityLabel="Health" />
\`\`\`

### Sizes

| Token | px |
|-------|----|
| xs | 16 |
| sm | 20 |
| md | 24 (default) |
| lg | 28 |
| xl | 32 |

### Adding an icon

1. Export the SVG from Figma at 24 × 24.
2. Drop it in \`src/icons/svg/\`.
3. Add an export to \`src/icons/index.ts\`.
4. Add an entry to the \`ALL_ICONS\` array in \`Icons.stories.tsx\`.
5. Add a \`figma.connect()\` call in \`Icons.figma.ts\`.
        `,
      },
    },
  },
};

export default meta;

// ─── Gallery ─────────────────────────────────────────────────────────────────

function IconGallery({ size, color }: { size: IconSize; color: string }) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const categories = [...new Set(ALL_ICONS.map((i) => i.category))];

  const filtered = ALL_ICONS.filter(
    (icon) =>
      icon.name.toLowerCase().includes(query.toLowerCase()) ||
      icon.tags.includes(query.toLowerCase())
  );

  const grouped = categories.reduce<Record<string, IconEntry[]>>((acc, cat) => {
    const items = filtered.filter((i) => i.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  function handleCopy(entry: IconEntry) {
    navigator.clipboard
      .writeText(`import { ${entry.export} } from "@/icons";`)
      .then(() => {
        setCopied(entry.name);
        setTimeout(() => setCopied(null), 1800);
      });
  }

  return (
    <div style={{ padding: "24px", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ marginBottom: 24 }}>
        <input
          type="search"
          placeholder={'Search icons\u2026 (try \u201cheart\u201d, \u201carrow\u201d, \u201cmoon\u201d)'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: 440,
            padding: "10px 14px",
            fontSize: 14,
            border: "1.5px solid #E5E5E5",
            borderRadius: 8,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {Object.entries(grouped).map(([category, icons]) => (
        <div key={category} style={{ marginBottom: 40 }}>
          <h3
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#9CA3AF",
              marginBottom: 12,
              borderBottom: "1px solid #F3F4F6",
              paddingBottom: 8,
            }}
          >
            {category} <span style={{ fontWeight: 400 }}>({icons.length})</span>
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: 10,
            }}
          >
            {icons.map((icon) => (
              <button
                key={icon.name}
                title={`Click to copy import\nimport { ${icon.export} } from "@/icons";`}
                onClick={() => handleCopy(icon)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 8px 12px",
                  border: "1.5px solid",
                  borderColor: copied === icon.name ? "#0066FF" : "#F0F0F0",
                  borderRadius: 10,
                  background: copied === icon.name ? "#EFF6FF" : "#FAFAFA",
                  cursor: "pointer",
                  transition: "all 0.12s ease",
                }}
              >
                <Icon
                  svg={icon.component}
                  size={size}
                  color={copied === icon.name ? "#0066FF" : color}
                />
                <span
                  style={{
                    fontSize: 10,
                    color: copied === icon.name ? "#0066FF" : "#374151",
                    fontWeight: 500,
                    textAlign: "center",
                    lineHeight: 1.3,
                    wordBreak: "break-word",
                  }}
                >
                  {copied === icon.name ? "Copied!" : icon.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(grouped).length === 0 && (
        <p style={{ color: "#9CA3AF", textAlign: "center", marginTop: 48, fontSize: 15 }}>
          No icons match &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}

export const Gallery: StoryObj = {
  name: "Gallery",
  args: { size: 24, color: "#1A1A1A" },
  argTypes: {
    size: { control: { type: "select" }, options: [16, 20, 24, 28, 32], description: "Icon size in pixels" },
    color: { control: { type: "color" }, description: "Icon colour" },
  },
  render: (args) => (
    <IconGallery size={args.size as IconSize} color={args.color as string} />
  ),
};

// ─── Size scale ───────────────────────────────────────────────────────────────

export const SizeScale: StoryObj = {
  name: "Size Scale",
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 32, padding: 40, flexWrap: "wrap" }}>
      {([16, 20, 24, 28, 32] as IconSize[]).map((s) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Icon svg={HeartIcon} size={s} color="#1A1A1A" />
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>{s}px</span>
        </div>
      ))}
    </div>
  ),
  parameters: { docs: { description: { story: "Five canonical icon sizes." } } },
};

// ─── Colour variants ──────────────────────────────────────────────────────────

export const ColourVariants: StoryObj = {
  name: "Colour Variants",
  render: () => {
    const colours = [
      { label: "Default",  value: "#1A1A1A" },
      { label: "Primary",  value: "#0066FF" },
      { label: "Success",  value: "#16A34A" },
      { label: "Warning",  value: "#D97706" },
      { label: "Danger",   value: "#DC2626" },
      { label: "Muted",    value: "#9CA3AF" },
    ];
    return (
      <div style={{ display: "flex", gap: 24, padding: 40, flexWrap: "wrap" }}>
        {colours.map(({ label, value }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#F8F8F8", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #F0F0F0" }}>
              <Icon svg={HeartIcon} size={24} color={value} />
            </div>
            <span style={{ fontSize: 11, color: "#6B7280" }}>{label}</span>
            <span style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace" }}>{value}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: { docs: { description: { story: "Icons use `currentColor` and respond to any CSS colour." } } },
};
