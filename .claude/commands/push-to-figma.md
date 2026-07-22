# /push-to-figma — Convert a built React page into Figma frames

**Usage:** `/push-to-figma <path/to/PageFile.tsx> [target-section-id]`

**Examples:**
- `/push-to-figma src/pages/auth/LoginPage.tsx`
- `/push-to-figma src/pages/samples/SampleDetailPage.tsx 456:62774`

If no section ID is given, the agent will ask which section to place the frames in.

---

## What this command does

Takes an existing React page and creates pixel-accurate design frames in the Figma file
`M8dhfLpUEFGtBJlwrxMOY1` (Nusantics Research Dashboard).

Outputs at minimum:
1. **Desktop frame** — 1536×1024px
2. **Mobile frame** — 390×844px (if the page is responsive)

---

## Agent instructions

### Step 1 — Read the source file
Read the target `.tsx` file in full. Understand:
- Every section and layout region
- Which Helix components are used and with which props/variants
- Color tokens, spacing, typography in use
- State variations (loading, empty, error, filled)

### Step 2 — Screenshot the live preview
Take a browser screenshot of the running page at http://localhost:5173 to use as visual reference.
If the dev server is not running, start it first via the `nusantics-docs` launch config.

### Step 3 — Identify the target section
If no section ID was passed, ask:
> "Which Figma section should I place these frames in?"
> Show the options from CLAUDE.md.

Confirm the section exists by checking its children count.

### Step 4 — Calculate placement
Find the rightmost node in the target section and place new frames 80px to the right.

### Step 5 — Build frames incrementally in Figma
Use the `figma-use` skill + `use_figma` tool. Follow the incremental workflow:

**Call 1** — Create frame shell + header/nav region (set `placeholder = true` on sections not yet built)
**Call 2** — Build main content area, section by section
**Call 3** — Build secondary panels, sidebars, drawers if any
**Call 4** — Add status badges, tags, icons, data values
**Call 5** — Final screenshot + cleanup

**Figma build rules:**
- Always load fonts before creating text nodes:
  ```js
  await Promise.all([
    figma.loadFontAsync({ family: 'Rubik', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Rubik', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Rubik', style: 'SemiBold' }),
    figma.loadFontAsync({ family: 'Quicksand', style: 'Bold' }),
  ]);
  ```
- Find the target section via direct `section.children.find()`, never `page.findOne()` (too slow)
- Colors in 0–1 RGB range (not 0–255)
- Use `figma.createAutoLayout()` for any container with stacked children
- Return all created node IDs from every script
- Set `placeholder = false` on each section once it's built
- Take `await CARD.screenshot()` at the end of each call to verify

### Step 6 — Verify and report
Take a final screenshot of all created frames. Report:
- Node IDs of all created frames
- Figma URL to jump directly to the frames
- Any design tokens that couldn't be matched exactly (e.g., if Helix variables aren't published to this file)

---

## Design fidelity mapping (code → Figma)

| Code token | Figma equivalent |
|---|---|
| `--color-brand-primary` | Fill `#F57E20` (or bind to `color-brand-primary` variable if available) |
| `--color-text-primary` | Fill `#14141E` |
| `--color-text-secondary` | Fill `#49494A` |
| `--color-text-tertiary` | Fill `#828282` |
| `--color-container-primary` | Fill `#FFFFFF` |
| `--color-container-secondary` | Fill `#F7F7F7` |
| `--color-stroke-subtle` | Fill `#EEEEEE` (stroke) |
| `--color-stroke-default` | Fill `#D7D7D7` (stroke) |
| `--color-status-error-bg` | Fill `#FEE2E2` |
| `--color-status-success-bg` | Fill `#E9F9EF` |
| `--color-status-warning-bg` | Fill `#FEF5E7` |
| `--color-status-info-bg` | Fill `#EBF2FE` |
| `--spacing-{n}` | Direct px value (e.g. `--spacing-16` = 16px) |
| `--radius-lg` | cornerRadius 8px |
| `--radius-xl` | cornerRadius 12px |
| `--radius-2xl` | cornerRadius 16px |
| `--shadow-sm` | `drop_shadow: rgba(0,0,0,0.08) 0 1px 3px` |
