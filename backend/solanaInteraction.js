const anchor = require("@project-serum/anchor");
const { Connection, PublicKey, Keypair } = require("@solana/web3.js");
const fs = require("fs");
const { createCertificateProgramInterface, CERTIFICATE_SIZE } = require("../smart-contracts/certificate");

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

module.exports = {
  issueCertificate,
  verifyCertificate,
};