import * as types from '../constants/actionTypes';
import * as requests from '../utils/api';

export function authenticate() {
    return {
        type: types.PROMISE,
        types: [
            types.AUTHENTICATE,
            types.AUTHENTICATE_SUCCESS,
            types.AUTHENTICATE_ERROR
        ],
        promise: requests.authenticate()
    }
}

export function signIn(user) {
    return {
        type: types.PROMISE,
        types: [
            types.SIGN_IN,
            types.SIGN_IN_SUCCESS,
            types.SIGN_IN_ERROR
        ],
        promise: requests.signIn(user)
    }
}

export function signUp(user) {
    return {
        type: types.PROMISE,
        types: [
            types.SIGN_UP,
            types.SIGN_UP_SUCCESS,
            types.SIGN_UP_ERROR
        ],
        promise: requests.signUp(user)
    }
}

export function logOut() {

    return {
        type: types.PROMISE,
        types: [
            types.LOG_OUT,
            types.LOG_OUT_SUCCESS,
            types.LOG_OUT_ERROR
        ],
        promise: requests.logOut()
    }
}





