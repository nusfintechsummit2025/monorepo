// src/components/UploadData.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import PrivacyManagerABI from '../abis/PrivacyManager.json';
import { create } from 'ipfs-http-client';
import CryptoJS from 'crypto-js';

const ipfsClient = create('https://ipfs.infura.io:5001/api/v0'); //TODO: replace with real api


const UploadData = ({ account }) => {
  const [file, setFile] = useState(null);
  const [consent, setConsent] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !account) {
      alert('File not selected or wallet not connected.');
      return;
    }

    // Encrypt the file
    const reader = new FileReader();
    reader.onload = async () => {
      const fileContent = reader.result;
      const encrypted = CryptoJS.AES.encrypt(fileContent, 'your-secret-key').toString(); //TODOL encrypt with real key

      // Upload to IPFS
      try {
        const added = await ipfsClient.add(encrypted);
        const cid = added.path;

        // Hash the encrypted data
        const dataHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(encrypted));

        // Interact with PrivacyManager
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const privacyManagerAddress = 'YOUR_PRIVACY_MANAGER_CONTRACT_ADDRESS';
        const privacyManager = new ethers.Contract(privacyManagerAddress, PrivacyManagerABI, signer);

        const tx = await privacyManager.setConsent(consent, `ipfs://${cid}`, dataHash);
        await tx.wait();
        alert('Data uploaded and consent set successfully!');
      } catch (error) {
        console.error('Upload error:', error);
        alert('Data upload failed.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h2>Upload Your Health Data</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <label>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        Consent to share data
      </label>
      <br />
      <button onClick={handleUpload}>Upload Data</button>
    </div>
  );
};

export default UploadData;

// // Example using CryptoJS in UploadData component
// import CryptoJS from 'crypto-js';

// // Encrypt data
// const encrypted = CryptoJS.AES.encrypt(fileContent, 'your-secret-key').toString();

// // Decrypt data
// const bytes = CryptoJS.AES.decrypt(encrypted, 'your-secret-key');
// const decrypted = bytes.toString(CryptoJS.enc.Utf8);