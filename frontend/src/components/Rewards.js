import React from "react";

const Rewards = () => {
  const address = localStorage.getItem('walletAddress');

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

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      backgroundColor: "#f8f9fa",
      padding: "2rem",
      borderRadius: "12px"
    }}>
      <SectionCard style={{
        backgroundColor: "white",
        marginBottom: 0
      }}>
        <h3 style={{ 
          color: "#2C3E50", 
          marginBottom: "2rem",
          textAlign: "center",
          fontSize: "1.8rem"
        }}>
          Wallet Balance
        </h3>
        
        <div style={{
          backgroundColor: "#3498DB",
          borderRadius: "12px",
          padding: "2rem",
          color: "white",
          marginBottom: "2rem"
        }}>
          <div style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "1rem"
          }}>
            100 HELIXUSD
          </div>
          <div style={{
            fontSize: "0.9rem",
            opacity: 0.9,
            textAlign: "center"
          }}>
            Available Balance
          </div>
        </div>

        <div style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          padding: "1.5rem",
          border: "1px solid #e9ecef"
        }}>
          <div style={{
            color: "#7F8C8D",
            fontSize: "0.9rem",
            marginBottom: "0.5rem"
          }}>
            Connected Wallet
          </div>
          <div style={{
            color: "#2C3E50",
            fontSize: "1.1rem",
            fontFamily: "monospace",
            wordBreak: "break-all"
          }}>
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default Rewards;
