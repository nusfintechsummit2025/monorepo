import React, { useState } from "react";
import Register from "../components/Register";
import UploadData from "../components/UploadData";
import PurchaseQuery from "../components/PurchaseQuery";
import Rewards from "../components/Rewards";

const Dashboard = () => {
  const [account, setAccount] = useState(null);

  return (
    <div style={{
      margin: "0 auto",
      maxWidth: "1200px",
      padding: "2rem",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "3rem",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          color: "#2C3E50",
          marginBottom: "1rem"
        }}>
          Dashboard
        </h1>
        <p style={{
          fontSize: "1.25rem",
          color: "#7F8C8D",
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          Manage your health data, tokens, and rewards
        </p>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem"
      }}>
        <Register account={account} />
        <UploadData account={account} />
        {/* <PurchaseQuery account={account} /> */}
        <Rewards account={account} />
      </div>
    </div>
  );
};

export default Dashboard;
