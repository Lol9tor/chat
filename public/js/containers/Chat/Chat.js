import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';
import {getAllUsers} from '../../utils/api'

import MessageBox from '../../components/messageBox';
import UserList from '../../components/userList';

class Chat extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
		getAllUsers();
    }

    logOut = () => {

    };

    render() {
        return (
            <div>
                <header>
	                <h2>Welcome to chat</h2>
                </header>
                <div>
	                <UserList/>
	                <MessageBox/>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {

        };
    },
    (dispatch) => bindActionCreators(actions, dispatch)
)(Chat);