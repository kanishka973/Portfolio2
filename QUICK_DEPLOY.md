# Quick Deployment Guide

## ✅ Your code is now on GitHub!
Repository: https://github.com/kanishka973/portfolio

## 🚀 Deploy to Vercel (Easiest Method)

### Step 1: Go to Vercel
1. Visit https://vercel.com
2. Click "Sign Up" or "Log In"
3. **Sign in with GitHub** (use the same GitHub account: kanishka973)

### Step 2: Import Your Project
1. Click "Add New Project" or "Import Project"
2. Find and select your repository: **kanishka973/portfolio**
3. Click "Import"

### Step 3: Configure (Vercel will auto-detect most settings)
- **Framework Preset**: Vercel will detect it automatically
- **Root Directory**: Leave as default (or set to `./` if needed)
- **Build Command**: `cd Portfolio-Builder && npm run build`
- **Output Directory**: `Portfolio-Builder/dist/public`
- **Install Command**: `cd Portfolio-Builder && npm install`

### Step 4: Deploy!
1. Click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. Your site will be live at: `https://your-project-name.vercel.app`

## 🎉 That's it!

Your portfolio will be live and automatically update whenever you push to GitHub!

## 📝 Optional: Custom Domain
1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain

## 🔄 Future Updates
Just push to GitHub and Vercel will automatically redeploy:
```bash
git add .
git commit -m "Your changes"
git push origin main
```



