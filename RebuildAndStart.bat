@echo off
echo ============================================================
echo  Decypher - Rebuild Angular + Start Server
echo ============================================================
echo.

:: Step 1: Kill any running Decypher process
echo [1/3] Stopping any running server...
taskkill /f /im "Decypher.Web.exe" 2>nul
timeout /t 2 /nobreak >nul

:: Step 2: Rebuild Angular (outputs directly to wwwroot)
echo [2/3] Building Angular app (this takes 30-60 seconds)...
cd /d "c:\Users\bhaumik.patel\Desktop\Decypher\Dechypher_v1\Decypher_v1\angular-frontend"
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Angular build failed. Check the output above.
    pause
    exit /b 1
)
echo Angular build complete.
echo.

:: Step 3: Start the .NET server
echo [3/3] Starting Decypher server on http://localhost:5000 ...
cd /d "c:\Users\bhaumik.patel\Desktop\Decypher\Dechypher_v1\Decypher_v1\Decypher.Web"
"C:\Program Files\dotnet\dotnet.exe" run --urls "http://localhost:5000"
pause
