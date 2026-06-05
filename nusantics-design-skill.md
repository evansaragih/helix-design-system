---
name: nusantics-design-skill
description: >
  Full-stack design system and UX skill for Nusantics products (Nusantics, CeKolam, Causa).
  Use for: screen design, prototyping, component specs, design tokens, color/typography/spacing
  systems, responsive grids, illustrations, data viz, micro-interactions, accessibility audits
  (WCAG), developer handoff, design briefs, UX principles, KPIs, north star vision, pattern
  library entries, heuristic evaluations, design critiques, and design ops. Always use this
  skill for any Nusantics design or UX work — brand constraints and multi-brand token
  architecture make it essential even for simple requests.
source: https://github.com/evansaragih/helix-design-system
---

# Nusantics / Helix Design System Skill

## Product Context

Nusantics is an Indonesian precision molecular diagnostics and microbiome biotech startup.
Three products share a unified **Helix Design System** (GitHub: `evansaragih/helix-design-system`).

| Product | Brand Persona | Primary Users | Brand Mode |
|---|---|---|---|
| **Nusantics** | Science-forward, clinical trust | Researchers, clinicians | `data-brand="nusantics"` (default) |
| **CeKolam** | Approachable, environmental | Aquaculture farmers, field officers | `data-brand="cekolam"` |
| **Causa** | Modern, analytical | Business analysts, product teams | `data-brand="causa"` |

All products are **website-first, mobile-responsive**.
Surfaces: admin dashboards, customer-facing portals, third-party integrations.

---

## Core Constraints (Always Enforce)

- ALWAYS use CSS custom properties — never hardcode hex values, font sizes, or spacing
- Use semantic tokens (`--color-*`, `--spacing-*`, `--radius-*`) in all components
- Brand switching via `data-brand="nusantics|cekolam|causa"` on root element
- Website-first layout; always define mobile breakpoints
- Follow the exact prop/variant API from `src/components/`
- No external UI libraries — build from Helix primitives only
- No hardcoded values in component specs or rendered code

---

## Token Architecture (3 Layers)

Source: `src/styles/theme.css`

### Layer 1 — Primitives (`--primitive-*`)
Raw color ramps. Never reference directly in components. Always go through a semantic token.

| Palette | Steps |
|---|---|
| `--primitive-orange-*` | 0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 |
| `--primitive-cekolam-primary-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-teal-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-denim-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-slate-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-steel-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-olive-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-charcoal-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-neutral-*` | 0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 |
| `--primitive-green/red/blue/yellow-*` | 0–100 |
| `--primitive-black` / `--primitive-white` | — |

### Layer 2 — Semantics (`--color-*`)
Purpose-named tokens. Always use these in components.

```
/* Text */
--color-text-primary:    #14141E   (body text)
--color-text-secondary:  #49494A   (subtitles)
--color-text-tertiary:   #828282   (captions)
--color-text-muted:      #9F9F9F   (disabled)
--color-text-on-primary: #FFFFFF   (on dark/colored surfaces)
--color-text-error:      #EF4444
--color-text-success:    #12843C
--color-text-warning:    #A66800
--color-text-info:       #014CC5
--color-text-brand-primary / secondary / tertiary  [brand-aware]

/* Backgrounds */
--color-bg-page: #FFFFFF  |  --color-bg-subtle: #EEEEEE
--color-bg-hover: #EEEEEE  |  --color-bg-inverse: #14141E
--color-bg-secondary: #F5F5F5

/* Containers */
--color-container-primary:    #FFFFFF
--color-container-secondary:  #F7F7F7
--color-container-tertiary:   #EEEEEE
--color-container-disabled:   #D7D7D7

/* Stroke / Border */
--color-stroke-default:   #D7D7D7
--color-stroke-subtle:    #EEEEEE
--color-stroke-hover:     #9F9F9F
--color-stroke-strong:    #49494A
--color-stroke-error:     #DC2626
--color-stroke-success:   #22C55E
--color-stroke-info:      #3B82F6
--color-stroke-neutral-20: rgba(255,255,255,0.2)   (inner border on solid buttons)

/* Input States */
--color-input-bg-default / hover / focus / disabled / error / success
--color-input-border-default / hover / focus* / error / success / disabled
--color-input-text-default / placeholder / disabled / error
(*focus is brand-aware)

/* Status Surfaces */
--color-status-brand-bg:    [brand-aware]
--color-status-error-bg:    #FEE2E2
--color-status-success-bg:  #E9F9EF
--color-status-warning-bg:  #FEF5E7
--color-status-info-bg:     #EBF2FE

/* Brand Tokens [brand-aware — resolved by data-brand] */
--color-brand-primary / hover / pressed
--color-brand-secondary / hover / pressed
--color-brand-tertiary / hover / pressed
--color-brand-primary-ring              (focus ring, 70% opacity)
--color-brand-primary-ghost-hover/focus
--color-destructive / hover / pressed   (NOT brand-aware, always #DC2626)
--color-btn-neutral / hover / pressed / border / text
--color-btn-invert / hover / pressed / border
--color-btn-disabled-bg / text
--color-shadow-brand-primary / secondary / tertiary

/* Shadows */
--shadow-sm / --shadow / --shadow-md / --shadow-lg
--color-shadow-neutral: rgba(0,0,0,0.08)
--color-overlay-black:  rgba(0,0,0,0.5)
--color-overlay-white:  rgba(255,255,255,0.1)
```

### Layer 3 — Brand Modes

| Token | Nusantics | CeKolam | Causa |
|---|---|---|---|
| `--color-brand-primary` | `#F57E20` | `#EB7323` | `#F57E20` |
| `--color-brand-secondary` | `#58595B` | `#089AAA` | `#434F6A` |
| `--color-brand-tertiary` | `#476142` | `#2B485E` | `#A4B8C4` |
| `--color-input-border-focus` | `#F57E20` | `#EB7323` | `#F57E20` |
| `--color-status-brand-bg` | `#FEF2E9` | `#FEF3EC` | `#FEF2E9` |

---

## Typography

```
--font-family-heading: 'Quicksand', sans-serif  (h1-h6, display)
--font-family-body:    'Rubik', sans-serif       (all other text)
--font-weight-regular: 400 / medium: 500 / semibold: 600 / bold: 700
--letter-spacing-default: -0.01em
```

| Token | Size | Usage |
|---|---|---|
| `--text-display-hero` | 76px | Hero |
| `--text-display-large` | 61px | Large display |
| `--text-heading-page-title` | 49px | h1 |
| `--text-heading-section-title` | 39px | h2 |
| `--text-heading-card-title` | 31px | h3 |
| `--text-heading-sub-section` | 25px | h4 |
| `--text-body-large` | 20px | Lead body |
| `--text-body-default` | 16px | Body |
| `--text-body-small` | 13px | Small/helper |
| `--text-caption-badge` | 10px | Badge labels |
| `--text-micro-legal` | 8px | Legal/micro |

Line heights: `--line-height-{size}` paired token (e.g. `--line-height-16` = 19.2px for 16px body).

---

## Spacing, Radius & Breakpoints

```
/* Spacing scale */
--spacing-0/2/4/6/8/12/16/20/24/32/40/48/64/80/96

/* Border Radius */
--radius-none: 0    --radius-xs: 2px   --radius-sm: 4px
--radius-md: 6px    --radius-lg: 8px   (inputs, dashboard buttons)
--radius-xl: 12px   --radius-2xl: 16px (cards, sheets, dialogs)
--radius-3xl: 24px  (dropdowns, popovers)
--radius-full: 9999px (landing page buttons, pills)

/* Breakpoints */
--container-sm: 640px  --container-md: 768px
--container-lg: 1024px  --container-xl: 1280px  --container-2xl: 1536px
```

---

## Keyframe Animations (defined in theme.css — do not redefine)

```
badge-spin    0.75s linear — spinner in Button, Badge
toast-in      opacity 0→1 + translateY(12px→0)
toast-out     opacity 1→0 + translateY(0→12px)
trace-border  SVG stroke-dashoffset reveal — floating Input focus border
```

---

## Component Library — 22 Components

All exported from `src/components/index.ts`.
Radix UI used internally: Accordion, Select, Tabs, Tooltip, Dialog.

---

### Button

```tsx
type ButtonVariant =
  'primary' | 'secondary' | 'tertiary' | 'destructive' | 'neutral' | 'invert' |
  'ghost-neutral' | 'ghost-brand' |
  'primary-outline' | 'secondary-outline' | 'tertiary-outline'

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

props: variant='primary', size='sm', loading, leadingIcon, trailingIcon, pill, disabled
```

| Size | Height | Font | Radius |
|---|---|---|---|
| xs | 24px | 11px | 6px |
| sm | 36px | 13px | 8px |
| md | 52px | 16px | 8px |
| lg | 64px | 20px | 10px |

Rules:
- Solid variants (primary/secondary/tertiary/destructive/invert): inner highlight `inset 0 0 0 1px rgba(255,255,255,0.2)`
- Focus ring: `0 0 0 3px var(--color-brand-*-ring)`
- Disabled: `--color-btn-disabled-bg` bg + `--color-btn-disabled-text` text; cursor not-allowed
- `pill=true`: border-radius 9999px (landing page context)
- Ghost/outline: transparent bg, uses `--color-brand-*-ghost-hover/focus` on interaction
- Loading: shows `badge-spin` spinner, hides icons and children label

---

### Input

```tsx
type InputSize = 'xs' | 'sm' | 'md' | 'lg'

props: size='md', floating, label, required, secondaryLabel,
       leadingContent, leadingDivider, trailingContent, trailingDivider,
       helperText, error, errorText, showCharCount
```

| Size | Height | Radius | Px |
|---|---|---|---|
| xs | 32px | 6px | 10px |
| sm | 38px | 6px | 12px |
| md | 42px | 8px | 12px |
| lg | 48px | 8px | 16px |

Rules:
- Floating variant: height 56px, label animates from vertical center (font 16px) to top-caption (font 10px) on focus/fill
- Floating focus: SVG `trace-border` animation traces the border path
- Error: bg `--color-input-bg-error`, border `--color-input-border-error`, trailing `AlertCircle` icon
- Focus border: `--color-input-border-focus` (brand-aware)
- Helper text: Rubik 12px `--color-text-tertiary`; error text: `--color-text-error`

---

### Badge

```tsx
type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' |
                   'blue' | 'green' | 'yellow' | 'red' | 'brand-subtle' | 'gray'
type BadgeSize = 'sm' | 'md' | 'lg' | 'xl'

props: label (required), variant='default', size='md', leadingIcon, trailingIcon,
       status (dot), loading (spinner), onClose (× button)
```

| Variant | bg | text |
|---|---|---|
| default | `--color-brand-primary` | `--color-text-on-primary` |
| destructive | `--color-status-error-bg` | `--color-destructive` |
| blue | `--color-status-info-bg` | `--color-text-info` |
| green | `--color-status-success-bg` | `--color-text-success` |
| yellow | `--color-status-warning-bg` | `--color-text-warning` |
| red | `--color-status-error-bg` | `--color-text-error` |
| secondary | `--color-container-secondary` | `--color-text-primary` (border: `--color-brand-secondary`) |
| outline | transparent | `--color-text-primary` (border: `--color-stroke-default 0.5px`) |

---

### Alert

```tsx
type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

props: variant='default', title (required), description, icon (override),
       badge, action, secondaryAction, onClose
```

| Variant | bg | border | icon | Default Icon |
|---|---|---|---|---|
| default | `--color-container-secondary` | `--color-stroke-subtle` | `--color-brand-primary` | Info |
| info | `--color-status-info-bg` | `--primitive-blue-10` | `--color-text-info` | Info |
| success | `--color-status-success-bg` | `--primitive-green-10` | `--color-text-success` | CheckCircle2 |
| warning | `--color-status-warning-bg` | `--primitive-yellow-20` | `--color-text-warning` | AlertTriangle |
| error | `--color-status-error-bg` | `--primitive-red-10` | `--color-destructive` | XCircle |

Layout: border-radius 12px, padding 16px, full width.
Icon: 20×20px. Title: Rubik 500 14px. Description: Rubik 400 13px `--color-text-secondary`.
Actions: primary filled `actionBg`, secondary transparent with variant border.

---

### Accordion

```tsx
type AccordionType = 'single' | 'multiple'
type AccordionStyle = 'default' | 'border' | 'card'

interface AccordionItem { id, title, content: ReactNode, disabled? }
props: items, type='single', accordionStyle='default', defaultValue
```

| Style | Container | Item separation | Trigger bg |
|---|---|---|---|
| default | none | border-bottom `--color-stroke-subtle` | transparent |
| border | `border: --color-stroke-default`, `--radius-lg` | border-bottom `--color-stroke-default` | transparent |
| card | flex-col gap 8px | full border `--color-stroke-subtle` + `--radius-lg` + `--shadow-sm` | `--color-container-primary` |

Trigger: Rubik 500 14px, padding 14px 16px, ChevronDown 16px (rotates via Radix data-state).
Content: Rubik 400 13px `--color-text-secondary`, padding `0 16px 16px`.
Disabled: trigger + icon use `--color-text-muted`.

---

### Select

```tsx
type SelectSize = 'sm' | 'md' | 'lg'
interface SelectOption { value, label, disabled? }
interface SelectGroup { label?, options: SelectOption[] }

props: options, groups (for grouped), value, defaultValue, onValueChange,
       placeholder='Select…', disabled, invalid, size='md',
       label, helperText, errorText, required
```

| Size | Height | Px | Radius |
|---|---|---|---|
| sm | 36px | 12px | 6px |
| md | 42px | 12px | 8px |
| lg | 48px | 16px | 8px |

Trigger: full-width, `--color-input-bg-default`, ChevronDown in `--color-text-tertiary`.
Invalid: border `--color-stroke-error`. Disabled: bg `--color-input-bg-disabled`.
Dropdown: white bg, border-radius 10px, `--shadow`, padding 4px, max-height 320px, z-index 9999.
Group label: Rubik 600 11px uppercase, `letter-spacing: 0.06em`, `--color-text-tertiary`.
Selected indicator: Check 14px in `--color-brand-primary`.

---

### Tabs

```tsx
type TabsStyle = 'primary' | 'line' | 'default'
type TabsSize = 'sm' | 'md'
type TabsType = 'default' | 'white'

interface TabItem { id, label, content?, disabled?, badge?, icon? }
props: items, tabStyle='primary', size='sm', type='default',
       defaultValue, value, onValueChange, renderContent=true
```

| Style | List bg | Active tab | Indicator |
|---|---|---|---|
| primary | `--color-container-tertiary` | white bg + `--shadow-sm` | none |
| line | transparent | transparent | 2px bottom border brand-primary |
| default | transparent | transparent | none |

Size sm: font 13px, py 6px, px 12px. Size md: font 14px, py 8px, px 16px.
Active color: `--color-brand-primary` (or white if `type="white"`).
Inactive: `--color-text-tertiary`. Disabled: `--color-text-muted`.
Badge count pill: 18px height, radius-full, bg brandColor, font 10px.

---

### Stepper

```tsx
type StepperOrientation = 'horizontal' | 'vertical'
type StepStatus = 'completed' | 'active' | 'pending' | 'error'

interface Step { id, label, description?, status?, icon? }
props: steps, orientation='horizontal', activeStep? (0-based, auto-derives status)
```

Step circle (32×32px, 50% radius):

| Status | bg | border | Content |
|---|---|---|---|
| completed | `--color-brand-primary` | `--color-brand-primary` | Check icon, white |
| active | `--color-brand-primary` | `--color-brand-primary` | index number, white |
| pending | `--color-container-tertiary` | `--color-stroke-default` | index number, `--color-text-muted` |
| error | `--color-status-error-bg` | `--color-stroke-error` | icon/index, `--color-text-error` |

Connector: 2px line; brand-primary if step completed, `--color-stroke-subtle` if pending.
Horizontal: connector `flex: 1` between circles with `padding-top: 15px`.
Vertical: connector `width: 2px, flex: 1, minHeight: 24px, margin-left: 15px`.
Label: Rubik 500 when active, 400 otherwise. 12px horizontal, 13px vertical.

---

### Table

```tsx
type TableSize = 'sm' | 'md'
interface Column<T> { key, header, render?, width?, align? }

props: columns, data, size='md', striped, hoverable=true, bordered=true,
       cellBorders, emptyText='No data', getRowKey
```

| Size | Cell py | Font |
|---|---|---|
| sm | 8px | 12px |
| md | 12px | 13px |

Cell px always 14px.
Thead: bg `--color-container-secondary`, Rubik 500, `--color-text-secondary`.
Tbody: Rubik 400, `--color-text-primary`.
Row border-bottom: `--color-stroke-subtle` (except last).
Outer wrapper: `--radius-lg`, border `--color-stroke-subtle`, `overflow: auto`.
Hover row: bg `--color-bg-hover`. Striped odd rows: `--color-container-secondary`.
Empty state: 32px py, centered, `--color-text-muted`.

---

### Dialog

```tsx
props: open, defaultOpen, onOpenChange, trigger, title, description,
       children (body), footer, size='md', showClose=true
```

| Size | Max width |
|---|---|
| sm | 384px |
| md | 480px |
| lg | 600px |

Overlay: `--color-overlay-black` + `backdrop-filter: blur(2px)`, z-index 9998.
Panel: white, `--radius-2xl` (16px), `--shadow-md`, z-index 9999, centered via transform.
Width: `min(sizeWidth, calc(100vw - 32px))` — mobile safe.
Header: padding `20px 24px 16px`, border-bottom `--color-stroke-subtle`.
Close button: 28×28px, `--radius-md`, border `--color-stroke-subtle`.
Body: padding `16px 24px`.
Footer: padding `12px 24px 20px`, border-top `--color-stroke-subtle`, `justify-content: flex-end`, gap 8px.
Title: Rubik 600 16px. Description: Rubik 400 13px `--color-text-tertiary`.

---

### Tooltip

```tsx
props: content, children (trigger), side='top', align='center',
       sideOffset=6, delayDuration=400, variant='dark', disabled

export const TooltipProvider = RadixTooltip.Provider  // wrap app root
```

| Variant | bg | text | border | shadow |
|---|---|---|---|---|
| dark | `--color-bg-inverse` | white | none | none |
| light | white | `--color-text-primary` | `--color-stroke-subtle` | `--shadow-sm` |

Padding: `6px 10px`, `--radius-md`, Rubik 400 12px, max-width 240px.
Arrow fill matches bg. Wrap app in `<TooltipProvider>` to enable.

---

### Card

```tsx
props: header, footer,
       elevation='sm' ('none'|'sm'|'default'|'md'),
       padding='md' ('none'|'sm'|'md'|'lg'),
       bordered=true, hoverable=false
```

| Padding | px |
|---|---|
| none | 0 |
| sm | 12px |
| md | 16px |
| lg | 24px |

Container: `--color-container-primary`, `--radius-2xl` (16px), border `--color-stroke-subtle`.
Header: padding `pad × pad × pad/2`, border-bottom `--color-stroke-subtle`.
Footer: padding `pad/2 × pad × pad`, border-top, bg `--color-container-secondary`.
Hoverable: `translateY(-1px)` + elevates to `--shadow` on hover.
Sub-components: `CardHeader` (mb 12px), `CardTitle` (Rubik 600 16px), `CardDescription` (Rubik 400 13px `--color-text-tertiary`).

---

### Switch

```tsx
props: checked, defaultChecked, disabled, invalid, onCheckedChange,
       label, helperText, size='md' ('sm'|'md')
```

| Size | Track W×H | Thumb | Offset |
|---|---|---|---|
| md | 44×24px | 18px | 3px |
| sm | 36×20px | 14px | 3px |

Track bg states: disabled→`--color-container-disabled`; invalid→`--color-status-error-bg`; checked→`--color-brand-primary`; hover→`--color-bg-subtle`; default→`--color-container-tertiary`.
Border: invalid→`--color-stroke-error`; checked→brand-primary; default→`--color-stroke-default`.
Thumb: white (checked), `--color-text-tertiary` (unchecked), `--color-text-muted` (disabled).
Thumb animation: `translateX(thumbTravel)` via `cubic-bezier(0.4,0,0.2,1) 0.2s`.

---

### Checkbox

```tsx
props: checked (bool|'indeterminate'), onChange, label, description,
       size='Medium' ('Medium'|'Small'), align='Left' ('Left'|'Right'),
       invalid, disabled
```

| Size | Box | Icon |
|---|---|---|
| Medium | 20×20px | 14px |
| Small | 16×16px | 12px |

bg/border states: disabled+checked→`--color-input-bg-disabled`; invalid+checked→`--color-destructive`; checked→`--color-brand-primary`; hover→border `#9F9F9F` + bg `rgba(0,0,0,0.02)`; default→transparent/`--color-input-border-default`.
Focus ring: `0 0 0 3px rgba(245,126,32,0.2)` (or red if invalid).
Indeterminate: renders `Minus` icon instead of `Check` (strokeWidth 3).
Hidden native `<input type="checkbox">` for accessibility.

---

### RadioButton & RadioGroup

```tsx
interface RadioButtonProps {
  label?, helperText?, invalid, size='md' ('sm'|'md'),
  disabled, checked, onChange
}

interface RadioGroupProps {
  name, value?, defaultValue?, onChange?, children (RadioButton nodes)
}
```

| Size | Circle | Dot |
|---|---|---|
| md | 20×20px | 8px |
| sm | 16×16px | 6px |

Border 2px; states: disabled→`--color-stroke-default`; invalid→`--color-stroke-error`; checked/focused→`--color-brand-primary`; hovered→`--color-stroke-hover`; default→`--color-stroke-default`.
Bg: checked→`--color-brand-primary`; disabled→`--color-container-disabled`; else white.
Inner dot: white (checked), `--color-text-muted` (disabled+checked).
Focus ring: `0 0 0 3px var(--color-brand-primary-ring)`.
RadioGroup: `role="radiogroup"`, flex-col gap 8px, auto-wires name/checked/onChange to children.

---

### ProgressBar

```tsx
type ProgressLabelType = 'none' | 'title' | 'trailing' | 'top-floating' | 'bottom-floating' | 'within'

props: value (0-100), max=100, labelType='none', label,
       color='--color-brand-primary', trackColor='--color-container-tertiary',
       height=8, animated, showPercent=true
```

| labelType | Layout |
|---|---|
| none | track only |
| title | label + percent row above track |
| trailing | track + percent inline right |
| top-floating | absolute pill above fill tip |
| bottom-floating | absolute pill below fill tip |
| within | percent inside fill (when pct > 8%) |

Track: radius-full, overflow hidden. Fill: animated `width 0.4s ease` if animated=true.
Floating pills: bg = fill color, white text, border-radius 4px, `padding: 2px 6px`, at `left: {pct}%`.

---

### Avatar

```tsx
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
type AvatarShape = 'circular' | 'rounded'
type AvatarContent = 'image' | 'icon' | 'placeholder'

props: size='md', shape='circular', content='placeholder',
       src, alt, initials (max 2), name (auto-derives initials), icon
```

| Size | px | Font | Icon | Rounded radius |
|---|---|---|---|---|
| xs | 24 | 10px | 12 | 4px |
| sm | 32 | 12px | 14 | 6px |
| md | 40 | 14px | 18 | 8px |
| lg | 48 | 16px | 22 | 10px |

Circular: radius-full. Placeholder bg: `--color-brand-primary`, white Rubik 500 text.
Icon bg: `--color-container-tertiary`, icon `--color-text-tertiary`.
Image: object-fit cover. Initials derived: first char of first + last word in name.

---

### Divider

```tsx
props: orientation='horizontal' ('horizontal'|'vertical'),
       type='line' ('line'|'dash'),
       label, labelAlign='center' ('left'|'center'|'right'),
       color='--color-stroke-default', thickness=1
```

Horizontal: full width, `border-bottom`.
Vertical: `align-self: stretch`, `border-left`.
Labeled: flex row with span borders + label text (Rubik 12px `--color-text-tertiary`).
Always include `role="separator"` + `aria-orientation`.

---

### Pagination

```tsx
props: total, pageSize=10, page (controlled), defaultPage=1,
       onPageChange, siblingCount=1, showFirstLast=false
```

Buttons: 32×32px min, border-radius 6px, Rubik 13px.
Active: bg `--color-brand-primary`, white, font 500, no border.
Inactive: transparent bg, `--color-text-secondary`, font 400.
Hover (inactive): bg `--color-container-tertiary`.
Disabled nav: `--color-text-muted`. Ellipsis: `MoreHorizontal` icon, non-interactive.
Smart page range: shows `[1, ..., siblings around current, ..., last]`.

---

### MenuItem, Command, InputOTP

Full prop APIs in source files. Key patterns match the system:
- MenuItem: used for nav items and command palette entries, token-based states
- Command: full searchable command palette, filterable list
- InputOTP: N-slot OTP input with token-based focus/error states

---

## Quick Reference: Common Tasks

### Screen Design
1. Set `data-brand="nusantics|cekolam|causa"` on root
2. Import `theme.css` (or inline `:root` variables)
3. Use semantic tokens only — zero hardcoded values
4. Desktop-first; mobile at `--container-md` / `--container-sm`

### New Component
1. Match variant + size API pattern from existing components
2. States: default → hover → focus → disabled → error
3. Solid variants: add inner highlight `inset 0 0 0 1px rgba(255,255,255,0.2)`
4. Focus ring: `0 0 0 3px var(--color-brand-*-ring)`
5. `pill` prop → `--radius-full` (landing page)

### Color Usage Rules
| Context | Token |
|---|---|
| Body text | `--color-text-primary` |
| Subtitles | `--color-text-secondary` |
| Captions | `--color-text-tertiary` |
| Disabled | `--color-text-muted` |
| Brand actions | `--color-brand-primary` |
| Danger | `--color-destructive` |
| Surfaces | `--color-container-primary/secondary/tertiary` |
| Status | `--color-status-{error/success/warning/info}-bg` + matching text token |

### Developer Handoff
- Reference token names, never hex values
- Annotate which tokens are brand-aware
- Include all interactive states + loading/error
- Reference keyframe names from `theme.css`
- Note `pill` vs default radius (landing vs dashboard context)

---

## Output Principles

- **Token-first**: Every visual value references a CSS custom property. State this explicitly.
- **Multi-brand ready**: Annotate which tokens resolve differently per brand mode.
- **Accessible by default**: Contrast ratios, ARIA roles, keyboard nav in every spec.
- **Handoff-complete**: Edge cases, loading/error states — not just happy paths.
- **Opinionated but documented**: Make a decision, explain the rationale in one sentence.
