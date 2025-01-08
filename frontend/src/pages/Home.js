import React from "react";
import { Link } from "react-router-dom";
import WalletConnect from "../components/WalletConnect";

const Home = () => {
  return (
    <div style={{
      margin: "0 auto",
      maxWidth: "1200px",
      padding: "4rem 2rem",
      textAlign: "center",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{
        marginBottom: "4rem"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          color: "#2C3E50",
          marginBottom: "1rem"
        }}>
          Welcome to Helix AI
        </h1>
        <h2 style={{
          fontSize: "1.25rem",
          color: "#7F8C8D",
          fontWeight: "normal",
          marginBottom: "3rem"
        }}>
          Securely tokenize your health data and earn rewards.
        </h2>
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem"
        }}>
          <WalletConnect />
          
          <Link 
            to="/dashboard" 
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#3498DB",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              transition: "background-color 0.2s ease",
              fontSize: "1.1rem"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#2980B9"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#3498DB"}
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
