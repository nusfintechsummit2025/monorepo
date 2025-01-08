// src/components/UploadData.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { keccak256, toUtf8Bytes } from 'ethers';
import PrivacyManagerABI from '../abis/PrivacyManager.json';
import { create } from 'ipfs-http-client';
import CryptoJS from 'crypto-js';
import { useEffect } from 'react';

const ipfsClient = create('https://ipfs.infura.io:5001/api/v0'); //TODO: replace with real api


const UploadData = ({ account }) => {
  const [file, setFile] = useState(null);
  const [consent, setConsent] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  // Add new states for results
  const [uploadResult, setUploadResult] = useState("");
  const [mintResult, setMintResult] = useState("");
  const [consentResult, setConsentResult] = useState("");

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
        const dataHash = keccak256(toUtf8Bytes(encrypted));

        // Interact with PrivacyManager
        const provider = new ethers.BrowserProvider(window.ethereum);
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

  // Add UI components
  const SectionCard = ({ children, style }) => (
    <div style={{
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "2rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "2rem",
      width: "100%",
      maxWidth: "600px",
      ...style
    }}>
      {children}
    </div>
  );

  const Button = ({ children, onClick, style }) => (
    <button
      onClick={onClick}
      style={{
        padding: "0.75rem 1.5rem",
        backgroundColor: "#3498DB",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "1.1rem",
        transition: "background-color 0.2s ease",
        width: "100%",
        marginTop: "1rem",
        ...style
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = "#2980B9"}
      onMouseOut={(e) => e.target.style.backgroundColor = "#3498DB"}
    >
      {children}
    </button>
  );

  const ResultTextarea = ({ value }) => (
    <textarea
      readOnly
      value={value}
      placeholder="Results will appear here..."
      style={{
        width: "100%",
        marginTop: "1rem",
        padding: "0.75rem",
        borderRadius: "6px",
        border: "1px solid #ddd",
        minHeight: "60px",
        fontSize: "0.9rem",
        resize: "vertical"
      }}
    />
  );

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2rem",
      padding: "2rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "12px"
    }}>
      <SectionCard>
        <h3 style={{ color: "#2C3E50", marginBottom: "1.5rem" }}>Upload Your Health Data</h3>
        <div style={{ marginBottom: "1rem" }}>
          <label 
            htmlFor="file-upload" 
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3498DB",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1.1rem",
              transition: "background-color 0.2s ease",
              display: "inline-block",
              width: "100%",
              boxSizing: "border-box",
              textAlign: "center"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#2980B9"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#3498DB"}
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf,.txt,.json,.csv"
            style={{ display: 'none' }}
          />
          <div style={{
            marginTop: "0.5rem",
            fontSize: "0.9rem",
            color: "#7F8C8D"
          }}>
            {file ? file.name : "No file selected"}
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Secret Key (for encryption):</label>
          <input
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
              marginTop: "0.5rem"
            }}
          />
        </div>
        <Button onClick={handleUpload}>Upload & Encrypt Data</Button>
        <ResultTextarea value={uploadResult} />
      </SectionCard>

      <SectionCard>
        <h3 style={{ color: "#2C3E50", marginBottom: "1rem" }}>Mint & Share Your Data Token</h3>
        <p style={{ 
          color: "#7F8C8D", 
          marginBottom: "1rem",
          fontSize: "1rem" 
        }}>
          Transform your encrypted health data into a unique Data Token (NFT) on XRPL.
        </p>
        
        <div style={{
          backgroundColor: "#f8f9fa",
          padding: "1rem",
          borderRadius: "6px",
          marginBottom: "1.5rem",
          border: "1px solid #e9ecef"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem"
          }}>
            <input
              type="checkbox"
              id="consent-checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              style={{ 
                width: "18px", 
                height: "18px" 
              }}
            />
            <label 
              htmlFor="consent-checkbox"
              style={{
                fontSize: "1rem",
                color: "#2C3E50",
                fontWeight: "500"
              }}
            >
              Enable Data Sharing & Earn Rewards
            </label>
          </div>
          <p style={{ 
            color: "#7F8C8D",
            fontSize: "0.9rem",
            marginLeft: "24px"  // Aligns with checkbox text
          }}>
            By enabling data sharing, you authorize the use of your Data Token 
            and start earning rewards from data queries.
          </p>
        </div>

        <Button>
          {consent ? "Mint Token & Enable Sharing" : "Mint Token"}
        </Button>
        <ResultTextarea value={mintResult} />
      </SectionCard>
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
