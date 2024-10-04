# airdrop.ps1
$walletPath = ".\test-wallet.json"
$localUrl = "http://127.0.0.1:8899"

# Generate a new keypair if it doesn't exist
if (-not (Test-Path $walletPath)) {
    Write-Host "Generating new wallet..."
    solana-keygen new --no-bip39-passphrase -o $walletPath
}

$publicKey = solana address -k $walletPath

Write-Host "Using wallet: $publicKey"
Write-Host "Using local network: $localUrl"

# Check if the local validator is running
$validatorStatus = solana cluster-version --url $localUrl 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Local Solana validator is not running. Starting it with a pre-funded account..."
    Start-Process powershell -ArgumentList "solana-test-validator --mint $publicKey --reset" -NoNewWindow
    Start-Sleep -Seconds 10  # Wait for the validator to start
}

Write-Host "Local validator status: $(solana cluster-version --url $localUrl)"

function Get-Balance {
    $balanceOutput = solana balance $publicKey --url $localUrl 2>&1
    if ($balanceOutput -match '(\d+(\.\d+)?) SOL') {
        return [double]$Matches[1]
    }
    return 0
}

$targetBalance = 100 # Target balance in SOL
$currentBalance = Get-Balance

Write-Host "Initial balance: $currentBalance SOL"

if ($currentBalance -ge $targetBalance) {
    Write-Host "Current balance ($currentBalance SOL) is already at or above the target balance ($targetBalance SOL)."
    exit 0
}

if ($currentBalance -eq 0) {
    Write-Host "Balance is 0. Restarting the validator with a pre-funded account..."
    Stop-Process -Name "solana-test-validator" -Force -ErrorAction SilentlyContinue
    Start-Process powershell -ArgumentList "solana-test-validator --mint $publicKey --reset" -NoNewWindow
    Start-Sleep -Seconds 10  # Wait for the validator to start
    $currentBalance = Get-Balance
    Write-Host "New balance after restart: $currentBalance SOL"
}

if ($currentBalance -ge $targetBalance) {
    Write-Host "Target balance reached: $currentBalance SOL"
} else {
    Write-Host "Failed to reach target balance. Current balance: $currentBalance SOL"
    Write-Host "Please check your Solana configuration and try again."
}