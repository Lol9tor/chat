import React, {Component, PropTypes} from 'react'

class MessageBox extends Component {
    static propTypes = {

    };

    render() {
        return <div>
	        Message box
	        <input type="text" ref={(el)=>{this.input = el}}/>
	        <button>Send</button>
        </div>
    }
}

export default MessageBox