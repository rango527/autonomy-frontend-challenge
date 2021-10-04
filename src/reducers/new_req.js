import {
    NEW_REQ
} from '../actions/types';

const initialState = {
    newReq: false
};

export default function (state = initialState, action) {
    switch (action.type) {
    case NEW_REQ:
        return {
            ...state,
            newReq: action.payload.success,
        };
    default:
        return state;
    }
}
