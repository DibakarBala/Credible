require('dotenv').config();
const express = require('express');
const { Connection, PublicKey, Keypair, Transaction, SystemProgram, TransactionInstruction, sendAndConfirmTransaction } = require('@solana/web3.js');
const cors = require('cors');
const fs = require('fs');
const borsh = require('borsh');
const app = express();
const port = 3001;

console.log('Current working directory:', process.cwd());
console.log('Environment variables:', process.env);

//const connection = new Connection('http://127.0.0.1:8899', 'confirmed'); //COMMENT OUT TO USE LOCAL NETWORK
const connection = new Connection(process.env.SOLANA_NETWORK_URL || 'http://127.0.0.1:8899', 'confirmed'); //UNCOMMENT TO USE DEVNET

console.log('PROGRAM_ID from env:', process.env.PROGRAM_ID);
let programId;
try {
    if (!process.env.PROGRAM_ID) {
        throw new Error('PROGRAM_ID is not defined in the environment variables');
    }
    programId = new PublicKey(process.env.PROGRAM_ID);
    console.log('Program ID initialized:', programId.toString());
} catch (error) {
    console.error('Error initializing Program ID:', error);
    process.exit(1);
}

app.use(express.json());
app.use(cors());

class Certificate {
    constructor(props) {
        this.student_name = props.studentName;
        this.unique_id = props.uniqueId;
    }
}

const CertificateSchema = {
    struct: {
        student_name: 'string',
        unique_id: 'string',
    }
};

// Load the keypair from the JSON file
const keypairData = JSON.parse(fs.readFileSync('test-wallet.json', 'utf-8'));
const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));

app.post('/issue-certificate', async (req, res) => {
    try {
        const certificateData = new Certificate(req.body);
        console.log('Certificate data to be issued:', certificateData);
        
        const serializedData = borsh.serialize(CertificateSchema, certificateData);
        console.log('Serialized certificate data:', serializedData);
        const instructionData = Buffer.from(serializedData);

        const [certificatePDA, _] = await PublicKey.findProgramAddress(
            [instructionData],
            programId
        );

        console.log(`Certificate PDA: ${certificatePDA.toBase58()}`);

        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: certificatePDA, isSigner: false, isWritable: true },
                { pubkey: keypair.publicKey, isSigner: true, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId,
            data: instructionData,
        });

        const transaction = new Transaction().add(instruction);
        
        console.log('Sending transaction...');
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [keypair],
            {
                skipPreflight: false,
                preflightCommitment: 'confirmed',
                confirmation: 'confirmed',
            }
        );
        console.log('Transaction confirmed. Signature:', signature);

        res.json({ message: 'Certificate issued successfully', certificateId: certificatePDA.toBase58() });
    } catch (error) {
        console.error('Error in /issue-certificate:', error);
        if (error instanceof Error && 'logs' in error) {
            console.error('Transaction logs:', error.logs);
        }
        res.status(500).json({ 
            error: error.message, 
            logs: error.logs,
        });
    }
});

app.get('/verify-certificate/:id', async (req, res) => {
    try {
        const certificateId = new PublicKey(req.params.id);
        const accountInfo = await connection.getAccountInfo(certificateId);
        
        if (accountInfo) {
            console.log('Account data:', accountInfo.data);
            
            // Parse the data manually
            let offset = 0;
            const studentNameLength = accountInfo.data.readUInt32LE(offset);
            offset += 4;
            const studentName = accountInfo.data.slice(offset, offset + studentNameLength).toString();
            offset += studentNameLength;
            
            const uniqueIdLength = accountInfo.data.readUInt32LE(offset);
            offset += 4;
            const uniqueId = accountInfo.data.slice(offset, offset + uniqueIdLength).toString();
            
            const certificateData = {
                student_name: studentName,
                unique_id: uniqueId
            };
            
            console.log('Parsed certificate data:', certificateData);
            res.json({ message: 'Certificate verified', data: certificateData });
        } else {
            res.status(404).json({ message: 'Certificate not found' });
        }
    } catch (error) {
        console.error('Error in /verify-certificate:', error);
        res.status(500).json({ error: error.message });
    }
});

const { ReclaimProofRequest } = require('@reclaimprotocol/js-sdk');

const APP_ID = "0x336a0772E83d5a84F70779D4B5533766ca3C2D16";
const APP_SECRET = "0x37b0bb8d34a1e73853b197f45969875a40e1c9c57bb34e9c8a6270cb4c11f05b";
const GITHUB_PROVIDER_ID = "6d3f6753-7ee6-49ee-a545-62f1b1822ae5";

app.post('/generate-request', async (req, res) => {
    try {
        const reclaimProofRequest = await ReclaimProofRequest.init(
            APP_ID,
            APP_SECRET,
            GITHUB_PROVIDER_ID,
            { log: true }
        );
        
        const url = await reclaimProofRequest.getRequestUrl();
        const sessionId = reclaimProofRequest.sessionId;

        res.json({ url, sessionId });
    } catch (error) {
        console.error('Error generating request:', error);
        res.status(500).json({ error: 'Failed to generate request' });
    }
});

app.get('/check-status/:sessionId', async (req, res) => {
    const { sessionId } = req.params;

    try {
        const reclaimProofRequest = await ReclaimProofRequest.init(
            APP_ID,
            APP_SECRET,
            GITHUB_PROVIDER_ID,
            { log: true }
        );

        const status = await reclaimProofRequest.getSessionStatus(sessionId);
        res.json(status);
    } catch (error) {
        console.error('Error checking status:', error);
        res.status(500).json({ error: 'Failed to check status' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Using program ID: ${programId.toString()}`);
});