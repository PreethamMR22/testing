# Design Guidelines: Educational Animation Platform

## Design Approach
**Selected Approach:** Fluent Design System with custom educational twist
- Focus on depth, motion (minimal), and material without heavy assets
- Student-friendly interface with professional polish
- Futuristic aesthetic using gradients, glass-morphism effects, and geometric patterns

## Core Design Elements

### Typography
- **Primary Font:** Inter (Google Fonts CDN)
- **Display/Headers:** text-3xl to text-5xl, font-bold
- **Body Text:** text-base, font-normal
- **Accent Text:** font-semibold for CTAs and labels
- **Hierarchy:** Clear differentiation between prompts, video titles, quiz questions, and body content

### Layout System
**Spacing Units:** Tailwind units 4, 6, 8, 12, 16
- Container: max-w-7xl mx-auto
- Section padding: py-12 px-6
- Component gaps: gap-6 to gap-8
- Card padding: p-6 to p-8

### Component Library

**Navigation:**
- Fixed top navbar with backdrop-blur-md effect
- Sidebar (collapsible) with icon + text labels
- Mobile: Hamburger menu expanding to overlay

**Cards & Containers:**
- Elevated cards with subtle shadows (shadow-lg)
- Rounded corners: rounded-xl to rounded-2xl
- Glass-morphism effect for video placeholder: bg-white/10 backdrop-blur-lg border border-white/20

**Forms & Inputs:**
- Large prompt input with focus ring (ring-2 ring-blue-500)
- Rounded inputs: rounded-lg
- Placeholder text in muted tones

**Buttons:**
- Primary CTA: Large, rounded-full, with subtle gradient background
- Secondary: Outlined with border-2
- Icon buttons: Circular for actions (Download, Watch Again)
- Consistent hover: transform scale-105 transition

**Video Placeholder:**
- 16:9 aspect ratio container
- Animated gradient background or SVG pattern
- Centered icon (play symbol from Heroicons)
- Shimmer loading effect for generation state

**Notes Panel:**
- Collapsible accordion with smooth transitions
- Scrollable text area with custom scrollbar styling
- Download button with icon (Heroicons download icon)

**Quiz Cards:**
- Radio buttons styled as cards (border on hover/selected)
- Progress indicator showing question number
- Result modal with celebration/retry message

**Profile Dashboard:**
- Stats grid: 2x2 on desktop, stacked on mobile (grid-cols-1 md:grid-cols-2)
- Metric cards with large numbers and icons
- Timeline view for quiz history

**Browse Page:**
- List view with thumbnail placeholders (colored rectangles)
- Title + description for each dummy link
- Hover effects on list items

### Visual Effects (Minimal Usage)
- Hover states: subtle scale or shadow changes only
- Loading states: Simple pulse or shimmer on placeholder boxes
- Success feedback: Brief scale animation on quiz submission
- No complex animations to preserve performance

## Images
**No images required** - User explicitly requested no external assets. Use:
- SVG icons from Heroicons only
- CSS gradients for visual interest
- Geometric patterns with Tailwind utilities
- Placeholder colored rectangles for video thumbnails

## Accessibility
- High contrast text
- Focus visible states on all interactive elements
- Semantic HTML throughout
- ARIA labels on icon-only buttons
- Form labels properly associated with inputs