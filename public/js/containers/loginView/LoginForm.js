import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { signIn } from '../../actions/actions';

import { FormsyText } from 'formsy-material-ui';
import RaisedBtn from 'material-ui/RaisedButton';


class LoginForm extends Component {
    static propTypes = {
        className: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    handleValidSubmit = (user, resetForm, invalidateForm) => {
		this.props.signIn(user).then(()=>{
			this.props.router.replace('/chat');
		}).catch((err)=>{
			console.log(err);
			invalidateForm(err.error.fields)
		})
    };

	handleInvalidSubmit = (user, resetForm, invalidateForm) => {
		console.log('invalid', user);
	};

    render() {
        return <div className={this.props.className}>
            <h2>Log In</h2>
            <Formsy.Form
                ref="form"
                onValidSubmit={this.handleValidSubmit}
                onInvalidSubmit={this.handleInvalidSubmit}
            >
                <div className="formInputs">
                    <FormsyText
                        name="email"
                        floatingLabelText="Email"
                        fullWidth={true}
                        validations={{
                            isEmail: true,
                            maxLength: 50
                        }}
                        validationErrors={{
                            isEmail: 'Email is not correct',
                            maxLength: 'Email should be less than 50 symbols'
                        }}
                        required
                    />
                    <FormsyText
                        name="password"
                        type="password"
                        floatingLabelText="Password"
                        fullWidth={true}
                        required
                    />
                </div>
                <div>
                    <RaisedBtn
                        type="submit"
                        label={this.props.isLoading ? 'Loading...': 'Log in'}
                        fullWidth={true}
                        primary={true}
                        disabled={this.props.isLoading}
                    />
                </div>
            </Formsy.Form>
        </div>
    }
}

export default connect(
	(state) => {
		return {

		};
	},
	(dispatch) => bindActionCreators({signIn}, dispatch)
)(withRouter(LoginForm));
