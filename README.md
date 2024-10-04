# Credible: Blockchain-based Professional Credential Verification System

Credible is a platform designed to protect common citizens from fraud professionals by enabling instant verification of professional credentials using the Solana blockchain.

## Project Overview

Credible allows citizens to verify the authenticity of professionals they encounter in daily life, such as government officers, police personnel, or job recruiters. By scanning a QR code on a professional's ID card, users can instantly access verified information stored on the Solana blockchain.

## Key Features

- Simple and accessible QR code scanning for credential verification
- Immutable and secure data storage on the Solana blockchain
- Free basic usage for citizens (1-2 checks daily)
- Real-time verification of professional credentials

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Rust and Cargo
- Solana CLI tools

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

3. Set up your development environment:
   - For local development, use the local Solana test validator
   - For devnet, use the Solana devnet

4. Build and deploy the Solana program:
   ```
   cargo build
   solana program deploy target/deploy/credible.so
   ```

5. Update the PROGRAM_ID in your .env files with the new program ID returned by the deployment command.

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
   - For local: Use the local PROGRAM_ID and local URL
   - For devnet: Use the devnet PROGRAM_ID and SOLANA_NETWORK_URL

2. Restart the backend server and frontend application

## Useful Commands

1. Check your wallet balance:
   - Local: `solana balance --url http://127.0.0.1:8899`
   - Devnet: `solana balance --url https://api.devnet.solana.com`

2. View program logs:
   - Local: `solana logs --url http://127.0.0.1:8899`
   - Devnet: `solana logs --url https://api.devnet.solana.com`

## Contributing

We welcome contributions to the Credible project. Please feel free to submit issues and pull requests.

## License

[Insert appropriate license information here]