const getQuote = async (sdk, fromTokenAddress, toTokenAddress, amount) => {
  const params = {
    fromTokenAddress,
    toTokenAddress,
    amount,
  };
  return await sdk.getQuote(params);
};

export { getQuote };
