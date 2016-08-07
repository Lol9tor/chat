import React, {Component, PropTypes} from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ChatMessage from './chatMessage';
import StatusMessage from './statusMessage';

const styles = {
	btnLabel: {
		fontSize: '16px',
		fontWeight: 'bold'
	},
	btn: {
		width: '14%'
	},
	input: {
		width: '84%',
		marginRight: '1%'
	}
};

class MessageBox extends Component {
    static propTypes = {
        sendMessage: PropTypes.func.isRequired,
	    messages: PropTypes.array.isRequired
    };

    constructor(){
        super();
        this.state = {
            value: ''
        }
    }

    sendMessage = () => {
        const text = this.state.value;

	    if (!text){
	        return false;
	    }
        this.props.sendMessage(text);
        this.setState({
            value: ''
        })
    };

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    onEnterPress = (e) => {
        if (e.which === 13) {
            this.sendMessage();
        }
    };

    render() {
        return <div className="messageBox">
	        <div className="messageList">
		        {this.props.messages.map((msg, i) => {
                    return msg.username ? <ChatMessage
                        key={i}
                        msg={msg}
                        user={this.props.user}
                    /> : <StatusMessage key={i} message={msg.message}/>
                })}
	        </div>
	        <div>
		        <TextField
			        type="text"
                    value={this.state.value}
			        onKeyPress={this.onEnterPress}
                    onChange={this.handleChange}
			        hintText="Type message..."
		            style={styles.input}
		        />
		        <RaisedButton
			        label="Send"
			        primary={true}
			        style={styles.btn}
					onClick={this.sendMessage}
			        labelStyle={styles.btnLabel}
		        />
	        </div>
        </div>
    }
}

export default MessageBox
