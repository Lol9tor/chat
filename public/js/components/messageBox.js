import React, {Component, PropTypes} from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ChatMessage from './chatMessage';

const styles = {
	btnLabel: {
		fontSize: '16px',
		fontWeight: 'bold'
	},
	btn: {
		width: '14%'
	},
	input: {
		width: '85%',
		marginRight: '1%'
	}
};

class MessageBox extends Component {
    static propTypes = {
        sendMessage: PropTypes.func.isRequired,
	    messages: PropTypes.array.isRequired
    };

    sendMessage = () => {
        const text = this.input.value;
		console.log(text);
	    if (!text){
	        return false;
	    }
        this.props.sendMessage(text);
        this.input.value = '';
    };

    render() {
        return <div className="messageBox">
	        <div>
		        {this.props.messages.map((msg, i) => <ChatMessage key={i} message={msg}/>)}
	        </div>
	        <div>
		        <TextField
			        type="text"
			        ref={(el)=>{this.input = el}}
			        onKeyPress={(e) => {
				        if (e.which === 13) {
					        this.sendMessage();
				        }
		            }}
			        hintText="Type message..."
		            style={styles.input}
		        />
		        <RaisedButton
			        label="Send"
			        primary={true}
			        style={styles.btn}
			        labelStyle={styles.btnLabel}
		        />
	        </div>
        </div>
    }
}

export default MessageBox
