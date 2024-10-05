const anchor = require("@project-serum/anchor");
const { Connection, PublicKey, Keypair, Transaction } = require("@solana/web3.js");
const fs = require("fs");
const { createCertificateProgramInterface, CERTIFICATE_SIZE } = require("../smart-contracts/certificate");
const { Reclaim } = require('@reclaimprotocol/js-sdk');

const PROGRAM_ID = new PublicKey("9hJYuQXybHoguzW5gxBcx2iFbgWzGvYUX6SzXLEA77gD");  // Paste the new program ID here

// Load the keypair from the JSON file
const rawKeypair = JSON.parse(fs.readFileSync("c:/Users/Dibakar/.config/solana/id.json", "utf-8"));
const keypair = Keypair.fromSecretKey(new Uint8Array(rawKeypair));

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const provider = new anchor.AnchorProvider(connection, new anchor.Wallet(keypair), {
  preflightCommitment: "confirmed",
});

anchor.setProvider(provider);

const program = new anchor.Program(require("../smart-contracts/target/idl/certificate.json"), PROGRAM_ID);
const certificateProgram = createCertificateProgramInterface(program);

async function issueCertificate(certificate) {
  const [certificatePda] = await PublicKey.findProgramAddress(
    [Buffer.from(certificate.uniqueIdentifier)],
    program.programId
  );

  await certificateProgram.issueCertificate(certificate, certificatePda, keypair.publicKey);
  return certificatePda;
}

async function verifyCertificate(uniqueIdentifier) {
  const [certificatePda] = await PublicKey.findProgramAddress(
    [Buffer.from(uniqueIdentifier)],
    program.programId
  );

  return await certificateProgram.verifyCertificate(certificatePda);
}

// Remove Okto-specific code
// const okto = new Okto();

async function payForPremiumFeature(amount, fromPubkey, toPubkey) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports: amount * LAMPORTS_PER_SOL
    })
  );

  // Sign and send the transaction
  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [keypair]
  );

  return signature;
}

// Update the backend to interact with the new smart contract
async function issueCredential(proof) {
  const reclaim = new Reclaim();
  const verifiedProof = await reclaim.verifyProof(proof);
  
  if (verifiedProof) {
    const tx = await program.rpc.issueCredential(proof, {
      accounts: {
        // ... account details ...
      },
    });
    return tx;
  } else {
    throw new Error('Invalid proof');
  }
}

async function verifyCredential(providedData) {
  const hashedProvidedData = await Reclaim.hashData(providedData);
  return await program.rpc.verifyCredential(hashedProvidedData);
}

module.exports = {
  issueCertificate,
  verifyCertificate,
  payForPremiumFeature,
  issueCredential,
  verifyCredential,
};