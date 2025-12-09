# Kanishka Sinha Portfolio

## Overview
A Gen-Z dark rave aesthetic portfolio website featuring immersive Three.js 3D graphics, smooth animations, and neon visual effects. Built for Kanishka Sinha - Frontend Developer & Web Designer.

## Current State
**Status**: Complete MVP
**Last Updated**: December 8, 2024

## Tech Stack
- **Frontend**: React 18, TypeScript, TailwindCSS
- **3D Graphics**: Three.js (vanilla implementation)
- **Animations**: Framer Motion, GSAP
- **Backend**: Express.js
- **Build Tool**: Vite

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/         # Navigation, CustomCursor
│   │   │   ├── sections/       # Hero, About, Skills, Projects, Experience, Contact, Footer
│   │   │   ├── three/          # RaveBackground (Three.js 3D scene)
│   │   │   └── ui/             # Shadcn UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Query client, utilities
│   │   ├── pages/              # Route pages
│   │   ├── App.tsx             # Main application component
│   │   └── index.css           # Global styles with neon effects
│   └── index.html
├── server/
│   ├── routes.ts               # API endpoints
│   └── storage.ts              # In-memory storage
├── shared/
│   └── schema.ts               # TypeScript schemas
├── tailwind.config.ts          # Design tokens & neon colors
└── design_guidelines.md        # Design documentation
```

## Features
1. **Hero Section**: Animated text reveal with Three.js 3D particle background and floating rave orb
2. **About Section**: Bio with glitch animations and neon timeline
3. **Skills Section**: Animated skill cards with progress bars and neon glow effects
4. **Projects Section**: Featured project carousel with hover effects
5. **Experience Section**: Vertical timeline with scroll-triggered animations
6. **Contact Section**: Glowing form inputs with form validation
7. **Custom Cursor**: Neon cursor with magnetic hover effects
8. **Grain Overlay**: Subtle grain texture for rave aesthetic

## Design System
- **Colors**: Black/deep purple background with neon cyan, magenta, purple accents
- **Typography**: Orbitron (display), Space Grotesk (body), JetBrains Mono (code)
- **Effects**: Glitch animations, neon glow, gradient text, particle systems

## How to Run
```bash
npm run dev
```
The application runs on port 5000.

## How to Modify Content
- **Personal Info**: Edit `client/src/components/sections/Hero.tsx` for name/role
- **About Content**: Edit `client/src/components/sections/About.tsx`
- **Skills**: Modify `skillCategories` array in `client/src/components/sections/Skills.tsx`
- **Projects**: Update `projects` array in `client/src/components/sections/Projects.tsx`
- **Experience**: Edit `experiences` array in `client/src/components/sections/Experience.tsx`
- **Contact Info**: Update `client/src/components/sections/Contact.tsx`

## API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Retrieve contact messages (admin)

## User Preferences
- Dark rave aesthetic with neon colors
- Gen-Z design language
- Immersive 3D animations
- Smooth page transitions
- No emojis in UI
