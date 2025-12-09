# Gen-Z Dark Rave Portfolio Design Guidelines

## Design Theme & Aesthetic
**Core Visual Identity**: Gen-Z Dark Rave Aesthetic
- Color palette: Black, deep purple, neon gradients (cyan, magenta, electric blue, acid green)
- Textures: Glitch effects, grain overlays throughout
- Lighting: Dynamic rave-style lights, glowing blur effects, neon accents
- Typography: Sharp, futuristic fonts with high contrast
- Interactive elements: Custom neon cursor with magnetic hover, particle effects
- Background: Immersive Three.js animated 3D backgrounds with rave orb or holographic cube

## Layout Structure & Sections

### 1. Landing/Hero Section
- Full-screen immersive experience
- Animated text reveal for name and role
- Three.js rave-style 3D animated background with moving neon accents
- Floating 3D object (rave orb or holographic cube) as centerpiece
- Prominent "Enter Portfolio" CTA with neon glow
- Barba.js smooth transition trigger into main content

### 2. About Section
- Bio with Gen-Z rave glitch animation on headings
- Scrolling neon timeline displaying:
  - Skills overview
  - Education background
  - Experience highlights
- Framer Motion stagger animations for timeline entries
- Neon line connectors with glow effects

### 3. Skills Section
- Grid layout of animated skill cards
- Hover effects with neon outline glow
- Custom glowing icons for each skill
- Categorized sections:
  - Frontend (React, TypeScript, Next.js)
  - Backend technologies
  - Tools & Platforms
- Card flip or reveal animations on scroll

### 4. Projects Section
- Project cards featuring:
  - Project title with glitch effect
  - Description text
  - Tech stack badges with neon borders
  - Demo and GitHub buttons with glow states
  - Three.js hover effects OR cinematic video preview
- Barba.js transitions to individual project detail pages
- 3D carousel presentation option for featured projects

### 5. Experience Section
- Vertical timeline with neon line that animates on scroll
- Cards for each role containing:
  - Company name
  - Role title
  - Duration
  - Key responsibilities
- Pulsing neon dots at timeline nodes
- Stagger animation as user scrolls

### 6. Contact Section
- Animated rave-themed form
- Input fields with glow-on-focus effects
- Send button with continuous pulse animation
- Social media links with neon hover effects
- Particle effects on form interaction

## Global Design Features
- Custom neon cursor trail following mouse movement
- Magnetic hover effects on interactive elements
- Global grain texture overlay for rave aesthetic
- Smooth scroll behavior throughout
- Barba.js page transitions between all sections
- Responsive breakpoints maintaining aesthetic on all devices

## Typography
- Primary: Sharp, futuristic sans-serif for headings
- Secondary: Clean, readable font for body text
- Heavy use of text-shadow and neon glow effects
- Glitch animation treatment on key headings
- High contrast ratios for readability against dark backgrounds

## Spacing & Rhythm
- Generous spacing to let neon elements breathe
- Vertical rhythm using Tailwind units: 8, 16, 24, 32
- Section padding: py-20 to py-32 for desktop, py-12 to py-16 mobile

## Interactive Elements
- All buttons: Neon outline with blur glow on hover
- Cards: Lift effect with increased glow intensity
- Links: Underline animation with neon trail
- Form inputs: Subtle pulse when active, bright glow on focus
- CTAs: Continuous subtle pulse animation

## Performance Considerations
- Three.js components isolated in reusable modules
- Optimized animations using GPU acceleration
- Lazy loading for heavy 3D elements
- Reduced motion support for accessibility

## Content Structure
**User Info**: Kanishka Sinha, Frontend Developer/Web Designer
**Bio**: "Passionate about building immersive, animated, next-gen websites"
**Skills**: React, Next.js, TypeScript, Tailwind, Three.js, GSAP, Node.js, Git

## Images
No traditional hero images - replaced with Three.js 3D animated backgrounds and floating geometric objects. All visual impact comes from code-generated neon effects, particle systems, and 3D elements.