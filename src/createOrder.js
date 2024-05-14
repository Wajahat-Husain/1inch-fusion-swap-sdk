const createOrder = async (sdk, from, to, amount, walletAddress, preset) => {
  try {
    console.log({ from, to, amount, walletAddress, preset });
    return await sdk.placeOrder({
      fromTokenAddress: from,
      toTokenAddress: to,
      amount: amount,
      walletAddress,
      preset,
    });
  } catch (err) {
    console.log(`Order Place Error: ${err?.response?.data}`);
    return;
  }
};

export { createOrder };
