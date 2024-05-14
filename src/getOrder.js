const getOrdersByMaker = async (sdk, address) => {
    try {
        return await sdk.getOrdersByMaker({
          page: 1,
          limit: 2,
          address,
        });
        
    } catch (error) {
        console.log(`Orders By Maker: ${err?.response?.data}`);
        return 
    }
};

const getActiveOrders = async (sdk) => {
    try {
        return await sdk.getActiveOrders({ page: 1, limit: 2 });
    } catch (error) {
        console.log(`Active Orders: ${err?.response?.data}`);
        return        
    }
};

export { getOrdersByMaker, getActiveOrders };
