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

	render() {
		return <div className={this.props.className}>
				<h2>Sign Up</h2>
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

export default withRouter(SignUpForm)