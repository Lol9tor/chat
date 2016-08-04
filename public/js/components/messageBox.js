import React, {Component, PropTypes} from 'react'

class MessageBox extends Component {
    static propTypes = {
        sendMessage: PropTypes.func.isRequired
    };

    sendMessage = () => {
        const text = this.input.value;
        this.props.sendMessage(text);
        this.input.value = '';
    }

    render() {
        return <div>
	        Message box
	        <input type="text" ref={(el)=>{this.input = el}} onKeyPress={(e) => {
	            if (e.which === 13) {
	                this.sendMessage();
	            }
	        }}/>
	        <button onClick={this.sendMessage}>Send</button>
        </div>
    }
}

export default MessageBox
