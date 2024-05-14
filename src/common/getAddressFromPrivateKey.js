import { Wallet } from "ethers";

const getAddressFromPrivateKey = async (privateKey) => {
  const wallet = new Wallet(privateKey);
  return wallet.address;
};

export { getAddressFromPrivateKey };
