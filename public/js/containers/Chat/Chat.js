import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import * as actions from '../../actions/actions';

import MessageBox from '../../components/messageBox';
import UserList from '../../components/userList';

class Chat extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {
			messages: []
        };
        this.socket = null;
    }

    componentDidMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('chat message', (msg) => {
            console.log(msg);
	        this.setState({
	        	messages: this.state.messages.concat(msg)
	        })
        })
    }

    sendMessage = (message) => {
        this.socket.emit('chat message', message, (data) => {
            console.log(data);
	        this.setState({
		        messages: this.state.messages.concat(message)
	        })
        })
    };

    logOut = () => {

    };

    render() {
        return (
            <div>
                <header>
	                <h2>Welcome to chat</h2>
                </header>
                <div>
	                <UserList />
	                <MessageBox
		                sendMessage={this.sendMessage}
	                    messages={this.state.messages}
	                />
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
