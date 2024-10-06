import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';

// Remove the import of the non-existent IDL file
// import idl from '../idl/your_program_idl.json';

const programID = new PublicKey('Htue6EwooAPDGUYaVpU6A9Tip7upVUMYJmXktbSoqQH');
const connection = new Connection('https://api.devnet.solana.com');

export const initializeSolanaProgram = async () => {
  const provider = new AnchorProvider(connection, window.solana, {});
  // For now, we'll use an empty object as a placeholder for the IDL
  const idl = {};
  return new Program(idl, programID, provider);
};

// Add placeholder functions for issueCredential and verifyCredential
export const issueCredential = async (hashedData) => {
  console.log('Issuing credential:', hashedData);
  // Implement actual logic later
  return 'dummy-credential-id';
};

export const verifyCredential = async (hashedData) => {
  console.log('Verifying credential:', hashedData);
  // Implement actual logic later
  return true;
};

export const storeDataOnSolana = async (compressedData) => {
  try {
    const provider = new AnchorProvider(connection, window.solana, {});
    const program = await initializeSolanaProgram();

    // Create a new account to store the data
    const newAccount = web3.Keypair.generate();

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: provider.wallet.publicKey,
        newAccountPubkey: newAccount.publicKey,
        space: compressedData.length,
        lamports: await connection.getMinimumBalanceForRentExemption(compressedData.length),
        programId: programID,
      }),
      // Add an instruction to store the data
      // This is a placeholder and needs to be replaced with your actual program instruction
      program.instruction.storeData(compressedData, {
        accounts: {
          dataAccount: newAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [newAccount],
      })
    );

    const signature = await provider.sendAndConfirm(transaction, [newAccount]);
    console.log('Data stored on Solana with signature:', signature);
    return signature;
  } catch (error) {
    console.error('Error storing data on Solana:', error);
    throw error;
  }
};