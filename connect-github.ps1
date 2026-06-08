# Connect Global Nexus to GitHub
# Run: powershell -ExecutionPolicy Bypass -File .\connect-github.ps1

$ErrorActionPreference = "Stop"
$ProjectPath = $PSScriptRoot
$RemoteUrl = "https://github.com/Osmonkulov-Osmonali/Global-Nexus.git"
$LogFile = Join-Path $ProjectPath "_connect_github_report.txt"

function Log($msg) {
    $line = "[$(Get-Date -Format 'HH:mm:ss')] $msg"
    Write-Host $line
    Add-Content -Path $LogFile -Value $line
}

Set-Location $ProjectPath
"" | Set-Content $LogFile

Log "Project: $ProjectPath"

if (-not (Test-Path ".git")) {
    git init | Out-String | ForEach-Object { Log $_ }
    Log "Git initialized"
} else {
    Log "Git repo already exists"
}

$remotes = git remote 2>&1
if ($remotes -match "origin") {
    git remote remove origin 2>&1 | ForEach-Object { Log $_ }
    Log "Removed old origin"
}

git remote add origin $RemoteUrl 2>&1 | ForEach-Object { Log $_ }
Log "Remote added: $RemoteUrl"

Log "--- git remote -v ---"
git remote -v 2>&1 | ForEach-Object { Log $_ }

Log "--- git ls-remote origin ---"
git ls-remote origin 2>&1 | ForEach-Object { Log $_ }

Log "--- staging files ---"
git add -A 2>&1 | ForEach-Object { Log $_ }

$status = git status --porcelain 2>&1
if ($status) {
    git commit -m "Initial Global Nexus landing page MVP" 2>&1 | ForEach-Object { Log $_ }
    Log "Committed"
} else {
    Log "Nothing to commit (already clean)"
}

git branch -M main 2>&1 | ForEach-Object { Log $_ }
Log "Branch: main"

Log "--- git push -u origin main ---"
$pushOutput = git push -u origin main 2>&1
$pushOutput | ForEach-Object { Log $_ }

if ($LASTEXITCODE -eq 0) {
    Log "SUCCESS: Pushed to GitHub"
} else {
    Log "PUSH FAILED (exit $LASTEXITCODE). Common fixes:"
    Log "  - Run: gh auth login"
    Log "  - Or use SSH: git remote set-url origin git@github.com:Osmonkulov-Osmonali/Global-Nexus.git"
    Log "  - If remote has README: git pull origin main --rebase --allow-unrelated-histories"
}

Log "Done."
