import * as types from '../constants/actionTypes';

export function user(state = null, action) {
    switch (action.type) {
        case types.SIGN_IN:
        case types.SIGN_UP:
        case types.AUTHENTICATE:
            return state;
        case types.SIGN_IN_SUCCESS:
        case types.SIGN_UP_SUCCESS:
        case types.AUTHENTICATE_SUCCESS:
            return action.payload;
        case types.SIGN_IN_ERROR:
        case types.SIGN_UP_ERROR:
        case types.AUTHENTICATE_ERROR:
        case types.LOG_OUT_SUCCESS:
            return null;
        default:
            return state;
    }
}

export function sessionToken(state = '', action) {
    switch (action.type) {

        default:
            return state;
    }
}
