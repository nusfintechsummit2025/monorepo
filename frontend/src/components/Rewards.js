import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import RLUSD_ABI from "../abis/RLUSDStablecoin.json";
import MARKET_ABI from "../abis/DataMarketplace.json";

const RLUSD_ADDRESS = "0x123...RLUSD";
const MARKET_ADDRESS = "0x789...DataMarketplace";

const Rewards = ({ account }) => {
  const [balance, setBalance] = useState("0");
  const [reputation, setReputation] = useState("0");

  useEffect(() => {
    if (!account) return;

    const fetchData = async () => {
      // Connect via browser's Ethereum provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const rlusd = new ethers.Contract(RLUSD_ADDRESS, RLUSD_ABI, provider);
      const market = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, provider);

      const bal = await rlusd.balanceOf(account);
      setBalance(ethers.utils.formatEther(bal));

      const rep = await market.getReputation(account);
      setReputation(rep.toString());
    };
    fetchData();
  }, [account]);

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h3>Rewards & Reputation</h3>
      <p>Your account: {account || "Not connected"}</p>
      <p>RLUSD Balance: {balance}</p>
      <p>Reputation: {reputation}</p>
    </div>
  );
};

export default Rewards;
