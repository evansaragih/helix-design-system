# /figma-preview — Screenshot a Figma node

**Usage:** `/figma-preview <node-id>`

**Examples:**
- `/figma-preview 105:1206`
- `/figma-preview 835:689346`

---

## What this command does

Takes a screenshot of any node in the Nusantics Research Dashboard Figma file
and shows it inline so you can reference the design.

---

## Agent instructions

1. Parse the node ID from the argument (accept both `142:10723` and `142-10723` formats)
2. Call `get_screenshot` with:
   - `fileKey: "M8dhfLpUEFGtBJlwrxMOY1"`
   - `nodeId: <parsed-id>`
   - `maxDimension: 2048`
   - `enableBase64Response: true`
3. Display the screenshot inline
4. Report the node's natural canvas dimensions from the response metadata
5. If the node is a section, also list its direct children names and IDs for navigation

**Quick section IDs for reference:**
| Name | ID |
|---|---|
| Login and Registration | `142:10723` |
| Landing Page | `179:5038` |
| Run | `348:74280` |
| Validasi | `369:92575` |
| Analisis | `456:62774` |
| Analisis Lanjutan | `835:689346` |
