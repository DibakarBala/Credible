import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';

// Remove this line
// import idl from '../idl/credible.json';

// Add this line
const idl = {}; // Replace with your actual IDL when available

const programID = new PublicKey('Htue6EwooAPDGUYaVpU6A9Tip7upVUMYJmXktbSoqQH');
const connection = new Connection('http://localhost:8899', 'confirmed');

export async function issueCredential(wallet, hashedData, zkProof) {
  const provider = new AnchorProvider(connection, wallet, { preflightCommitment: 'confirmed' });
  const program = new Program(idl, programID, provider);

  const credential = web3.Keypair.generate();

  try {
    await program.rpc.issueCredential(hashedData, zkProof, {
      accounts: {
        credential: credential.publicKey,
        authority: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [credential],
    });

    return credential.publicKey.toString();
  } catch (error) {
    console.error('Error issuing credential:', error);
    throw error;
  }
}

export async function verifyCredential(wallet, credentialPublicKey, hashedData, zkProof) {
  const provider = new AnchorProvider(connection, wallet, { preflightCommitment: 'confirmed' });
  const program = new Program(idl, programID, provider);

  try {
    const isValid = await program.rpc.verifyCredential(hashedData, zkProof, {
      accounts: {
        credential: new PublicKey(credentialPublicKey),
      },
    });

    return isValid;
  } catch (error) {
    console.error('Error verifying credential:', error);
    throw error;
  }
}