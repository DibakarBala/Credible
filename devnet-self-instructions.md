# Devnet Deployment Self-Instructions

Follow these steps to deploy your Solana program to devnet:

1. Check the balance of your Solana wallet:
   ```solana balance BCkWwZyaNZQCwmVPu7C75TZkyDBjoX9m5NwYZcUTmBHe --url https://api.devnet.solana.com```

2. If the balance is low, add funds:
   - Visit https://faucet.solana.com/
   - Request an airdrop to your wallet address: BCkWwZyaNZQCwmVPu7C75TZkyDBjoX9m5NwYZcUTmBHe

3. Build the project:
   ```anchor build```

4. Deploy the program:
   ```anchor deploy```

5. If there's an issue during deployment:
   a. Change the program ID in the following files to BCkWwZyaNZQCwmVPu7C75TZkyDBjoX9m5NwYZcUTmBHe:
      - `.env`
      - `Anchor.toml`
      - `programs/credible/src/lib.rs`
   
   b. Rebuild and redeploy:
      ```anchor build
      anchor deploy```

6. If there's no issue, proceed to the next steps in your development process.

7. After deployment, update the program ID in the following files:
   a. Note the new program ID provided in the deployment output.
   b. Update the program ID in the following files with the new ID:
      - `.env`
      - `Anchor.toml`
      - `programs/credible/src/lib.rs`
   
   c. Rebuild and redeploy:
      ```anchor build
      anchor deploy```

Remember to always keep your wallet funded with enough SOL for deployments and transactions on devnet.