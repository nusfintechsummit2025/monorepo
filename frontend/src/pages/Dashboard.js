import React, { useState } from "react";
import Register from "../components/Register";
import UploadData from "../components/UploadData";
import PurchaseQuery from "../components/PurchaseQuery";
import Rewards from "../components/Rewards";

const Dashboard = () => {
  const [account, setAccount] = useState(null);

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Dashboard</h2>
      <Register account={account} />
      <UploadData account={account} />
      <PurchaseQuery account={account} />
      <Rewards account={account} />
    </div>
  );
};

export default Dashboard;
