const { Connection, PublicKey, Keypair, Transaction, SystemProgram } = require('@solana/web3.js');

// Directly embed the base64 private key
const privateKeyBase64 = "MsjcjZ+Zzi4cIAAvb4d3A+/SrZA50l8mQm5sPSikAYCXl3ZM80QAX4Rk2QWAzQdozNbeHXGwWy26mUrnzqjbTQ==";

// Function to save identifier on Solana
async function saveIdentifierOnSolana(identifier) {
  try {
    console.log('Private Key Base64:', privateKeyBase64); // Debugging line

    const privateKey = Uint8Array.from(atob(privateKeyBase64), c => c.charCodeAt(0));
    const keypair = Keypair.fromSecretKey(privateKey);

    // Create a connection to the Solana network
    const connection = new Connection(SOLANA_NETWORK, 'confirmed');

    // Create a transaction to transfer lamports
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: WALLET_ADDRESS,
        lamports: 1000, // Adjust the amount as needed
      })
    );

    // Sign and send the transaction
    const signature = await connection.sendTransaction(transaction, [keypair]);

    // Confirm the transaction
    await connection.confirmTransaction(signature, 'confirmed');

    console.log('Transaction successful with signature:', signature);
    return signature;
  } catch (error) {
    console.error('Error saving identifier on Solana:', error);
    throw error;
  }
}

module.exports = { saveIdentifierOnSolana };