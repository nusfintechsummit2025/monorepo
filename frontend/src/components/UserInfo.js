import React, { useState } from "react";
import axios from "axios";

const UploadData = ({ account }) => {
  const [file, setFile] = useState(null);
  const [consent, setConsent] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("healthData", file);
    formData.append("userAddress", account);
    formData.append("consent", consent);
    formData.append("secretKey", secretKey);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/data/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(`Upload success! CID: ${data.cid}\nTx Hash: ${data.txHash}`);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>Upload Health Data</h3>
      <p>Your account: {account || "Not connected"}</p>
      <div>
        <label>File:</label>
        <input
          type="file"
          accept=".pdf,.txt,.json,.csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div>
        <label>Consent to share data</label>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
      </div>
      <div>
        <label>Secret Key (for encryption):</label>
        <input
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadData;
