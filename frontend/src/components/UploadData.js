import React, { useState } from 'react';
import { ethers } from 'ethers';
import { keccak256, toUtf8Bytes } from 'ethers';
import PrivacyManagerABI from '../abis/PrivacyManager.json';
import { create } from 'ipfs-http-client';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const ipfsClient = create('https://ipfs.infura.io:5001/api/v0');

const UploadData = ({ account }) => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [consent, setConsent] = useState(false);

  // Handle JSON file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedJson = JSON.parse(event.target.result);
          setJsonData(parsedJson); // Display parsed JSON
        } catch (err) {
          console.error('Invalid JSON file:', err);
          alert('Invalid JSON file. Please upload a valid JSON.');
        }
      };
      reader.readAsText(selectedFile);
    } else {
      alert('Please upload a JSON file.');
    }
  };

  // // Handle file upload process
  // const handleUpload = async () => {
  //   if (!file || !account) {
  //     alert('File not selected or wallet not connected.');
  //     return;
  //   }

  //   try {
  //     // Encrypt JSON data
  //     const encrypted = CryptoJS.AES.encrypt(JSON.stringify(jsonData), 'your-secret-key').toString(); // Replace with secure key management

  //     // Upload to IPFS
  //     const added = await ipfsClient.add(encrypted);
  //     const cid = added.path;

  //     // Hash the encrypted data
  //     const dataHash = keccak256(toUtf8Bytes(encrypted));

  //     // Interact with PrivacyManager contract
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const privacyManagerAddress = 'YOUR_PRIVACY_MANAGER_CONTRACT_ADDRESS';
  //     const privacyManager = new ethers.Contract(privacyManagerAddress, PrivacyManagerABI, signer);

  //     const tx = await privacyManager.setConsent(consent, `ipfs://${cid}`, dataHash);
  //     await tx.wait();
  //     alert('Data uploaded and consent set successfully!');
  //   } catch (error) {
  //     console.error('Upload error:', error);
  //     alert('Data upload failed.');
  //   }
  // };

  return (
    <div>
      <h2>Upload Your Health Data (JSON)</h2>

      {/* JSON File Input */}
      <input type="file" accept=".json" onChange={handleFileChange} />

      {/* Display JSON Content */}
      {jsonData && (
        <div style={{ marginTop: '10px' }}>
          <h4>Preview JSON Data:</h4>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', maxHeight: '300px', overflowY: 'auto' }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      )}

      <br />
      <label>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        Consent to share data
      </label>
      <br />
      <button onClick={() => {}}>Upload Data</button>
    </div>
  );
};

export default UploadData;