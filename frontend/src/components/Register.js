import React, { useState } from "react";
import axios from "axios";

const Register = ({ account }) => {
  const [proofA, setProofA] = useState("");
  const [proofB, setProofB] = useState("");
  const [proofC, setProofC] = useState("");
  const [publicSignals, setPublicSignals] = useState("");

  const handleRegister = async () => {
    try {
      const body = {
        proof: {
          a: proofA,
          b: proofB,
          c: proofC,
        },
        publicSignals: publicSignals.split(",").map((val) => val.trim()), 
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
        body
      );
      alert(`Registration success! Tx Hash: ${data.txHash}`);
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>Register with ZK Proof</h3>
      <p>Your account: {account || "Not connected"}</p>
      <div>
        <label>Proof A:</label>
        <input
          type="text"
          value={proofA}
          onChange={(e) => setProofA(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <div>
        <label>Proof B:</label>
        <input
          type="text"
          value={proofB}
          onChange={(e) => setProofB(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <div>
        <label>Proof C:</label>
        <input
          type="text"
          value={proofC}
          onChange={(e) => setProofC(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <div>
        <label>Public Signals (comma-separated):</label>
        <input
          type="text"
          value={publicSignals}
          onChange={(e) => setPublicSignals(e.target.value)}
          placeholder="e.g. 1234, 5678"
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
