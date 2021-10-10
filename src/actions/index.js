import { NEW_REQ } from "./types";
import { getWeb3, getGasPrice } from '../services/web3';

export const sendEth =
    (ethSender, registry, ethForCall, time, recipientAddress) => async (dispatch) => {
        try {
            const web3 = await getWeb3();
            const prices = await getGasPrice();

            const ethSenderContract = await new web3.eth.Contract(ethSender.abi, ethSender.address);
            const executeTime = Math.floor((new Date().getTime())/1000 + parseFloat(time)*60);
            const callData = await ethSenderContract.methods.sendEthAtTime(executeTime, recipientAddress).encodeABI();

            const registryContract = await new web3.eth.Contract(registry.abi, registry.address);
            const amount = await web3.utils.toWei(ethForCall.toString(), 'ether');
            const sentAmount = await web3.utils.toWei((parseFloat(ethForCall) + 0.01).toString(), 'ether');

            const account = await web3.eth.getAccounts();

            const gasLimit = await registryContract.methods
                .newReq(
                    ethSender.address,// target
                    "0x0000000000000000000000000000000000000000", // referer
                    callData, // callData
                    amount, // ethForCall
                    false, // verifyUser
                    false, // insetFeeAmount
                    false // payWithAUTO or isAlive
                )
                .estimateGas({
                    from: account[0],
                    value: sentAmount,
                });

            await registryContract.methods.newReq(
                ethSender.address,// target
                "0x0000000000000000000000000000000000000000", // referer
                callData, // callData
                amount, // ethForCall
                false, // verifyUser
                false, // insetFeeAmount
                false // payWithAUTO or isAlive
            )
                .send({
                    from: account[0],
                    value: sentAmount,
                    gasPrice: web3.utils.toWei(prices.medium.toString(), "gwei"),
                    gas: Math.round(gasLimit),
                });

            dispatch({
                type: NEW_REQ,
                payload: true,
            });
        } catch (error) {
            // eslint-disable-next-line import/prefer-default-export
            console.log('error', error);
        }
    };

export const newFunc = () => {};