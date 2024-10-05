import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import idl from '../idl.json';

const programID = new PublicKey(idl.metadata.address);
const opts = {
  preflightCommitment: "processed"
}

export const getProvider = () => {
  const connection = new Connection("https://api.devnet.solana.com", opts.preflightCommitment);
  const provider = new AnchorProvider(
    connection, window.solana, opts.preflightCommitment,
  );
  return provider;
}

export const issueCredential = async (proof) => {
  const provider = getProvider();
  const program = new Program(idl, programID, provider);

  try {
    const tx = await program.rpc.issueCredential(proof, {
      accounts: {
        credential: web3.Keypair.generate().publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
    });
    console.log("Transaction signature", tx);
    return tx;
  } catch (err) {
    console.error("Error issuing credential:", err);
    throw err;
  }
}

export const verifyCredential = async (hashedData) => {
  const provider = getProvider();
  const program = new Program(idl, programID, provider);

  try {
    const credential = await program.account.credential.fetch(hashedData);
    return credential !== null;
  } catch (err) {
    console.error("Error verifying credential:", err);
    return false;
  }
}