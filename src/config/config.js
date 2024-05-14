import { NetworkEnum } from "@1inch/fusion-sdk";
import dotenv from 'dotenv';
dotenv.config();

const pk = process.env.PK || '';
const authKey = process.env.AUTH_KEY || '';
const ethNetworkRPC = process.env.ETH_NETWORK_RPC || 'https://eth.llamarpc.com';

const OneInchToken = '0x111111111117dC0aa78b770fA6A738034120C302';
const USDCCoinBSC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
const NativeToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const WETH_Token = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const OneInchRouter = '0x1111111254EEB25477B68fb85Ed929f73A960582';
const OneInchTokenAmount = '100'; // 100 inch tokens
const network = NetworkEnum.ETHEREUM;

export { pk, authKey, ethNetworkRPC, OneInchToken, USDCCoinBSC, NativeToken, WETH_Token, OneInchRouter, OneInchTokenAmount, network }