// backend/zkProof.js
const snarkjs = require('snarkjs');
const fs = require('fs');

const verificationKey = JSON.parse(fs.readFileSync('circuits/identity_verification_key.json'));

async function verifyProof(proof, publicSignals) {
  return await snarkjs.groth16.verify(verificationKey, publicSignals, proof);
}

module.exports = { verifyProof };
