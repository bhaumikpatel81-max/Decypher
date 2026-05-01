@echo off
echo ============================================================
echo  Fix PostgreSQL Auto-Start + Launch Decypher
echo ============================================================
echo.

:: Check for admin rights — if not, re-launch elevated
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting administrator privileges to fix PostgreSQL service...
    powershell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

:: Find and fix the PostgreSQL service
set PG_FOUND=0
for %%V in (17 16 15 14 13 12) do (
    if %PG_FOUND%==0 (
        sc query postgresql-x64-%%V >nul 2>&1
        if not errorlevel 1 (
            echo Found service: postgresql-x64-%%V
            echo Setting startup type to Automatic...
            sc config postgresql-x64-%%V start= auto
            echo Starting PostgreSQL...
            net start postgresql-x64-%%V 2>nul
            echo Done. PostgreSQL will now start automatically with Windows.
            set PG_FOUND=1
        )
    )
)

if %PG_FOUND%==0 (
    echo.
    echo ERROR: Could not find any PostgreSQL service ^(tried versions 12-17^).
    echo Please check that PostgreSQL is installed.
    pause
    exit /b 1
)

echo.
timeout /t 3 /nobreak >nul

echo Starting Decypher on http://localhost:5000 ...
cd /d "c:\Users\bhaumik.patel\Desktop\Decypher\Dechypher_v1\Decypher_v1\Decypher.Web"
"C:\Program Files\dotnet\dotnet.exe" run --urls "http://localhost:5000"
pause
