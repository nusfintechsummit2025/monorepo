import React from "react";
import { Link } from "react-router-dom";
import WalletConnect from "../components/WalletConnect";

const Home = () => {
  return (
    <div style={{ margin: "2rem" }}>
      <h1>Healthcare DApp</h1>
      <WalletConnect />
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default Home;
