# Design System

This project uses a clean, warm, content-forward design. Interfaces should feel inviting, spacious, and purposeful.

---

## Stack

- **Framework:** Next.js App Router + React + TypeScript
- **Styling:** Tailwind CSS v4 via `@theme inline` in `app/globals.css`
- **Components:** shadcn-style primitives in `components/ui`
- **Icons:** Lucide React
- **Fonts:** IBM Plex Sans for UI, Fraunces for display headings, IBM Plex Mono for technical labels
- **Dark mode:** `next-themes`, class-based
- **Utilities:** `cn()` from `@/lib/utils`

---

## Color Palette

| Token | Light | Dark | Usage |
|---|---|---|---|
| `background` | `#FAF9F6` | `#111827` | Page canvas |
| `foreground` | `#1F2933` | `#F8FAFC` | Primary text |
| `primary` | `#F05A28` | `#F05A28` | Coral Orange — buttons, links, highlights |
| `secondary` | `#0F766E` | `#0F766E` | Deep Pine — alt sections, footer |
| `accent` | `#FFB703` | `#FFB703` | Amber — badges, icons, small accents |
| `success` | `#34A853` | `#34A853` | Fresh Green — stats, checkmarks |
| `card` | `#FFFFFF` | `#1E293B` | Content surfaces |
| `border` | `#E5E0D6` | `#334155` | Dividers, card borders |
| `muted` | `#F2EFE9` | `#1E293B` | Subtle backgrounds |

## Color Usage Guidelines

- **Coral Orange** is the hero color — use for primary CTAs, headline emphasis, active links, focus rings
- **Deep Pine** is the anchor color — use for footer, alternate section backgrounds, secondary buttons
- **Amber** is for small moments — badges, star ratings, decorative icons
- **Fresh Green** is for success states and impact numbers
- Use color sparingly — let whitespace do the heavy lifting
- Never use decorative backgrounds, patterns, or glassmorphism

---

## Typography

| Token | Font | Usage |
|---|---|---|
| `--font-body` | IBM Plex Sans | Body text, controls, forms |
| `--font-display-family` | Fraunces | Hero headings, card titles |
| `--font-code` | IBM Plex Mono | Labels, metadata |

Guidelines:
- Hero headings: Fraunces, tight tracking, large scale
- Card titles: Fraunces, `text-xl font-medium`
- Body: IBM Plex Sans, readable `leading-relaxed`
- Avoid uppercase/mono for large text blocks

---

## Components

### Cards
White with 1px border, rounded-2xl, no shadow by default.
Hover: subtle shadow, no translate.

### Buttons
Primary: Coral Orange fill, white text, rounded-xl.
Secondary: Deep Pine fill, white text, rounded-xl.
Outline: 1px border, transparent bg, hover fills with color.

### Inputs
White bg, 1px border, rounded-xl, Coral Orange focus ring.

---

## Layout

- Max container width: 1500px
- Sections separated by generous whitespace, never decorative backgrounds
- No grid textures, no blueprint patterns, no glass panels
- Mobile: single column. Desktop: up to 3-column grids where appropriate

---

## Interaction

- Hover lift: never — use color change instead
- Focus: Coral Orange ring at 3px
- Page entrance: `animate-fade-up` sparingly
- Keep motion subtle and purposeful
