import * as types from '../constants/actionTypes';

const promiseMiddleware = store => next => action => {
    if (action.type !== types.PROMISE) {
        return next(action);
    }

    const [startAction, successAction, failureAction] = action.types;
    store.dispatch({
        type: startAction
    });
    return action.promise.then(
        (data) => store.dispatch({
            type: successAction,
            payload: data
        }),
        (error) => Promise.reject(store.dispatch({
            type: failureAction,
            error
        }))
    );
};

export default promiseMiddleware;