# NavigationHeader

A mobile navigation header that is **always fixed to the top of the screen** (`position: fixed; top: 0; left: 0; z-index: 100`) and **fills the full viewport width**. It faithfully mimics the iOS chrome (status bar + navigation bar) and provides flexible composition slots for prototyping any screen type.

Figma sources:
- [YuLife App Storybook → NavigationHeader](https://www.figma.com/design/ERkTigxQV1eQ7jooI8pgQp/YuLife-App-Storybook?node-id=10326-1244)
- [Quests Spec → default presentation](https://www.figma.com/design/0HSQn32wFWy1D9duTZMr3Y/Quests--Spec-?node-id=127-11183)

---

## Anatomy

```
┌─────────────────────────────────────────┐  ← root (375 px wide)
│  9:41                        ▲ ◈ ▓     │  ← StatusBar  (44 px, aria-hidden)
│                                         │
│  [leftSlot]        [yu]    [rightSlot]  │  ← NavigationBar (40 px)
│                                         │
│  [subNavSlot ─ 8 px gutter]            │  ← SubNav strip
└─────────────────────────────────────────┘
```

| Zone | Height | Notes |
|------|--------|-------|
| Status bar | 44 px | Static mock: always shows "9:41", full signal, Wi-Fi, battery |
| Navigation bar | 40 px | Three absolute zones: left, centre logo, right |
| Sub-nav strip | 8 px | Empty by default; accepts `subNavSlot` |
| **Total** | **92 px** | |

---

## Variants

Four Figma-defined variants are controlled by three boolean props.

| Variant (Figma name) | `background` | `shadow` | `darkMode` | When to use |
|---|---|---|---|---|
| Background=Off, Shadow=Off, Dark Mode=Off | `false` | `false` | `false` | Over white/light screens — header is transparent |
| Background=On, Shadow=Off, Dark Mode=Off | `true` | `false` | `false` | Header needs a white fill but no divider |
| Background=On, Shadow=On, Dark Mode=Off | `true` | `true` | `false` | Content scrolls beneath the header |
| Background=Off, Shadow=Off, Dark Mode=On | `false` | `false` | `true` | Over dark or image-heavy backgrounds |

> `shadow` has no visible effect when `background` is `false`.

---

## Default presentation

As seen in the Quests screen: hamburger icon left, YuCoin balance right, transparent background over illustrated content.

```tsx
import { NavigationHeader } from "@/components";
import { Icon, HamburgerIcon, TodaysYuCoinIcon } from "@/icons";
import { colors, fontFamily } from "@/tokens";

<NavigationHeader
  leftSlot={
    <Icon svg={HamburgerIcon} size={24} color={colors.textPrimary} accessibilityLabel="Open menu" />
  }
  rightSlot={
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontFamily: fontFamily.sans, fontSize: 18, color: colors.textPrimary }}>
        123,131
      </span>
      {/* Replace with dedicated YuCoin colour nav icon when available */}
      <Icon svg={TodaysYuCoinIcon} size={24} color={colors.textPrimary} accessibilityLabel="YuCoin" />
    </div>
  }
/>
```

## API

```tsx
import { NavigationHeader } from "@/components";

<NavigationHeader
  background={false}
  shadow={false}
  darkMode={false}
  leftSlot={<node />}
  rightSlot={<node />}
  subNavSlot={<node />}
  style={{}}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `boolean` | `false` | White background fill |
| `shadow` | `boolean` | `false` | Bottom shadow (`0 2px 0 rgba(0,0,0,0.08)`). Requires `background` |
| `darkMode` | `boolean` | `false` | White icons and time text; monochrome YuLife logo. Use on dark/image backgrounds |
| `leftSlot` | `ReactNode` | — | Left zone of the nav bar |
| `rightSlot` | `ReactNode` | — | Right zone of the nav bar |
| `subNavSlot` | `ReactNode` | — | 8 px strip below the nav bar |
| `style` | `CSSProperties` | — | Overrides root styles (e.g. to disable fixed positioning in tests) |

> The component sets `position: fixed; top: 0; left: 0; z-index: 100` by default. Override via `style` only when a non-fixed context is genuinely needed.

---

## Usage guidelines

### Choosing a variant

**Use transparent (`background=false`)** when the header sits directly above a solid white or pale screen background — this is the lightest-weight option and avoids a double-white stack.

**Use `background=true`** when the content behind the header is visually busy (cards, illustrations, mixed colours) and you need the header to be clearly legible on its own plane.

**Add `shadow=true`** when body content scrolls *beneath* the header. The `0 2px 0 rgba(0,0,0,0.08)` shadow communicates elevation and separates the fixed header from the scrolling layer.

**Use `darkMode=true`** for screens where the header overlays a dark background, a full-bleed photograph, or a video. The status bar, icons, and YuLife logo all switch to white.

### Composing slots

Both `leftSlot` and `rightSlot` accept any React node. Use the shared `Icon` component and `colors.textPrimary` / `colors.textInverse` for consistent icon colours:

```tsx
import { Icon, LeftIcon, CloseIcon } from "@/icons";
import { colors } from "@/tokens";

// Light mode — back + close
<NavigationHeader
  background
  shadow
  leftSlot={
    <>
      <Icon svg={LeftIcon} size={24} color={colors.textPrimary} accessibilityLabel="Back" />
      <span style={{ color: colors.textPrimary, fontSize: 16 }}>Back</span>
    </>
  }
  rightSlot={
    <Icon svg={CloseIcon} size={24} color={colors.textPrimary} accessibilityLabel="Close" />
  }
/>

// Dark mode — use textInverse for all slot content
<NavigationHeader
  darkMode
  leftSlot={
    <Icon svg={LeftIcon} size={24} color={colors.textInverse} accessibilityLabel="Back" />
  }
/>
```

### Sub-nav strip

The 8 px `subNavSlot` sits below the nav bar. Use it for:

- A tab underline / active indicator strip
- A thin progress bar (e.g. onboarding step progress)
- A `<hr>`-style divider with a custom colour

```tsx
// Progress indicator example
<NavigationHeader
  background
  subNavSlot={
    <div
      style={{
        height: 4,
        width: "60%",
        backgroundColor: colors.actionPrimary,
        borderRadius: 2,
      }}
    />
  }
/>
```

Leave `subNavSlot` empty (the default) when no sub-navigation is needed.

---

## Do / Don't

**Do** — let the header fill the full viewport width naturally. It uses `width: 100%` and `position: fixed`, so it will always span the screen.

**Don't** — nest another header or app bar inside the `subNavSlot`. That area is 8 px tall — it is a micro-slot, not a secondary navigation region.

**Do** — use `colors.textInverse` for all icons and labels in `leftSlot` / `rightSlot` when `darkMode` is true.

**Don't** — leave dark-coloured slot content (e.g. `colors.textPrimary`) in a `darkMode` header; the contrast against a dark background will fail WCAG AA.

**Do** — keep the number of items in each slot small (1–2 icons or an icon + label). The nav bar is 40 px tall and the slots sit alongside the centred logo.

---

## Accessibility

- The root element carries `role="banner"` — one per page, matching the semantic landmark.
- The navigation bar `<div>` carries `role="navigation"` with `aria-label="App navigation"`.
- The status bar is `aria-hidden` — it is decorative chrome, not real system state.
- All `Icon` components in slots should receive `accessibilityLabel` for screen reader support.
- The YuLife logo has `role="img"` with `aria-label="YuLife"`.

---

## Assets

| Asset | Source | Location |
|-------|--------|----------|
| YuLife square logo (colour) | [Figma Logo Library](https://www.figma.com/design/iQLdjAJ8VksxGwwLGA2qaZ/Logo-Library?node-id=1354-667) | `src/icons/svg/YuLifeSquareColour.svg` |
| YuLife square logo (mono/white) | [Figma Logo Library](https://www.figma.com/design/iQLdjAJ8VksxGwwLGA2qaZ/Logo-Library?node-id=1354-669) | `src/icons/svg/YuLifeSquareMono.svg` |

Both logos are also exported from `@/icons` as `YuLifeSquareColourIcon` and `YuLifeSquareMonoIcon` for use outside the header.
