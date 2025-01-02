// frontend/src/utils/ethers.js
import { ethers } from 'ethers';

export const getProvider = () => {
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const getSigner = (provider) => {
  return provider.getSigner();
};
