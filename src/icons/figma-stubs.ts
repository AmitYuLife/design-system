/**
 * Lightweight stub components for Figma Code Connect.
 *
 * The real icons are loaded via Vite's ?react SVG import (see index.ts).
 * The @figma/code-connect CLI cannot process Vite-specific import syntax,
 * so this file provides named stub components with the same interface that
 * Code Connect can parse and upload to Figma without Vite in the pipeline.
 */
import type { FC, SVGProps } from "react";

const mkStub = (): FC<SVGProps<SVGSVGElement>> =>
  (): null => null;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const HamburgerIcon        = mkStub();
export const CheckIcon            = mkStub();
export const LeftIcon             = mkStub();
export const RightIcon            = mkStub();
export const UpIcon               = mkStub();
export const DownIcon             = mkStub();
export const CloseIcon            = mkStub();
export const AddIcon              = mkStub();
export const CaretIcon            = mkStub();
export const BulletIcon           = mkStub();

// ─── Action ───────────────────────────────────────────────────────────────────
export const ChatHelpIcon         = mkStub();
export const LogOutIcon           = mkStub();
export const ClockIcon            = mkStub();
export const StarLineIcon         = mkStub();
export const SettingsGearIcon     = mkStub();
export const InfoIcon             = mkStub();
export const StatusInfoIcon       = mkStub();
export const StatusSuccessIcon    = mkStub();
export const StarFillIcon         = mkStub();
export const AvailableRewardsIcon = mkStub();
export const QuestionOutlineIcon  = mkStub();
export const InviteIcon           = mkStub();
export const WorldIcon            = mkStub();

// ─── Activities ───────────────────────────────────────────────────────────────
export const StreakIcon           = mkStub();
export const WellbeingHubIcon     = mkStub();
export const HeartIcon            = mkStub();
export const ActivityHistoryIcon  = mkStub();
export const CyclingIcon          = mkStub();
export const MindfulnessIcon      = mkStub();
export const FiitIcon             = mkStub();
export const YuniversityIcon      = mkStub();
export const YudokuIcon           = mkStub();
export const PigIcon              = mkStub();
export const SmartPensionIcon     = mkStub();
export const EmotionIcon          = mkStub();
export const AccountIcon          = mkStub();
export const SleepIcon            = mkStub();
export const PlantIcon            = mkStub();
export const CalendarIcon         = mkStub();
export const DropIcon             = mkStub();
export const MealIcon             = mkStub();
export const PlasticIcon          = mkStub();

// ─── YuLife ───────────────────────────────────────────────────────────────────
export const TodaysYuCoinIcon     = mkStub();
export const MapIcon              = mkStub();
export const TrophyIcon           = mkStub();
export const CoinStackIcon        = mkStub();
export const YugiHeadIcon         = mkStub();
export const ChestIcon            = mkStub();
export const TreasureChestIcon    = mkStub();
export const UnityIcon            = mkStub();
export const LevelIcon            = mkStub();
