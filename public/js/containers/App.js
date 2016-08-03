import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
    static propTypes = {
        sessionToken: PropTypes.string,
        user: PropTypes.object
    };

    static childContextTypes = {
        muiTheme: PropTypes.object
    };

    constructor(props){
        super();
        this.state = {
            isAuthenticate: false
        }

    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        };
    }

    componentDidMount() {

    }

    render() {
        let content = this.props.children;

        return <div>{content}</div>
    }
}

export default connect(
    (state) => {
        return {
            sessionToken: state.sessionToken,
            user: state.user
        };
    },
    (dispatch) => bindActionCreators(actions, dispatch)
)(App);