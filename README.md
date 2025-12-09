# Portfolio Builder

A modern, responsive portfolio website built with React, TypeScript, Three.js, and Express.

## Features

- 🎨 Modern UI with custom animations
- 🚀 Built with React + TypeScript
- 🎭 Three.js 3D background effects
- 📱 Fully responsive design
- ⚡ Fast and optimized

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
cd Portfolio-Builder
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your repository: `https://github.com/kanishka973/portfolio`
4. Vercel will auto-detect the settings from `vercel.json`
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option 3: Automatic Deployment via GitHub Actions

The project includes a GitHub Actions workflow that automatically deploys to Vercel on every push to `main`. To enable it:

1. Go to your Vercel dashboard and create a new project
2. Copy your Vercel credentials:
   - Go to Project Settings → General
   - Copy `Org ID` and `Project ID`
3. Add secrets to your GitHub repository:
   - Go to Settings → Secrets and variables → Actions
   - Add `VERCEL_TOKEN` (get from Vercel account settings → Tokens)
   - Add `VERCEL_ORG_ID`
   - Add `VERCEL_PROJECT_ID`

Your project will automatically deploy on every push!

See `DEPLOYMENT.md` for more detailed instructions.

## License

MIT

