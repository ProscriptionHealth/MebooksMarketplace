@echo off
echo Installing Mebooks.ai dependencies...
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version

echo.
echo Installing npm dependencies...
npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.
echo Available commands:
echo   npm run dev     - Start development server (Express + Vite)
echo   npm run build   - Build for production  
echo   npm run start   - Start production server
echo   npm run check   - Type check with TypeScript
echo   npm run db:push - Update database schema
echo.
pause