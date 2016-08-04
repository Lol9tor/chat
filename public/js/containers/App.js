import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {authenticate} from '../actions/actions';

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
            isAuthenticated: false
        }

    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        };
    }

    componentDidMount() {
        this.props.authenticate().then(()=>{
            this.props.router.replace('/chat');
        }).catch((err) => {
            console.log(err);
            this.props.router.replace('/login');
        }).then(()=>{
            this.setAuthentication(true);
        })
    }

    setAuthentication = (val) => {
        this.setState({
            isAuthenticated: val
        })
    };

    render() {
        let content = this.props.children;
        if (!this.state.isAuthenticated) {
            content = <div className='circularProgress'>
                <div>
                    <CircularProgress mode="indeterminate" size={2}/>
                </div>
            </div>;
        }
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
    (dispatch) => bindActionCreators({authenticate}, dispatch)
)(withRouter(App));