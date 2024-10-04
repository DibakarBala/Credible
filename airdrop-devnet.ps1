# airdrop-devnet.ps1
$walletPath = ".\test-wallet.json"
$devnetUrl = "https://api.devnet.solana.com"

# Generate a new keypair if it doesn't exist
if (-not (Test-Path $walletPath)) {
    Write-Host "Generating new wallet..."
    solana-keygen new --no-bip39-passphrase -o $walletPath
}

$publicKey = solana address -k $walletPath

Write-Host "Using wallet: $publicKey"
Write-Host "Using devnet: $devnetUrl"

# Check if devnet is accessible
$networkStatus = solana cluster-version --url $devnetUrl 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Unable to connect to Solana devnet. Please check your connection and try again."
    exit 1
}
Write-Host "Devnet status: $networkStatus"

function Get-Balance {
    $balanceOutput = solana balance $publicKey --url $devnetUrl 2>&1
    if ($balanceOutput -match '(\d+(\.\d+)?) SOL') {
        return [float]$Matches[1]
    }
    return 0
}

$targetBalance = 2 # Target balance in SOL for devnet
$currentBalance = Get-Balance

Write-Host "Initial balance: $currentBalance SOL"

$attempts = 0
$maxAttempts = 5

while ($currentBalance -lt $targetBalance -and $attempts -lt $maxAttempts) {
    Write-Host "Requesting airdrop of 1 SOL (Attempt $($attempts + 1))"
    $result = solana airdrop 1 $publicKey --url $devnetUrl 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Airdrop successful: $result"
    } else {
        Write-Host "Airdrop failed: $result"
    }
    Start-Sleep -Seconds 5
    $currentBalance = Get-Balance
    Write-Host "Current balance: $currentBalance SOL"
    $attempts++
}

if ($currentBalance -ge $targetBalance) {
    Write-Host "Target balance reached: $currentBalance SOL"
} else {
    Write-Host "Failed to reach target balance after $maxAttempts attempts"
}