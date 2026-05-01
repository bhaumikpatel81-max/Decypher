# Setup-AutoStart.ps1
# Run ONCE as Administrator — after this, PostgreSQL + Decypher start automatically with Windows

Write-Host "============================================================"
Write-Host " Decypher Auto-Start Setup"
Write-Host "============================================================"
Write-Host ""

# ── Step 1: Find and fix PostgreSQL service ───────────────────────────────────
Write-Host "[1/3] Fixing PostgreSQL service..."

$pgService = Get-Service -Name "postgresql-x64-*" -ErrorAction SilentlyContinue | Select-Object -First 1

if ($null -eq $pgService) {
    Write-Host "ERROR: No PostgreSQL service found. Is PostgreSQL installed?" -ForegroundColor Red
    Write-Host "Check services.msc and look for any service starting with 'postgresql'."
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "  Found service: $($pgService.Name)"
Set-Service -Name $pgService.Name -StartupType Automatic
Write-Host "  Set to Automatic startup."

if ($pgService.Status -ne 'Running') {
    Write-Host "  Starting PostgreSQL..."
    Start-Service -Name $pgService.Name
    Start-Sleep -Seconds 3
    Write-Host "  PostgreSQL is now running."
} else {
    Write-Host "  PostgreSQL is already running."
}

# ── Step 2: Register Decypher as a Windows Task Scheduler task ────────────────
Write-Host ""
Write-Host "[2/3] Registering Decypher to start automatically at login..."

$taskName = "DecypherAutoStart"
$dotnetExe = "C:\Program Files\dotnet\dotnet.exe"
$workDir   = "c:\Users\bhaumik.patel\Desktop\Decypher\Dechypher_v1\Decypher_v1\Decypher.Web"

# Remove old task if it exists
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

$action   = New-ScheduledTaskAction -Execute $dotnetExe `
                -Argument 'run --urls "http://localhost:5000"' `
                -WorkingDirectory $workDir

$trigger  = New-ScheduledTaskTrigger -AtLogOn

$settings = New-ScheduledTaskSettingsSet `
                -AllowStartIfOnBatteries `
                -DontStopIfGoingOnBatteries `
                -ExecutionTimeLimit (New-TimeSpan -Hours 0)  # No time limit

$principal = New-ScheduledTaskPrincipal `
                -UserId $env:USERNAME `
                -LogonType Interactive `
                -RunLevel Highest

Register-ScheduledTask `
    -TaskName  $taskName `
    -Action    $action `
    -Trigger   $trigger `
    -Settings  $settings `
    -Principal $principal `
    -Force | Out-Null

Write-Host "  Task registered. Decypher will now start automatically every time you log in."

# ── Step 3: Start Decypher right now ─────────────────────────────────────────
Write-Host ""
Write-Host "[3/3] Starting Decypher now at http://localhost:5000 ..."
Start-ScheduledTask -TaskName $taskName

Start-Sleep -Seconds 3
Write-Host ""
Write-Host "============================================================"
Write-Host " Setup complete!"
Write-Host ""
Write-Host "  - PostgreSQL: starts automatically with Windows"
Write-Host "  - Decypher:   starts automatically when you log in"
Write-Host ""
Write-Host "  Open your browser and go to: http://localhost:5000"
Write-Host "  Login: admin@decypher.app / Admin@2024"
Write-Host "============================================================"
Write-Host ""
Read-Host "Press Enter to close this window"
