// convertPrivateKey.js
const fs = require('fs');
const path = require('path');

// Path to your JSON private key file
const privateKeyPath = path.resolve(__dirname, 'new-wallet.json');

// Read the JSON private key
const privateKeyJson = JSON.parse(fs.readFileSync(privateKeyPath, 'utf8'));

// Convert the JSON array to a Uint8Array
const privateKeyUint8Array = Uint8Array.from(privateKeyJson);

// Convert the Uint8Array to a base64 string
const privateKeyBase64 = Buffer.from(privateKeyUint8Array).toString('base64');

console.log('Base64 Private Key:', privateKeyBase64);