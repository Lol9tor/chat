"use strict";
import React, { Component } from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './stores/state';

import App from './containers/App';
import LoginView from './containers/loginView/LoginView';
import Chat from './containers/Chat/Chat';

export default class AppRouter extends Component {

    render() {
        // const {} = components;
        return(
            <Provider store={ store }>
                <Router history={ hashHistory }>
                    <Redirect from="/" to="/login"/>
                    <Route path="/" component={App}>
                        <Route path="login" component={LoginView} />
                        <Route path="chat" component={Chat} onEnter={requireAuth} />
                    </Route>
                    <Redirect from="*" to="/login"/>
                </Router>
            </Provider>
        );
    }
}

function requireAuth(nextState, replace) {
    const state = store.getState();
    const isLoggedIn = !!state.user;
    if (!isLoggedIn){
        replace('/login');
    }
}
