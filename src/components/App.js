import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import { useDispatch } from "react-redux";
import { sendEth } from "../actions";
import { ethSenderContract, registryContract } from '../contracts/contract';

const App = () => {
    const dispatch = useDispatch();

    const { account, connect } = useWallet();
    const [amount, setAmount] = useState();
    const [recipient, setRecipient] = useState();
    const [loadingSend, setLoadingSend] = useState(false);

    const handleChangeAmount = (e) => {
        setAmount(e.target.value);
    };

    const handleChangeRecipient = (e) => {
        setRecipient(e.target.value);
    };

    useEffect(() => {
        if (!account) {
            connect();
        }
    }, [account]);

    const onSendEth = () => {
        if (!account) {
            connect();
        }
        if (!loadingSend && account) {
            setLoadingSend(true);
            const time = Math.floor((new Date().getTime())/1000);
            dispatch(sendEth(
                ethSenderContract,
                registryContract,
                amount,
                time,
                recipient
            )).then(() => {
                setLoadingSend(false);
            });
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>
                    <span role="img" aria-label="Bolt">
                    ⚡
                    </span>{' '}
                    Autonomy Network - frontend challenge
                </Title>
                <InputData>
                    <input type="number" value={amount} onChange={handleChangeAmount} placeholder='eth'/>
                    <input type="text" value={recipient} onChange={handleChangeRecipient} placeholder='recipient'/>
                    <button onClick={(e) => onSendEth(e)} type="button">
                        {!loadingSend ? `Send` : `Sending...`}
                    </button>
                </InputData>
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
//   justify-content: space-evenly;
  height: 90vh;
`;

const Title = styled.h1`
  color: black;
  font-size: 2.5rem;
  font-weight: 700;
`;

const InputData = styled.div`
    display: flex;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
    width: 75%;
`;

export default App;
