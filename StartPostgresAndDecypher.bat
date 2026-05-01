@echo off
echo ============================================================
echo  Starting PostgreSQL + Decypher
echo ============================================================
echo.

:: Try to start PostgreSQL service (try common version names)
echo [1/2] Starting PostgreSQL database...
net start postgresql-x64-17 2>nul && goto :pg_started
net start postgresql-x64-16 2>nul && goto :pg_started
net start postgresql-x64-15 2>nul && goto :pg_started
net start postgresql-x64-14 2>nul && goto :pg_started
net start postgresql-x64-13 2>nul && goto :pg_started
net start postgresql-x64-12 2>nul && goto :pg_started

echo.
echo WARNING: Could not auto-start PostgreSQL.
echo.
echo Please start it manually:
echo   1. Press Win+R, type: services.msc, press Enter
echo   2. Find the service starting with "postgresql"
echo   3. Right-click it and choose Start
echo   4. Come back here and press any key to continue.
echo.
pause

:pg_started
echo PostgreSQL is running.
echo.

:: Wait a moment for PostgreSQL to fully start
timeout /t 3 /nobreak >nul

:: Start Decypher
echo [2/2] Starting Decypher on http://localhost:5000 ...
cd /d "c:\Users\bhaumik.patel\Desktop\Decypher\Dechypher_v1\Decypher_v1\Decypher.Web"
"C:\Program Files\dotnet\dotnet.exe" run --urls "http://localhost:5000"
pause
