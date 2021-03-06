export const NETWORK = {
    MAIN: 1,
    ROPSTEIN: 3,
    RINKEBY: 4,
    GOERLI: 5,
    KOVAN: 42,
};

export const getNetworkChainId = () => {
    const { REACT_APP_BUILD_MODE } = process.env;

    if (REACT_APP_BUILD_MODE === "production") {
        return NETWORK.MAIN;
    }
    return NETWORK.ROPSTEIN;
};

export const RESPONSE = {
    SUCCESS: 100,
    INSUFFICIENT: 200,
    ERROR: 300,
    SHOULD_APPROVE: 400,
    SHOULD_STAKE: 500,
};
