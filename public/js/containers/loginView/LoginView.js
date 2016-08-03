import React, {Component, PropTypes} from 'react'

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

class LoginView extends Component {
    static propTypes = {

    };

    static defaultProps = {
    	pages:{
    		login: {
    			titleOpposite: 'Sign Up',
			    component: LoginForm
		    },
		    signup: {
		    	titleOpposite: 'Log In',
			    component: SignUpForm
		    }
	    }
    };

    constructor(props){
    	super(props);
	    this.state = {
	    	page: this.props.pages.login,
		    isLoading: false
	    }
    }

    changeForm = () => {
    	if (this.state.page == this.props.pages.login){
    	    this.setState({
    	    	page: this.props.pages.signup
	        });
    	} else {
		    this.setState({
			    page: this.props.pages.login
		    });
	    }
    };

    render() {
    	const CurrentPage = this.state.page.component;
        return <div className="loginContainer">
	        <CurrentPage isLoading={this.state.isLoading} className='loginForm'/>
	        <span>or <a onClick={this.changeForm}>{this.state.page.titleOpposite}</a></span>
        </div>
    }
}

export default LoginView;
