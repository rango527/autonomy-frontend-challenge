import { NEW_REQ } from "./types";
import { getWeb3 } from '../services/web3';

export const sendEth =
    (ethSender, registry, ethForCall, time, userAddress) => async (dispatch) => {
        try {
            const web3 = await getWeb3();

            const ethSenderContract = new web3.eth.Contract(ethSender.abi, ethSender.address);
            const registryContract = new web3.eth.Contract(registry.abi, registry.address);

            const amount = web3.utils.toWei(ethForCall.toString(), 'ether');
            const value = web3.utils.toWei((parseFloat(ethForCall)+0.01).toString(), 'ether');

            const account = await web3.eth.getAccounts();

            const callData = await ethSenderContract.methods.sendEthAtTime(time, userAddress).encodeABI();

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
                    value
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