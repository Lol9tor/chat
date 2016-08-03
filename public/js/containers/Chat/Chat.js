import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';

class Chat extends Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {

    }

    logOut = () => {

    };

    render() {
        const path = this.props.location.pathname;

        return (
            <div>
                <header>Welcome to chat</header>
                Chat will be here
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {

        };
    },
    (dispatch) => bindActionCreators(actions, dispatch)
)(Chat);