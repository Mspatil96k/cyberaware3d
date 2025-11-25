# Cybersecurity Awareness Platform - Design Guidelines

## Design Approach

**Selected Approach**: Reference-Based with Cyber/Tech Aesthetic
Drawing inspiration from modern cybersecurity platforms (CrowdStrike, Kaspersky) and tech-forward interfaces (Stripe, Linear) combined with sci-fi/cyberpunk visual language. The design emphasizes trust, innovation, and interactive learning through 3D elements and immersive experiences.

## Core Design Principles

1. **Cyber-Tech Aesthetic**: Dark, futuristic interface with glowing accents and technical elements
2. **3D Immersion**: Strategic use of Three.js for engagement without overwhelming content
3. **Educational Clarity**: Complex cybersecurity topics presented with visual hierarchy and approachability
4. **Trust & Security**: Professional polish that conveys expertise and reliability

## Typography System

**Font Stack**:
- **Headings**: Inter or Poppins (700-800 weight) - modern, tech-forward
- **Body**: Inter or System UI (400-500 weight) - excellent readability
- **Technical/Code**: JetBrains Mono or Fira Code - monospace for cyber authenticity

**Hierarchy**:
- Hero Headlines: 4xl-6xl (56-72px desktop), bold, tight letter-spacing
- Section Headers: 2xl-3xl (32-48px), semibold
- Card Titles: xl-2xl (24-32px), semibold
- Body Text: base-lg (16-18px), regular
- Captions/Meta: sm (14px), medium

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** consistently
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24 (desktop), py-12 (mobile)
- Card gaps: gap-6 to gap-8
- Element margins: m-4, m-6, m-8

**Grid Systems**:
- Article Cards: 3-column grid (lg), 2-column (md), 1-column (mobile)
- Quiz Layout: Single column max-w-3xl centered
- Dashboard: 2-column stats grid with full-width chart sections

## Component Library

### Navigation
- **Header**: Sticky top navigation with blur effect, logo left, nav center, auth buttons right
- Height: h-16 to h-20
- Include subtle glow/border effect on scroll
- Mobile: Hamburger menu with slide-in panel

### Hero Section (Homepage)
- **Layout**: Full viewport (min-h-screen) split layout
- Left: Headline + subtext + dual CTA buttons (primary: "Start Learning", secondary: "Take Quiz")
- Right: 3D Canvas featuring animated cybersecurity shield or globe with threat visualizations
- Spacing: px-6 md:px-12, py-20
- Background: Subtle grid pattern or circuit board texture overlay

### 3D Elements Integration
- **Hero 3D Canvas**: Rotating shield/globe (w-full h-96 to h-screen on desktop)
- **Article Cards**: Small 3D icons (lock, shield, network node) - size: w-12 h-12
- **Loading States**: Animated 3D spinner/hologram
- **Dashboard**: 3D network visualization showing quiz progress connections
- Performance: Lazy load 3D components, reduce complexity on mobile

### Content Cards
- **Article Cards**: 
  - Grid layout with hover lift effect (hover:translate-y-[-4px])
  - Structure: Icon/3D element top, category badge, title (text-xl), excerpt (2-3 lines), "Read More" link
  - Padding: p-6, rounded-xl, border with glow on hover
  - Height: min-h-[280px] for consistency

- **Quiz Cards**:
  - Similar structure with difficulty badge, question count, estimated time
  - Progress indicator for completed quizzes

### Quiz Interface
- **Question Container**: max-w-3xl centered, p-8, rounded-lg with subtle backdrop
- **Answer Options**: 
  - Full-width buttons with radio/checkbox integration
  - Height: min-h-16, justify-start, text-left
  - Active state: border glow, scale(1.02)
  - Spacing: gap-4 between options

- **Progress Bar**: Sticky top, full-width with animated fill, shows current/total questions

### Dashboard
- **Stats Grid**: 4-column (lg), 2-column (md) showing: Total Quizzes, Avg Score, Best Score, Recent Activity
- **Stat Cards**: Icon + large number + label, p-6, min-h-32
- **Score History**: Line chart or bar graph (use Chart.js), full-width section
- **Recent Quizzes**: Table or list view with expandable details

### Forms (Login/Register)
- **Container**: max-w-md centered, p-8 to p-12
- **Input Fields**: 
  - Full-width, h-12, px-4, rounded-lg
  - Label above (text-sm, mb-2)
  - Error states with red accent and icon
  - Spacing: gap-6 between fields
- **Submit Button**: Full-width, h-12, bold text, with loading spinner state

### Footer
- **Structure**: 4-column layout (lg), 2-column (md), 1-column (mobile)
- Sections: About, Quick Links, Resources, Social/Newsletter
- Include: Copyright, Privacy Policy, Terms links
- Background: Subtle gradient or pattern continuation
- Padding: py-12, px-6

## Visual Effects

**Glassmorphism/Frosted Glass**: Apply to navigation, modals, floating cards
- backdrop-blur-md to backdrop-blur-xl
- Semi-transparent backgrounds
- Subtle border glow

**Hover Interactions**:
- Cards: transform scale(1.02), shadow increase, border glow
- Buttons: Slight scale, brightness increase
- 3D elements: Gentle rotation or bob animation
- Transition: all 200-300ms ease

**Cyber Accents**:
- Grid overlays on hero/section backgrounds (opacity: 0.05-0.1)
- Hexagonal clip-paths for images/cards (sparingly)
- Glitch effect on hover for headings (very subtle, CSS animation)
- Animated scan lines or data stream particles in backgrounds

## Images

### Required Images:
1. **Hero Section**: Large 3D rendered cybersecurity shield or globe (replaced by Three.js canvas)
2. **Article Thumbnails**: Tech/cyber themed images for each article category
   - Phishing: Hook/email visualization
   - Malware: Virus/bug abstract
   - Passwords: Lock/key concept
   - Safe Browsing: Shield/browser
   - Size: 16:9 aspect ratio, min 800x450px
3. **Background Textures**: Circuit board patterns, grid overlays, hexagonal patterns (subtle, low opacity)
4. **Icons**: Use Heroicons for UI elements, custom 3D-rendered icons for article categories

**Image Placement**:
- Hero: Right side 3D canvas (not static image)
- Article cards: Top position, rounded-t-xl
- Dashboard: Avatar placeholder, achievement badges

## Responsive Behavior

**Breakpoints**:
- Mobile: Single column, stack 3D elements below content
- Tablet (md): 2-column grids, side-by-side hero
- Desktop (lg): Full 3-column grids, 3D elements integrated inline

**3D Canvas Scaling**:
- Desktop: Full size (h-96 to h-screen)
- Tablet: h-64 to h-80
- Mobile: h-48 to h-64, simplified geometry

## Page-Specific Layouts

### Homepage
- Hero with 3D element (full viewport)
- Featured Articles (3-column grid)
- Why Cyber Security Matters (2-column: text + stats visualization)
- Quick Quiz CTA (centered, full-width with 3D background element)

### Learn Page (Articles)
- Filter/Search bar (sticky, full-width)
- Category tabs or sidebar
- Article grid (3-column)
- Pagination at bottom

### Article Detail
- max-w-4xl centered, generous py-24
- Breadcrumb navigation
- Rich typography with proper content hierarchy
- Related articles (3-column) at bottom

### Quiz Page
- Centered layout (max-w-3xl)
- Question card with options
- Progress indicator top
- Navigation buttons bottom (Back/Next)
- Results modal with 3D celebration effect on high scores

### Dashboard
- Welcome header with user greeting
- Stats grid (4-column)
- Charts section (full-width)
- Quiz history table/list
- Achievements/badges section with 3D icons

## Accessibility Notes
- Maintain WCAG AA contrast ratios despite dark theme
- Provide reduced-motion alternatives for 3D animations
- Ensure form inputs have clear focus states
- All interactive 3D elements have keyboard navigation alternatives