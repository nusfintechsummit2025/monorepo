import React, { useState, useEffect } from "react";

const WalletConnect = ({ onConnect }) => {
  const [address, setAddress] = useState(() => {
    // Check if there's a stored address in localStorage
    return localStorage.getItem('walletAddress') || null;
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask first!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]); // Store address
      if (onConnect) onConnect(accounts[0]);
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        const newAddress = accounts[0] || null;
        setAddress(newAddress);
        localStorage.setItem('walletAddress', newAddress); // Update stored address
        if (onConnect) onConnect(newAddress);
      });
    }
  }, [onConnect]);

  return (
    <div style={{ marginBottom: "2rem" }}>
      {address ? (
        <div style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#2ecc71",
          color: "white",
          borderRadius: "6px",
          display: "inline-block",
          fontSize: "1.1rem"
        }}>
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      ) : (
        <button 
          onClick={connectWallet}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3498DB",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1.1rem",
            transition: "background-color 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#2980B9"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#3498DB"}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
