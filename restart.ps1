# LJF Restart Script
Write-Host "Cleaning up environment and restarting LJF..." -ForegroundColor Cyan

# Terminate all node processes to release file locks
try {
    Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    # Wait a moment for processes to release handles
    Start-Sleep -Seconds 1
} catch {
    # Ignore errors if no processes found
}

# Remove the .next folder to clear cache
if (Test-Path ".next") {
    Write-Host "Removing build cache (.next folder)..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next
}

Write-Host "Starting development server..." -ForegroundColor Green
npm run dev
