import { FusionSDK, PrivateKeyProviderConnector } from "@1inch/fusion-sdk";
import { JsonRpcProvider } from "ethers";
import { approveERC20Token } from "./approve.js";
import { getQuote } from "./getRate.js";
import {
  authKey,
  ethNetworkRPC,
  network,
  OneInchRouter,
  OneInchToken,
  OneInchTokenAmount,
  pk,
  WETH_Token,
} from "./config/config.js";
import { getAddressFromPrivateKey } from "./common/getAddressFromPrivateKey.js";
import { createOrder } from "./createOrder.js";
import { getOrdersByMaker, getActiveOrders } from "./getOrder.js";
// import { PresetEnum } from "@1inch/fusion-sdk/api";

const main = async () => {
  const provider = new JsonRpcProvider(ethNetworkRPC);
  const blockchainProvider = new PrivateKeyProviderConnector(pk, provider);

  // url: "https://fusion.1inch.io",
  const sdk = new FusionSDK({
    url: "https://api.1inch.dev/fusion",
    network: network,
    blockchainProvider,
    authKey: authKey,
  });

  const { status, amount } = await approveERC20Token(
    provider,
    OneInchToken,
    pk,
    OneInchRouter,
    OneInchTokenAmount
  );
  if (status) {
    console.log("-------------------");
    console.log("Approved");
    console.log("-------------------");
  }
  if (!status) {
    console.log("Invalid Approval");
    return;
  }
  const { presets } = await getQuote(sdk, OneInchToken, WETH_Token, amount);
  if (presets) {
    console.log("-------------------");
    console.log(presets);
    console.log("-------------------");
  }

  console.log("Starting to create Fusion Order...");

  const fee = {
    takingFeeBps: 100, // 1% as we use bps format, 1% is equal to 100bps
    takingFeeReceiver: "0x0000000000000000000000000000000000000000", //  fee receiver address
  };
  const info = await createOrder(
    sdk,
    OneInchToken,
    WETH_Token,
    OneInchTokenAmount,
    await getAddressFromPrivateKey(pk),
    presets.fast
  );

  console.log("Finished with Fusion Order...");

  if (info) {
    console.log("-------------------");
    console.log(info);
    console.log("-------------------");
  }

  console.log("Searching for Fusion Orders...");
  const orders = await getOrdersByMaker(
    sdk,
    await getAddressFromPrivateKey(pk)
  );
  if (orders) {
    console.log("-------------------");
    console.log(orders);
    console.log("-------------------");
  }
};

main();
