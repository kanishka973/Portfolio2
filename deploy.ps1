# Portfolio Deployment Script
Write-Host "🚀 Starting Portfolio Deployment..." -ForegroundColor Cyan

# Step 1: Check if GitHub CLI is authenticated
Write-Host "`n📦 Step 1: Setting up GitHub..." -ForegroundColor Yellow
$ghAuth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  GitHub CLI not authenticated. Please run: gh auth login" -ForegroundColor Yellow
    Write-Host "   This will open a browser for authentication." -ForegroundColor Gray
    gh auth login
}

# Step 2: Create GitHub repository if it doesn't exist
Write-Host "`n📦 Step 2: Creating GitHub repository..." -ForegroundColor Yellow
$repoExists = gh repo view kanishka973/Portfolio-Builder 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Creating new repository..." -ForegroundColor Gray
    gh repo create Portfolio-Builder --public --source=. --remote=origin --push
} else {
    Write-Host "Repository already exists. Pushing changes..." -ForegroundColor Gray
    git push -u origin main
}

# Step 3: Check Vercel authentication
Write-Host "`n🚀 Step 3: Setting up Vercel..." -ForegroundColor Yellow
$vercelAuth = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Vercel not authenticated. Please run: vercel login" -ForegroundColor Yellow
    Write-Host "   This will open a browser for authentication." -ForegroundColor Gray
    vercel login
}

# Step 4: Deploy to Vercel
Write-Host "`n🚀 Step 4: Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod --yes

Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
Write-Host "Your portfolio should be live on Vercel!" -ForegroundColor Green



