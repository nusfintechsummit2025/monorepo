import React from "react";
import axios from "axios";

const PurchaseQuery = ({ account }) => {
  const handlePurchase = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/data/purchase`,
        { buyer: account }
      );
      alert(`Purchase success! Tx Hash: ${data.txHash}`);
    } catch (err) {
      console.error("Purchase error:", err);
      alert("Purchase failed");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <h3>Purchase Data Access</h3>
      <p>Your account: {account || "Not connected"}</p>
      <button onClick={handlePurchase}>Buy Access</button>
    </div>
  );
};

export default PurchaseQuery;
