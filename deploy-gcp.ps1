$ErrorActionPreference = "Stop"

Write-Host "Starting GCP deployment..." -ForegroundColor Green

# Check for gcloud
if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Error "ERROR: gcloud CLI not found. Please restart your terminal/editor to refresh PATH or install Google Cloud SDK."
    exit 1
}

# 1. Install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm ci
}

# 2. Build
Write-Host "Building web apps..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed"; exit 1 }

# 3. Deploy Hosting
Write-Host "Deploying Hosting..." -ForegroundColor Cyan
# Try deployment, if it requires interaction it might fail in non-interactive mode
npx -y firebase-tools deploy --only hosting --project dev-cracks-live-2026
if ($LASTEXITCODE -ne 0) { 
    Write-Warning "Hosting deploy might require manual setup. Please run 'npx firebase deploy --only hosting' manually after this script finishes."
    # Do not exit, continue to Backend deploy
}

# 4. Deploy Backend
Write-Host "Deploying Backend to Cloud Run..." -ForegroundColor Cyan
Write-Host "This may take a few minutes..."

gcloud run deploy dev-cracks-api `
    --source . `
    --platform managed `
    --region us-central1 `
    --allow-unauthenticated `
    --project dev-cracks-live-2026 `
    --set-env-vars NODE_ENV=production `
    --quiet

if ($LASTEXITCODE -ne 0) { Write-Error "Cloud Run deploy failed"; exit 1 }

Write-Host "DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
