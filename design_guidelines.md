# Design Guidelines: Cyberpunk Terminal Portfolio

## Design Approach
**Reference-Based:** Drawing inspiration from modern cyberpunk aesthetics (Cyberpunk 2077 UI, Blade Runner interfaces) combined with terminal/hacker culture. Key influences: neon accent lighting, glitch effects, monospace typography, and dark themes with high contrast.

## Core Design Principles
- Terminal-first aesthetic with modern polish
- High contrast with strategic neon accents
- Continuous subtle motion and interactivity
- Sci-fi/futuristic visual language
- Information density balanced with breathing room

## Typography System

**Font Stack:**
- Primary (Headings): 'JetBrains Mono' or 'Fira Code' (monospace, technical feel)
- Secondary (Body): 'Inter' (clean, modern readability)

**Hierarchy:**
- Hero Title: 4xl-6xl, bold, letter-spacing tight, terminal green accent
- Section Headers: 2xl-3xl, bold, with `>_` prefix
- Subsections: xl, medium weight
- Body Text: base-lg, regular weight, slightly increased line-height (1.7)
- Terminal Commands/Code: mono font, sm-base size

## Layout System

**Spacing Units:** Tailwind units of 4, 8, 12, 16, 24, 32 (p-4, m-8, gap-12, py-16, etc.)

**Container Strategy:**
- Full-width sections with max-w-7xl inner containers
- Asymmetric layouts for visual interest
- Grid-based project showcases (3 columns desktop, 1 mobile)

## Page Structure & Sections

### 1. Hero Section (100vh, full-viewport)
- Animated particle.js background with subtle green/cyan particles following mouse
- Center-aligned terminal-style introduction
- Typing animation effect for name/title (`>_ Konstantin Krestnikov`)
- Glitch effect on avatar image (positioned top-right or center)
- Social icons row at bottom with glow-on-hover
- Subtle scanline overlay across entire section

### 2. About Section
- Two-column layout: stats panel (left) + bio (right)
- Animated counter cards showing: GitHub repos, followers, projects, contributions
- Cards with subtle border glow and dark gradient backgrounds
- Timeline of positions with connecting lines and pulse animations
- Icon badges for tech stack

### 3. Featured Projects Showcase
- 3-column masonry grid (staggered heights)
- Each card: project thumbnail, title, tech tags, star count, brief description
- 3D tilt effect on hover (subtle perspective transform)
- Gradient overlay from bottom (dark to transparent)
- Neon border glow on hover (green/cyan)
- Click reveals modal with full project details

### 4. YouTube & Content Section
- Horizontal scrollable video carousel
- Video thumbnails with play button overlay
- Subscriber count with animated badge
- Latest posts feed in card format (3 columns)
- Each card: title, excerpt, view count, date with glowing accent line

### 5. Skills Matrix
- Terminal-style skill list with progress bars
- Animated fill on scroll-into-view
- Categories: Languages, Frameworks, Tools, AI/ML
- Each skill has proficiency percentage with neon fill animation
- Grid layout with glassmorphism cards

### 6. Contact Terminal
- Full-width section with terminal interface simulation
- Blinking cursor in input field
- Contact methods displayed as terminal output (`> Email: k.krestnikov@gmail.com`)
- Social icons arranged in command-line format
- Background: subtle matrix-style falling characters

## Component Library

### Cards
- Dark background (#0a0e1a, #141824)
- 1px border with gradient (subtle cyan to transparent)
- Rounded corners (8px)
- Inner glow on hover
- Backdrop blur for glassmorphism effect

### Buttons
- Primary: Solid neon green/cyan with black text
- Secondary: Outlined with gradient border
- Ghost: Transparent with border, fills on hover
- All buttons: smooth transitions, slight scale-up on hover

### Navigation
- Fixed top bar with blur backdrop
- Logo/name on left (monospace font)
- Menu links on right with underline animation
- Hamburger menu for mobile with slide-in overlay
- Active state: neon underline

### Icons
- Use Heroicons for UI elements
- Custom tech stack icons via Font Awesome
- Social icons: outlined style with fill-on-hover

## Visual Effects & Animations

**Background Effects:**
- Particle.js network of connected dots (green/cyan)
- Subtle gradient mesh animation
- Scanline overlay (repeating linear gradient, low opacity)
- Noise texture for depth

**Scroll Animations:**
- Fade-in-up for sections (stagger children)
- Counter animations when in viewport
- Progress bar fills
- Parallax effect on hero background (slower scroll)

**Interactive Effects:**
- Card tilt on mouse move (3D perspective)
- Glow trails on hover
- Text glitch effect on hover (random character replacement, 200ms)
- Button ripple effect
- Smooth page transitions

**Loading States:**
- Terminal boot sequence on page load
- Typewriter effect for hero text
- Skeleton loaders with shimmer for async content

## Images

### Hero Image/Avatar
- Circular avatar with neon border glow (green/cyan gradient)
- Position: Center or top-right of hero
- Size: 200-300px diameter
- Glitch effect overlay that triggers randomly every 3-5 seconds
- Description: Professional headshot with high contrast, futuristic processing

### Project Thumbnails
- 16:9 aspect ratio cards
- Screenshots of project UIs or representative graphics
- Dark overlay gradient from bottom
- Hover: scale up slightly (1.05x), increase brightness

### Content/Blog Images
- Featured images for blog posts/videos
- Maintain consistent aspect ratios
- Apply subtle cyan/green color tint overlay

## Accessibility
- High contrast ratios (neon on dark)
- Reduced motion alternative (remove particle effects, tilt)
- Keyboard navigation for all interactive elements
- Focus states: neon outline glow
- Screen reader labels for icon-only buttons

## Responsive Behavior
- Desktop (lg+): Full effects, 3-column grids, particle background
- Tablet (md): 2-column grids, reduced particle count
- Mobile: Single column, simplified animations, hamburger menu
- All text remains readable, minimum 16px base