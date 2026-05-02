# AURA AI — Design Brief

**Purpose**: Premium AI-powered personal assistant helping users manage daily routines, goals, and productivity with luxury experience.

**Tone & Differentiation**: Refined minimalism + futuristic technology. Gold-on-black luxury aesthetic avoiding generic tech defaults. Every surface intentional; no decoration without purpose.

## Color Palette (OKLCH)

| Role | Light | Dark | Notes |
|------|-------|------|-------|
| Background | 0.98 0 0 (cream) | 0.08 0 0 (near-black) | Deep black for premium feel |
| Foreground | 0.15 0 0 (dark) | 0.95 0 0 (near-white) | Maximum contrast |
| Primary (Gold) | 0.70 0.14 58 | 0.70 0.14 58 | Metallic gold (#D4AF37 equiv.) |
| Secondary (Soft Gold) | 0.88 0.08 50 | 0.18 0 0 | Subtle accent for light mode |
| Card | 0.96 0 0 (light) | 0.12 0 0 (charcoal) | Glassmorphism base |
| Border | 0.92 0 0 (light) | 0.22 0 0 (dark) | Subtle dividers |
| Destructive | 0.55 0.22 25 | 0.65 0.19 22 | Warm red for errors |

## Typography

**Display**: Space Grotesk (400–700) — geometric, futuristic, all headings & logo  
**Body**: Figtree (400–700) — clean, highly legible, all body copy & UI labels  
**Mono**: System monospace — code blocks, timestamps

**Scale**: 12px, 14px, 16px, 20px, 24px, 32px, 48px (hierarchy via size + weight)

## Elevation & Depth

| Zone | Treatment | Radius |
|------|-----------|--------|
| Background | Solid near-black (dark) or cream (light) | — |
| Cards/Containers | Glassmorphism: semi-transparent with backdrop blur (12px) + subtle border | 8px |
| Popover/Modal | Float above, increased blur & opacity | 12px |
| Buttons | Flat base + gold glow on active/hover | 6px |
| Input Fields | Minimal border + glow on focus | 6px |

## Structural Zones

| Zone | Light Mode | Dark Mode (Primary) | Purpose |
|------|-----------|-------------------|----------|
| Header | `bg-card` with border-b | `bg-card` subtle outline | Navigation, AURA AI logo |
| Sidebar | `bg-background` or `bg-muted/5` | `bg-background` | Routine tabs, quick nav |
| Content | `bg-background` cards stacked | `bg-background` with `bg-card` regions | Main routines, AI chat |
| Accent Highlight | Gold gradient text + glow | Gold gradient text + glow | Logo, active section title |
| Footer | `bg-muted/30` with border-t | `bg-muted/20` with border-t | Stats, motivational footer |

## Motion & Animation

- **Page Fade-in**: 500ms ease-out, opacity + slight translateY(4px)
- **Card Slide-in**: 300ms ease-out, translateX from -8px
- **Glow Pulse**: 2s infinite ease-in-out, box-shadow oscillation on active elements
- **Transition Default**: 300ms cubic-bezier(0.4, 0, 0.2, 1) for all interactive hover/focus
- **Button Press**: Ripple effect (inset glow intensifies briefly)

## Signature Details

1. **Gold Gradient Logo**: "AURA AI" text uses `gradient-gold-text` class (135° gradient from primary to secondary, clipped to text)
2. **Glassmorphism Cards**: `glassmorphism` utility: 80% opacity + 12px backdrop blur + 0.3-opacity border
3. **Gold Aura Glow**: `gold-glow` on interactive: 16px shadow + inset highlight; `gold-glow-lg` on hover (24px shadow)
4. **No Harsh Shadows**: All shadows use gold-tinted soft glow, never black/grey
5. **Minimal Radii**: 8px cards, 6px buttons—sharp enough to feel modern, soft enough to feel premium

## Component Patterns

- **Buttons**: Flat + border (transparent base) with gold border on hover, gold glow on active
- **Input**: Minimal border (0.5px) + glassmorphism on focus, gold glow when focused
- **Task Cards**: Glassmorphism with left border accent (gold when active)
- **Chat Bubble**: User (right-aligned, gold glow background) vs Assistant (left-aligned, card background)
- **Progress Bar**: Gold gradient fill with fade-in animation
- **Header Logo**: Space Grotesk 32px, gradient-gold-text, letter-spacing +1px

## Constraints

- No raw hex colors or named colors—only OKLCH tokens
- All shadows = gold-tinted or neutral, never harsh black
- No arbitrary blur or decoration—every visual element serves function
- Glassmorphism only on cards/popovers, not full-page backgrounds
- Dark mode is primary (optimized for evening/night usage); light mode uses same palette adjusted for day
- Typography never scales below 14px (body); 12px only for metadata/timestamps

## Responsive Breakpoints

Mobile-first (320px) → sm (640px) → md (768px) → lg (1024px) → xl (1280px) → 2xl (1536px)  
Card grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)

## Accessibility

- Foreground-on-background contrast ≥ 7:1 (WCAG AAA)
- Gold primary only on interactive elements or accents; never as sole affordance indicator
- Reduced motion: disable animations if `prefers-reduced-motion: reduce`
- Focus states: gold glow + visible outline
