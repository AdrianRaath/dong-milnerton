# Dongfeng Data Files

This folder contains structured data files that define content for various pages on the Dongfeng website. These files serve as a "source of truth" for page content and can be used to generate or update HTML pages.

## How It Works

1. Each model has a JSON file in `data/models/` (e.g., `box.json`)
2. Each JSON file controls **two things**: the model's card on the home page and the model's landing page
3. When creating or updating a model page or home page card, reference the JSON file
4. The JSON structure dictates the content, order of sections, and all text/images

---

## Model Pages

Location: `data/models/[model-name].json`

### File Structure Overview

```json
{
  "id": "model-id",
  "name": "Model Name",
  "pageTitle": "Page title for browser tab",
  "previewImage": "images/car-models/model-id/colors/white.avif",
  "hero": { ... },
  "intro": { ... },
  "sections": [ ... ],
  "cta": { ... },
  "modal": { ... },
  "card": { ... }
}
```

**Note:** The `card` section is independent from the landing page sections. A model can have just a `card` (e.g., Nammi 06 - coming soon, no landing page yet) or both a `card` and full landing page content.

---

### Top-Level Fields

| Field | Description |
|-------|-------------|
| `id` | Unique identifier for the model (used in URLs, file naming) |
| `name` | Display name of the model |
| `pageTitle` | Full page title shown in browser tab |
| `previewImage` | Image used for the model in the nav dropdown and test drive modal (typically a color variant) |

---

### Hero Section

The main hero banner at the top of the page.

```json
"hero": {
  "title": "Box",
  "tagline": "Breaking Barriers to EV Fun",
  "backgroundImage": "images/car-models/box/hero/hero.avif",
  "buttons": {
    "primary": {
      "text": "Book Test Drive",
      "textShort": "Test Drive",
      "href": "#book"
    },
    "secondary": {
      "text": "Explore Box",
      "textShort": "Explore",
      "href": "#exterior"
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `title` | Large heading text |
| `tagline` | Subtitle beneath the title |
| `backgroundImage` | Hero background image (desktop) - also used for mobile hero image |
| `buttons.primary.text` | Primary button text (desktop) |
| `buttons.primary.textShort` | Primary button text (mobile) |
| `buttons.primary.href` | Primary button link |
| `buttons.secondary.text` | Secondary button text (desktop) |
| `buttons.secondary.textShort` | Secondary button text (mobile) |
| `buttons.secondary.href` | Secondary button link |

---

### Intro Section

Introduction area with text, stats, and an image.

```json
"intro": {
  "title": "Meet the Box",
  "paragraphs": [
    "First paragraph of intro text...",
    "Second paragraph of intro text..."
  ],
  "stats": [
    { "value": "430", "unit": "km", "label": "Range" },
    { "value": "70", "unit": "kWh", "label": "Battery Capacity" },
    { "value": "25", "unit": "min", "label": "Charging Time" }
  ],
  "image": {
    "src": "images/car-models/box/intro/intro.avif",
    "alt": "Dongfeng Box Interior"
  }
}
```

| Field | Description |
|-------|-------------|
| `title` | Section heading |
| `paragraphs` | Array of paragraph text (can have 1 or more) |
| `stats` | Array of stat objects with value, unit, and label |
| `image.src` | Path to intro image |
| `image.alt` | Alt text for intro image |

---

### Sections Array

The `sections` array controls the main content sections of the page. **The order of items in this array determines the order on the page.**

Each section has a `type` that determines how it renders:

#### Section Types

| Type | Description |
|------|-------------|
| `features` | Horizontal scrolling feature slider |
| `colors` | Color selector with swatches and car image |
| `safety` | Safety features grid (3 items) |

---

#### Feature Section (`type: "features"`)

Creates a horizontal scrolling slider of feature cards.

```json
{
  "type": "features",
  "id": "exterior",
  "title": "Design That Stands Out",
  "features": [
    {
      "title": "Crystal LED Headlights",
      "description": "Description text here...",
      "image": {
        "src": "images/car-models/box/exterior/crystal-led-headlights.avif",
        "alt": "Crystal LED Headlights"
      }
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `id` | Section ID (used for anchor links) |
| `title` | Section heading |
| `features` | Array of feature objects |
| `features[].title` | Feature card title |
| `features[].description` | Feature card description |
| `features[].image.src` | Feature image path |
| `features[].image.alt` | Feature image alt text |

**Notes:**
- You can have multiple feature sections (exterior, smart, comfort, etc.)
- Each feature section can have any number of features
- Common IDs: `exterior`, `smart`, `comfort`, `performance`, `technology`

---

#### Color Section (`type: "colors"`)

Creates a color selector with swatches and a car image that changes based on selection.

```json
{
  "type": "colors",
  "id": "colors",
  "title": "Find Your Perfect Colour",
  "subtitle": "Select from a range of stunning colours to match your style.",
  "basePath": "images/car-models/box/colors",
  "defaultColor": "white",
  "colors": [
    { "name": "white", "hex": "#f5f5f5", "title": "White" },
    { "name": "silver", "hex": "#c0c0c0", "title": "Silver" }
  ]
}
```

| Field | Description |
|-------|-------------|
| `id` | Section ID |
| `title` | Section heading |
| `subtitle` | Text beneath heading |
| `basePath` | Base folder path for color images |
| `defaultColor` | Which color is selected by default (matches `name`) |
| `colors[].name` | Color identifier (used for image filename: `{name}.avif`) |
| `colors[].hex` | Hex color code for the swatch |
| `colors[].title` | Display name shown on hover |

**Image naming:** Color images should be named `{basePath}/{name}.avif` (e.g., `images/car-models/box/colors/white.avif`)

---

#### Safety Section (`type: "safety"`)

Creates a grid of safety features with animated GIFs.

```json
{
  "type": "safety",
  "id": "safety",
  "title": "Safety First",
  "subtitle": "Your protection is our priority...",
  "features": [
    {
      "title": "Adaptive Cruise Control",
      "description": "Description text here...",
      "image": {
        "src": "images/car-models/box/safety/adaptive-cruise-control.gif",
        "alt": "Adaptive Cruise Control"
      }
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `id` | Section ID |
| `title` | Section heading |
| `subtitle` | Text beneath heading |
| `features` | Array of safety feature objects (typically 3) |

---

### CTA Section

Bottom call-to-action section.

```json
"cta": {
  "title": "Experience the Box for Yourself",
  "subtitle": "Ready to see what makes the Box special?...",
  "buttonText": "Book a Test Drive",
  "buttonHref": "#book",
  "image": {
    "src": "images/car-models/box/cta/cta-image.avif",
    "alt": "Dongfeng Box"
  }
}
```

---

### Modal Section

Test drive booking modal content.

```json
"modal": {
  "title": "Book a Test Drive",
  "subtitle": "Experience the Box for yourself. Fill in your details and we'll be in touch."
}
```

---

### Card Section (Home Page)

Controls how the model appears as a card in the home page model slider. This section is **independent** from the landing page sections - it only affects the home page.

```json
"card": {
  "title": "007",
  "subtitle": "Breaking Barriers to EV Performance",
  "image": {
    "src": "images/base/007-preview.avif",
    "alt": "Dongfeng 007"
  },
  "specs": [
    { "label": "Range", "value": "620 km" },
    { "label": "Battery", "value": "100 kWh" },
    { "label": "Charging", "value": "18 min" }
  ],
  "swatches": [
    { "hex": "#1a1a1a", "title": "Black" },
    { "hex": "#f5f5f5", "title": "White" }
  ],
  "status": "available",
  "pageUrl": "007.html"
}
```

| Field | Description |
|-------|-------------|
| `title` | Model name displayed on the card |
| `subtitle` | Category/tagline text beneath the model name |
| `image.src` | Preview image for the card background |
| `image.alt` | Alt text for preview image |
| `specs` | Array of key spec objects shown on hover overlay |
| `specs[].label` | Spec label (e.g., "Range", "Battery", "Charging") |
| `specs[].value` | Spec value with unit (e.g., "620 km") |
| `swatches` | Array of color swatches shown at bottom of card |
| `swatches[].hex` | Hex color code for the swatch circle |
| `swatches[].title` | Color name (shown on hover) |
| `status` | `"available"` or `"coming soon"` |
| `pageUrl` | URL to the model's landing page (set to `null` if no page exists yet) |

**Status behaviour:**

When `status` is `"coming soon"`:
- The model card's "Test Drive" and "Learn More" buttons are replaced with a single disabled "Coming Soon" button
- The model is **excluded** from the test drive modal's model selection grid (on all pages)
- The model is **excluded** from the `modelImages` map in `js/test-drive-modal.js`
- `pageUrl` should be set to `null`

When `status` is `"available"`:
- The model card shows "Test Drive" (with `data-model` attribute) and "Learn More" (linking to `pageUrl`) buttons
- The model appears in the test drive modal's model selection grid (on all pages)
- The model must have an entry in the `modelImages` map in `js/test-drive-modal.js`

**Other notes:**
- The `card` section can exist without landing page sections (e.g., for "coming soon" models)
- Card swatches may differ from the full color selector on the landing page (cards show a subset)
- Card specs may differ from intro stats (cards can show different values/labels)

---

## Creating a New Model Page

1. **Copy an existing JSON file:**
   ```
   data/models/box.json → data/models/new-model.json
   ```

2. **Update all content** in the new JSON file:
   - Change `id`, `name`, `pageTitle`
   - Update all image paths to point to the new model's images
   - Update all text content
   - Add, remove, or reorder sections as needed

3. **Create the image folder structure:**
   ```
   images/car-models/[model-name]/
   ├── hero/
   │   └── hero.avif
   ├── intro/
   │   └── intro.avif
   ├── exterior/
   │   └── [feature-images].avif
   ├── smart/
   │   └── [feature-images].avif
   ├── comfort/
   │   └── [feature-images].avif
   ├── safety/
   │   └── [feature-images].gif
   ├── colors/
   │   └── [color].avif
   └── cta/
       └── cta-image.avif
   ```

4. **Set the `card.status` field:**
   - Use `"coming soon"` if the model doesn't have a landing page yet (set `pageUrl` to `null`)
   - Use `"available"` once the landing page is ready (set `pageUrl` to the page filename)

5. **Update shared components:**
   - If `status` is `"available"`: add the model to the test drive modal grid on all pages, and add it to the `modelImages` map in `js/test-drive-modal.js`
   - If `status` is `"coming soon"`: ensure the model is excluded from the test drive modal and `modelImages`

6. **Request page generation** by asking Claude to read the JSON and create/update the HTML page.

---

## Image Naming Conventions

- Use lowercase with hyphens: `crystal-led-headlights.avif`
- Folders use lowercase with hyphens: `car-models/box/exterior/`
- Color images: Use the color name as filename: `white.avif`, `silver.avif`
- Safety features: Use `.gif` format for animated graphics
- Other images: Prefer `.avif` format for best compression

---

## Example: Reordering Sections

To change section order, simply rearrange the `sections` array:

**Before (Box default):**
```json
"sections": [
  { "type": "features", "id": "exterior", ... },
  { "type": "colors", ... },
  { "type": "features", "id": "smart", ... },
  { "type": "safety", ... },
  { "type": "features", "id": "comfort", ... }
]
```

**After (Colors at end):**
```json
"sections": [
  { "type": "features", "id": "exterior", ... },
  { "type": "features", "id": "smart", ... },
  { "type": "safety", ... },
  { "type": "features", "id": "comfort", ... },
  { "type": "colors", ... }
]
```

---

## Adding a New Section Type

When adding new section types in the future:

1. Define the JSON structure for the new section type
2. Document it in this README
3. Add the corresponding HTML/CSS pattern to the model page template

---

## Changelog

| Date | Change |
|------|--------|
| 2026-02-12 | Added `previewImage` field — single source for nav dropdown and test drive modal images |
| 2026-02-03 | Added `card` section for home page model cards (007, Box, Nammi 06) |
| 2026-01-22 | Initial documentation created for model page JSON structure |
