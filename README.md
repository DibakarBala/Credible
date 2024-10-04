# Blockchain-based Educational Credential Verification System

This project implements a certificate issuance and verification system using the Solana blockchain. It allows educational institutions to issue digital certificates and enables anyone to verify these certificates.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Rust and Cargo
- Solana CLI tools
- PowerShell (for running airdrop scripts)

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Choose your development environment:

   ### For Local Development:

   a. Run the local airdrop script to generate a new keypair, start a new local validator, and fund your wallet:
      ```
      ./airdrop.ps1
      ```

   b. Edit the program id in the .env file to the new id returned by the airdrop script.

   c. Transfer funds to the backend wallet:
      ```
      solana transfer --allow-unfunded-recipient $(solana address -k backend/test-wallet.json) 100 --url http://127.0.0.1:8899
      ```

   ### For Devnet:

   a. Run the devnet airdrop script to generate a new keypair and fund your wallet on devnet:
      ```
      ./airdrop-devnet.ps1
      ```

   b. Edit the program id in the .env file to use the devnet program ID.

4. Build the Solana program:
   ```
   cargo build
   ```

5. Deploy the Solana program:
   - For local: `solana program deploy --url http://127.0.0.1:8899 target/deploy/certificate.so`
   - For devnet: `solana program deploy --url https://api.devnet.solana.com target/deploy/certificate.so`

6. Change the program id in the .env file to the new id returned by the solana program deploy command.

## Running the Application

1. Start the backend server:
   ```
   cd backend
   node server.js
   ```

2. In a new terminal, start the frontend:
   ```
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`

Remember to update the PROGRAM_ID in your .env files if it changes after deployment.

## Switching Between Local and Devnet

To switch between local development and devnet:

1. Update the `.env` files in the project root and backend directory:
   - For local: Use the local PROGRAM_ID and local URL
   - For devnet: Use the devnet PROGRAM_ID and SOLANA_NETWORK_URL

2. Run the appropriate airdrop script (airdrop.ps1 for local, airdrop-devnet.ps1 for devnet)

3. Restart the backend server and frontend application

## Useful Commands

1. Check your wallet balance:
   - Local: `solana balance --url http://127.0.0.1:8899`
   - Devnet: `solana balance --url https://api.devnet.solana.com`

2. View program logs:
   - Local: `solana logs --url http://127.0.0.1:8899`
   - Devnet: `solana logs --url https://api.devnet.solana.com`

## GitHub and Deployment

1. Ensure all changes are committed locally using VS Code's Source Control view.
2. Before pushing, check for large files:
   - Avoid committing large files (>100MB) to the repository.
   - Use .gitignore to exclude test ledgers, logs, and other large generated files.
3. Push changes to GitHub using the sync button in VS Code or via terminal commands.
4. If you accidentally push large files:
   - Update .gitignore
   - Remove files from Git history: `git rm -r --cached .`
   - Commit changes: `git add . && git commit -m "Remove large files"`
   - Force push: `git push origin main --force`
5. To deploy on Vercel:
   - Log in to Vercel (create an account if needed)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings if necessary
   - Click "Deploy"
6. After initial setup, pushing to GitHub will automatically trigger a new deployment on Vercel.

## Handling Large Files and Git History in PowerShell (Without WSL)

If you're using PowerShell and don't have access to WSL or bash:

1. Run the following commands directly in PowerShell:

   ```powershell
   git filter-branch --force --index-filter "git rm -rf --cached --ignore-unmatch test-ledger" --prune-empty --tag-name-filter cat -- --all
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   git push origin main --force
   ```

This method ensures the git filter-branch command runs correctly in a PowerShell environment without needing WSL or bash.

## Managing Test Ledger

The test ledger is necessary for local development but should not be pushed to GitHub due to its large size.

1. The `test-ledger` folder is included in `.gitignore` to prevent it from being tracked.
2. If you accidentally commit the test ledger:
   ```bash
   git rm -r --cached test-ledger
   git commit -m "Remove test-ledger from Git tracking"
   git filter-branch --force --index-filter \
     "git rm -rf --cached --ignore-unmatch test-ledger" \
     --prune-empty --tag-name-filter cat -- --all
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   git push origin main --force
   ```
3. When cloning the repository on a new machine, you'll need to regenerate the test ledger locally.
4. To regenerate the test ledger, run the appropriate airdrop script:
   - For local: `./airdrop.ps1`
   - For devnet: `./airdrop-devnet.ps1`

Remember: Never commit or push the test-ledger folder to GitHub.