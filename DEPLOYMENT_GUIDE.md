# Complete Deployment Guide

This guide will help you deploy your Portfolio Builder to Vercel with CI/CD pipeline.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Node.js 20+ installed locally (for testing)

## Step 1: Push to GitHub

### First Time Setup

1. **Initialize Git Repository** (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Production-ready Portfolio Builder"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `portfolio-builder`)
   - **DO NOT** initialize with README, .gitignore, or license

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-builder.git
   git branch -M main
   git push -u origin main
   ```

### Subsequent Updates

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended for First Time)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect settings from `vercel.json`
5. Click **"Deploy"**
6. Wait for deployment to complete
7. Your site will be live at `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Step 3: Setup CI/CD Pipeline (Automatic Deployments)

After your first deployment, set up automatic deployments:

1. **Get Vercel Credentials**:
   - Go to your Vercel project dashboard
   - Navigate to **Settings → General**
   - Copy:
     - `Org ID`
     - `Project ID`
   - Go to **Account Settings → Tokens**
   - Create a new token and copy it

2. **Add GitHub Secrets**:
   - Go to your GitHub repository
   - Navigate to **Settings → Secrets and variables → Actions**
   - Click **"New repository secret"** and add:
     - `VERCEL_TOKEN` - Your Vercel token
     - `VERCEL_ORG_ID` - Your organization ID
     - `VERCEL_PROJECT_ID` - Your project ID

3. **Verify CI/CD**:
   - Make a small change to your code
   - Push to `main` branch
   - Check GitHub Actions tab - deployment should trigger automatically
   - Check Vercel dashboard - new deployment should appear

## Project Structure

```
Portfolio-Builder/
├── api/                    # Vercel serverless functions
│   └── index.ts           # Main API handler
├── Portfolio-Builder/      # Main application
│   ├── client/            # React frontend
│   ├── server/            # Express backend
│   ├── api/               # Additional API routes
│   └── dist/              # Build output
├── .github/workflows/      # CI/CD pipelines
│   ├── ci.yml             # Continuous Integration
│   └── deploy.yml         # Deployment workflow
└── vercel.json            # Vercel configuration
```

## Build Process

The project uses a two-step build:
1. **Root level**: Installs dependencies
2. **Portfolio-Builder**: Builds the application

Build output: `Portfolio-Builder/dist/public/`

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact messages (returns empty array in serverless)
- `GET /api/health` - Health check endpoint

## Troubleshooting

### Build Fails

1. Check Node.js version (should be 20+)
2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules Portfolio-Builder/node_modules
   npm install
   cd Portfolio-Builder && npm install
   ```
3. Run build locally:
   ```bash
   cd Portfolio-Builder
   npm run build
   ```

### Deployment Fails

1. Check Vercel build logs in dashboard
2. Verify `vercel.json` configuration
3. Ensure build output exists at `Portfolio-Builder/dist/public/`
4. Check API function syntax in `api/index.ts`

### CI/CD Not Working

1. Verify GitHub secrets are set correctly
2. Check GitHub Actions logs
3. Ensure workflow files are in `.github/workflows/`
4. Verify branch name matches workflow trigger (main/master)

## Environment Variables

No environment variables are required for basic deployment. The project works out of the box.

If you need database connectivity later, add `DATABASE_URL` in Vercel project settings.

## Support

For issues or questions:
1. Check build logs in Vercel dashboard
2. Check GitHub Actions logs
3. Review error messages in browser console


