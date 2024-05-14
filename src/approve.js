import { Contract, Wallet, parseUnits } from "ethers";
import abi from "./abi/erc20.json" assert { type: "json" };
let tokenAmount;

const approveERC20Token = async (
  provider,
  contractAddress,
  privateKey,
  spenderAddress,
  amount
) => {
  try {
    const wallet = new Wallet(privateKey);
    const publicKey = wallet.address;
    const signer = wallet.connect(provider);
    const contract = new Contract(contractAddress, abi, signer);
    const decimals = Number(await contract.decimals());
    tokenAmount = parseUnits(amount.toString(), decimals).toString();

    const checkApproval = (
      await contract.allowance(publicKey, spenderAddress)
    ).toString();

    if (tokenAmount !== checkApproval) {
      const txApproval = await contract.approve(spenderAddress, tokenAmount);
      await txApproval.wait();
      console.log(
        `Approved ${tokenAmount} tokens for ${spenderAddress}. TxHash: ${txApproval.hash}`
      );
    }

    return { status: true, amount: tokenAmount };
  } catch (error) {
    console.error(`Failed to approve ERC20 token: ${error}`);
    return { status: false, amount: tokenAmount };
  }
};

export { approveERC20Token };
