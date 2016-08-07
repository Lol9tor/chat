import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import io from 'socket.io-client';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import {logOut} from '../../actions/actions';

import MessageBox from '../../components/messageBox';
import UserList from '../../components/userList';

const iconStyle = {
    float: "right",
    width: "36px",
    height: "36px"
};

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
        this.socket.emit('user join', this.props.user);
        this.socket.on('chat message', (msg) => {
	        this.setState({
	        	messages: this.state.messages.concat(msg)
	        });
        });
        this.socket.on('user join', (msg) => {
            this.setState({
                messages: this.state.messages.concat(msg)
            });
        });
        this.socket.on('user leave', (msg) => {
            this.setState({
                messages: this.state.messages.concat(msg)
            });
        });
    }

    componentWillUnmount() {
        this.socket.emit('leave', this.props.user);
    }

    sendMessage = (message) => {
        const obj = {
            username: this.props.user.username,
            message: message
        };
        this.socket.emit('chat message', obj, (timestamp) => {
            console.log(timestamp);
            obj.timestamp = timestamp;
	        this.setState({
		        messages: this.state.messages.concat(obj)
	        })
        })
    };

    logOut = () => {
        this.socket.emit('leave', this.props.user);
        this.props.logOut(this.props.user).then(()=>{
            this.props.router.replace('/login');
        }).catch((err)=>{
            console.log(err);
        });
    };

    render() {
        return (
            <div>
                <div>
                    <Exit style={iconStyle} onClick={this.logOut}/>
                </div>
                <header>
	                <h2>Welcome to chat</h2>
                </header>
                <div>
	                <UserList />
	                <MessageBox
                        user={this.props.user}
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
            user: state.user
        };
    },
    (dispatch) => bindActionCreators({logOut}, dispatch)
)(withRouter(Chat));
