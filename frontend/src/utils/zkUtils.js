import { buildPoseidon } from 'circomlibjs';
import BigInt from 'big-integer';

// Polyfill for BigInt
if (typeof BigInt === 'undefined') {
  global.BigInt = require('big-integer');
}

export async function generateZKProof(hashedData) {
    const poseidon = await buildPoseidon();
    const zkProof = poseidon.F.toString(poseidon([BigInt(hashedData)]));
    return zkProof;
  }