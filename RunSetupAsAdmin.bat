@echo off
:: Launches Setup-AutoStart.ps1 with Administrator privileges
powershell -Command "Start-Process powershell -ArgumentList '-ExecutionPolicy Bypass -File ""%~dp0Setup-AutoStart.ps1""' -Verb RunAs"
