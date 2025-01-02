// src/components/UserInfo.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import PrivacyManagerABI from '../abis/PrivacyManager.json';

const UserInfo = ({ account }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!account) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const privacyManagerAddress = 'YOUR_PRIVACY_MANAGER_ADDRESS';
      const privacyManager = new ethers.Contract(privacyManagerAddress, PrivacyManagerABI, provider);

      const info = await privacyManager.getUserInfo(account);
      setUserInfo(info);
    };

    fetchUserInfo();
  }, [account]);

  if (!userInfo) return <p>Loading...</p>;

  return (
    <div>
      <h3>User Information</h3>
      <p>Registered: {userInfo[0] ? 'Yes' : 'No'}</p>
      <p>Consent: {userInfo[1] ? 'Yes' : 'No'}</p>
      <p>Data URI: {userInfo[2]}</p>
      <p>Data Hash: {userInfo[3]}</p>
    </div>
  );
};

export default UserInfo;
