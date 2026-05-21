# Nusantics Research Dashboard — Agent Context

## What this project is
The **Nusantics Research Dashboard** frontend, built on the **Helix Design System**.
- Stack: React 18 + TypeScript + Vite + Tailwind CSS 4
- Component library: `src/components/` (22 Helix primitives)
- Design token source: `src/styles/theme.css`
- Figma file: `M8dhfLpUEFGtBJlwrxMOY1` (Nusantics Research Dashboard)
- Dev server: `npm run dev` → http://localhost:5173

## Design System Rules (always enforce)
- **Zero hardcoded values.** Every color, spacing, radius, font-size must use a CSS custom property.
- Brand-aware tokens are resolved by `data-brand="nusantics"` on the root element.
- Semantic token layer: `--color-*`, `--spacing-*`, `--radius-*`, `--text-*`, `--font-*`
- Never reference `--primitive-*` tokens directly in components — always go through semantics.
- All layouts are desktop-first with mobile breakpoint at `768px`.

## Key semantic tokens (quick reference)
```
Text:       --color-text-primary / secondary / tertiary / muted / on-primary
Brand:      --color-brand-primary (#F57E20) / hover / pressed / ring
Surfaces:   --color-container-primary / secondary / tertiary
Strokes:    --color-stroke-default / subtle / hover / strong
Status:     --color-status-{error/success/warning/info}-bg
Inputs:     --color-input-bg-default / --color-input-border-focus (brand-aware)
Spacing:    --spacing-{0/2/4/6/8/12/16/20/24/32/40/48/64/80/96}
Radius:     --radius-{none/xs/sm/md/lg/xl/2xl/3xl/full}
Shadows:    --shadow-sm / --shadow / --shadow-md / --shadow-lg
Typography: --font-family-heading (Quicksand) / --font-family-body (Rubik)
```

## Component imports
```tsx
import { Button, Input, Card, Badge, Alert, Tabs, Select, Dialog,
         Accordion, Table, Stepper, Tooltip, TooltipProvider,
         Switch, Checkbox, RadioButton, RadioGroup,
         ProgressBar, Avatar, Divider, Pagination,
         InputOTP, MenuItem, Command, Spinner } from '@/components';
```

## Page file conventions
- New pages: `src/pages/<feature>/<PageName>.tsx`
- Export from page file directly (no barrel re-export needed)
- Wire into App.tsx with a new section ID or auth gate

## Authentication gate
`src/app/App.tsx` renders `<LoginPage onAuthenticated=...>` when `isAuthenticated === false`.

## Design-to-Figma workflow
Use the `/design` slash command to generate a new page/screen.
Use the `/push-to-figma` slash command to convert the current code into a Figma frame.
Use the `/figma-preview` slash command to take a screenshot of an existing Figma node.

## Figma file structure (Design page sections)
| Section | ID | Description |
|---|---|---|
| Login and Registration | `142:10723` | Auth flows |
| Landing Page | `179:5038` | Beranda / dashboard home |
| Analisis Lanjutan | `835:689346` | Advanced analysis screens |
| Validasi | `369:92575` | Sample validation screens |
| Analisis | `456:62774` | Analysis screens |
| Run | `348:74280` | Run management |

## Agent slash commands
| Command | Description |
|---|---|
| `/design <description>` | Generate a new page/component from a description, preview it live |
| `/push-to-figma <file> [section-id]` | Push a built React page to Figma as design frames |
| `/figma-preview <node-id>` | Screenshot a Figma node and show it |
