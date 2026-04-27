@echo off
REM Windows deployment script
REM Usage: deploy.bat render|railway|local

setlocal enabledelayedexpansion

set DEPLOY_TO=%1
if "%DEPLOY_TO%"=="" set DEPLOY_TO=render

echo.
echo 🚀 DECYPHER Deployment Script (Windows)
echo ========================================
echo.

if /i "%DEPLOY_TO%"=="render" (
    echo 📦 Deploying to Render...
    echo.
    echo 1. Ensure you have a GitHub repo:
    echo    git add . ^& git commit -m "Deploy to Render" ^& git push
    echo.
    echo 2. Go to https://render.com/dashboard
    echo 3. Click "New" ^> "Web Service"
    echo 4. Connect your GitHub repository
    echo 5. Render auto-detects render.yaml
    echo 6. Configure environment variables
    echo 7. Click "Deploy"
    echo.
    echo ✅ Done! Monitor at: https://dashboard.render.com
) else if /i "%DEPLOY_TO%"=="railway" (
    echo 📦 Deploying to Railway...
    echo.
    echo 1. Go to https://railway.app
    echo 2. Click "New Project" ^> "Deploy from Git"
    echo 3. Select your GitHub repository
    echo 4. Set environment variables
    echo 5. Railway auto-deploys
    echo.
    echo ✅ Done in ~5 minutes!
) else if /i "%DEPLOY_TO%"=="local" (
    echo 🐳 Running locally with Docker...
    echo.
    echo Prerequisites: Docker Desktop for Windows
    echo.
    echo 1. Copy environment template:
    if exist ".env" (
        echo .env already exists
    ) else (
        copy .env.example .env
    )
    echo.
    echo 2. Update .env with your values
    echo.
    echo 3. Start services:
    docker-compose up -d
    echo.
    echo ✅ Services running!
    echo    Frontend: http://localhost
    echo    Backend API: http://localhost/api
    echo    Health: http://localhost/health
    echo.
    echo Login: admin@decypher.app / Admin@2024
) else (
    echo ❌ Unknown deployment: %DEPLOY_TO%
    echo Usage: deploy.bat [render^|railway^|local]
    exit /b 1
)

echo.
