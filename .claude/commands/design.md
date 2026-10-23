# /design — Generate a new page or component

**Usage:** `/design <description of the screen or component you want>`

**Examples:**
- `/design a sample detail page with status timeline and quality metrics`
- `/design a notification center with read/unread tabs and filter chips`
- `/design a settings page with profile, institution, and API key sections`
- `/design a data export dialog with format selector and date range picker`

---

## What this command does

1. **Understands** what screen/component you want, including layout, interactions, and data
2. **Generates** the React/TypeScript file using only Helix Design System components and tokens
3. **Wires** it into the app so you can preview it immediately
4. **Previews** it live at http://localhost:5173
5. **Optionally pushes** it to Figma (asks you at the end)

---

## Agent instructions

When this command is invoked:

### Step 1 — Clarify (if needed)
If the description is ambiguous, ask ONE focused question before generating. Skip if intent is clear.

### Step 2 — Plan the layout
Before writing code, describe the layout in 3–5 bullet points:
- What sections does the page have?
- What Helix components will be used?
- What data/state does it need?

### Step 3 — Generate the code
Write the full React/TypeScript component to `src/pages/<feature>/<PageName>.tsx`.

**Non-negotiable rules for generated code:**
- `data-brand="nusantics"` on the root div
- Import components ONLY from `@/components` — no external UI libraries
- Every color, spacing, font-size, radius uses a CSS custom property (`--color-*`, `--spacing-*`, etc.)
- Zero hardcoded hex values, px sizes, or font sizes inline
- Desktop layout with `@media (max-width: 768px)` mobile override where needed
- Include realistic placeholder data (no "Lorem ipsum", use real Indonesian research context)
- Include all meaningful states: loading, empty, error where applicable

**File template:**
```tsx
// src/pages/<feature>/<PageName>.tsx
import { useState } from 'react';
import { /* Helix components */ } from '@/components';

export function <PageName>Page() {
  return (
    <div data-brand="nusantics" style={{ /* use --spacing-* tokens */ }}>
      {/* content */}
    </div>
  );
}
```

### Step 4 — Wire into App
Add the new section to `src/app/App.tsx`:
- Add a new section ID (e.g. `'sample-detail'`)
- Import and render the new page in `MainContent.tsx` or directly in App

### Step 5 — Start preview and verify
- Run the dev server via the `nusantics-docs` launch config
- Take a screenshot to verify the layout
- Check for console errors
- Iterate on any layout issues

### Step 6 — Offer Figma push
After a successful preview, ask:
> "✅ Preview looks good. Want me to push this to Figma? If yes, which section should I place it in?"
> Options: Landing Page (179:5038), Analisis (456:62774), Validasi (369:92575), Analisis Lanjutan (835:689346), or a new section.

If yes, run `/push-to-figma` automatically.

---

## Design quality checklist (verify before reporting done)
- [ ] All text uses `--color-text-*` tokens
- [ ] All backgrounds use `--color-container-*` or `--color-bg-*` tokens
- [ ] Buttons use `variant=` prop — no custom button styles
- [ ] Form fields use `<Input>` component with appropriate `size=` and `error=` states
- [ ] Cards use `<Card>` component with `elevation=` and `padding=` props
- [ ] Status colors use `--color-status-*` tokens (not raw greens/reds)
- [ ] Loading states are handled (Button `loading=`, Spinner, skeleton-like containers)
- [ ] No hardcoded pixel values in inline styles
