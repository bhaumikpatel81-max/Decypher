Param(
    [string]$OutputPath = "$PSScriptRoot\decypher-scout-extension.zip"
)

if (Test-Path $OutputPath) {
    Remove-Item -Path $OutputPath -Force
}

Get-ChildItem -Path $PSScriptRoot -Recurse |
    Where-Object { -not $_.PSIsContainer -and $_.FullName -notmatch '\\build-extension\.ps1$' } |
    Compress-Archive -DestinationPath $OutputPath -Update

Write-Host "Packaged Decypher Scout extension to: $OutputPath"
