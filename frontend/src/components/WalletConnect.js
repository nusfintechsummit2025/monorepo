import React, { useState, useEffect } from "react";

const WalletConnect = ({ onConnect }) => {
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask first!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAddress(accounts[0]);
      if (onConnect) onConnect(accounts[0]);
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAddress(accounts[0]);
        if (onConnect) onConnect(accounts[0]);
      });
    }
  }, [onConnect]);

  return (
    <div>
      {address ? (
        <p>Connected: {address}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
