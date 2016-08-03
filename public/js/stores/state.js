import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from '../reducers';
import promise from '../middlewares/promise';

const reducer = combineReducers(reducers),
    createStoreWithMiddlewares = applyMiddleware(promise)(createStore),
    initialState = {
        user: null,
        sessionToken: ''
    },
    store = createStoreWithMiddlewares(reducer, initialState);

export default store;
