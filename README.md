# Blockchain-based Educational Credential Verification System

This project implements a certificate issuance and verification system using the Solana blockchain. It allows educational institutions to issue digital certificates and enables anyone to verify these certificates.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Rust and Cargo
- Solana CLI tools
- PowerShell (for running airdrop.ps1 script)

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

3. Set up your Solana environment:
   - For local development:
     ```
     solana-keygen new -o test-wallet.json
     solana config set --url localhost
     ```
   - For devnet:
     ```
     solana-keygen new -o test-wallet.json
     solana config set --url https://api.devnet.solana.com
     ```

4. Start the local Solana validator (for local development only):
   Open a new terminal and run:
   ```
   solana-test-validator
   ```
   Keep this terminal open while working on your local environment.

5. Build and deploy the Solana program:
   In a new terminal, run:
   ```
   cargo build-bpf
   solana program deploy target/deploy/certificate.so
   ```
   Note the Program ID output after deployment.

6. Configure the environment:
   - Copy `.env.example` to `.env` in the project root and backend directory
   - Update the PROGRAM_ID in both `.env` files with the ID from step 4
   - For local development, uncomment the ANCHOR_PROVIDER_URL line
   - For devnet, ensure SOLANA_NETWORK_URL is set to https://api.devnet.solana.com

7. Fund your wallet:
   - For local development:
     ```
     ./airdrop.ps1
     ```
   - For devnet:
     ```
     ./airdrop.ps1 -useDevnet
     ```

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

## Switching Between Local and Devnet

To switch between local development and devnet:

1. Update the `.env` files in the project root and backend directory:
   - For local: Uncomment ANCHOR_PROVIDER_URL and local PROGRAM_ID
   - For devnet: Uncomment SOLANA_NETWORK_URL and devnet PROGRAM_ID

2. Restart the backend server and frontend application

## Testing

Run tests using:

## Useful Commands

1. Check your wallet balance:
   - For local development:
     ```
     solana balance --url http://127.0.0.1:8899
     ```
   - For devnet:
     ```
     solana balance --url https://api.devnet.solana.com
     ```

2. Start local Solana validator:
   ```
   solana-test-validator
   ```

3. Deploy your program:
   ```
   solana program deploy target/deploy/certificate.so
   ```

4. View program logs:
   ```
   solana logs --url http://127.0.0.1:8899
   ```