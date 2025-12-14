# PowerShell script to update Vercel project Node.js version
$projectId = "prj_hwIC1XlGC9HgMazqgJiZuumlwNsh"
$teamId = "team_HFMMPXndNQimmsNegfeDjQth"
$nodeVersion = "20.x"

# Get Vercel token from environment or prompt
$token = $env:VERCEL_TOKEN
if (-not $token) {
    Write-Host "VERCEL_TOKEN not found. Please set it:" -ForegroundColor Yellow
    Write-Host '$env:VERCEL_TOKEN = "your-token-here"' -ForegroundColor Cyan
    Write-Host "Get your token from: https://vercel.com/account/tokens" -ForegroundColor Yellow
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$body = @{
    nodeVersion = $nodeVersion
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.vercel.com/v9/projects/$projectId?teamId=$teamId" -Method PATCH -Headers $headers -Body $body
    Write-Host "✅ Successfully updated Node.js version to $nodeVersion" -ForegroundColor Green
    Write-Host "Project: $($response.name)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Error updating Node.js version:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host $_.ErrorDetails.Message -ForegroundColor Red
    }
}


