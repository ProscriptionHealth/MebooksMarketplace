Write-Host "Installing Mebooks.ai dependencies..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking if Node.js is installed..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Installing npm dependencies..." -ForegroundColor Yellow

# Install dependencies
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Yellow
Write-Host "  npm run dev     - Start development server (Express + Vite)" -ForegroundColor Cyan
Write-Host "  npm run build   - Build for production" -ForegroundColor Cyan
Write-Host "  npm run start   - Start production server" -ForegroundColor Cyan
Write-Host "  npm run check   - Type check with TypeScript" -ForegroundColor Cyan
Write-Host "  npm run db:push - Update database schema" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue"