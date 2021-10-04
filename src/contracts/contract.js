import REGISTRY_ABI from './abis/Registry.abi.json';
import ETHSENDER_ABI from './abis/EthSender.abi.json';

export const REGISTRY_ADDRESS = '0x3C901dc595105934D61DB70C2170D3a6834Cb8B7';
export const ETHSENDER_ADDRESS = '0xfa0a8b60b2af537dec9832f72fd233e93e4c8463';

export const registryContract = {
    abi: REGISTRY_ABI,
    address: REGISTRY_ADDRESS
};

export const ethSenderContract = {
    abi: ETHSENDER_ABI,
    address: ETHSENDER_ADDRESS
};
