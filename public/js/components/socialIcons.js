import React, {Component, PropTypes} from 'react'

class SocialIcons extends Component {
    static propTypes = {

    };

    handleClick = (social) => () => {
        this.props.handleClick(social);
    };

    render() {
        return <div className="socialIcons">
			<img
				src="http://mccrindle.com.au/blog/2012-12/Top-Google-Searches-2012.png"
				alt="facebook"
			    width={40}
			    height={40}
			    onClick={this.handleClick('google')}
			/>
			<img
				src="http://3.bp.blogspot.com/-VCYnVm93v8M/VrOKs0M5YiI/AAAAAAAAABw/U5KdMf7beqM/s320/Facebook_icon.svg.png"
			    alt="google"
				width={40}
				height={40}
				onClick={this.handleClick('facebook')}
			/>
        </div>;
    }
}

export default SocialIcons;