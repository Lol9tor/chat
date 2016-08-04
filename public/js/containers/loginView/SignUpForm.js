import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { signUp } from '../../actions/actions';

import { FormsyText } from 'formsy-material-ui';
import RaisedBtn from 'material-ui/RaisedButton';

class SignUpForm extends Component {
	static propTypes = {
		className: PropTypes.string.isRequired,
		isLoading: PropTypes.bool.isRequired
	};

	handleValidSubmit = (user, resetForm, invalidateForm) => {
		this.props.signUp(user).then(()=>{
			this.props.router.replace('/chat');
		}).catch((err)=>{
			console.error(err);
			invalidateForm(err.error.fields)
		})
	};

	handleInvalidSubmit = (user, resetForm, invalidateForm) => {
		const errorsObj = {};

		for (let k in user) {
			if (user.hasOwnProperty(k)){
			    if (!user[k]){
			        errorsObj[k] = `${k} is required`
			    }
			}
		}
		invalidateForm(errorsObj);
	};

	mapInputs = inputs => ({
		email: inputs.email,
		username: inputs.username,
		password: inputs.password
	});

	render() {
		return <div className={this.props.className}>
				<h2>Sign Up</h2>
				<Formsy.Form
					ref="form"
					onValidSubmit={this.handleValidSubmit}
					onInvalidSubmit={this.handleInvalidSubmit}
					mapping={this.mapInputs}
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
							name="username"
							floatingLabelText="Username"
							fullWidth={true}
							validations={{
								maxLength: 20,
								minLength: 2
							}}
							validationErrors={{
								minLength: 'Username should be more than 2 symbols',
								maxLength: 'Username should be less than 50 symbols'
							}}
							required
						/>
						<FormsyText
							name="password"
							type="password"
							floatingLabelText="Password"
							fullWidth={true}
							validations="minLength: 6"
							validationError='Password should be more than 6 symbols'
							required
						/>
						<FormsyText
							name="confirmPassword"
							type="password"
							floatingLabelText="Confirm password"
							fullWidth={true}
							validations="equalsField:password"
							validationError='Passwords are not equal'
							required
						/>
					</div>
					<div>
						<RaisedBtn
							type="submit"
							label={this.props.isLoading ? 'Loading...': 'Sign Up'}
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
	(dispatch) => bindActionCreators({signUp}, dispatch)
)(withRouter(SignUpForm));