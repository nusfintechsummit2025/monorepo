// backend/filecoin.js
const { createPowClient } = require('@textile/powergate-client');

const client = createPowClient('localhost:6002'); // Adjust based on your setup

module.exports = client;
