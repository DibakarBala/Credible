# Self-Instruction Guide for Solana Certificate Project

## For Local Solana Development

1. Run the airdrop script to generate a new keypair and start a new local validator and fund your wallet:
   ```
   ./airdrop.ps1
   ```
2. Edit the program id in the .env file to the new id returned by the airdrop script

2. Transfer funds to the backend wallet:
   ```
   solana transfer --allow-unfunded-recipient $(solana address -k backend/test-wallet.json) 100 --url http://127.0.0.1:8899
   ```

3. Build the Solana program:
   ```
   cargo build
   ```

4. Deploy the Solana program:
   ```
   solana program deploy --url http://127.0.0.1:8899 target/deploy/certificate.so
   ```
5. change the program id in the .env file to the new id returned by the solana program deploy command

5. Start the backend server:
   ```
   cd backend
   node server.js
   ```

6. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

Remember to update the PROGRAM_ID in your .env files if it changes after deployment.