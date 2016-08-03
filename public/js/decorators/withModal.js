import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatBtn from '../components/FlatBtn';

function withModal(ComposedComponent) {
    return class WithModal extends Component {

        static defaultProps = {

        };

        constructor() {
            super();
            this.state = {
                showModal: false,
                title: '',
                message: '',
                cb: null,
                beforeClose: null,
                afterClose: null,
                type: 'confirm',
                submitButton: 'SUBMIT',
                cancelButton: 'CANCEL'
            };

            this.isOkPressed = false;
        }

        showModalDialog = (params) => {
            this.isOkPressed = false;
            const state = {...this.state, ...params};
            this.setState({
                ...state,
                showModal: true
            });
        };

        closeModalDialog = (cb) => {
            if (this.state.closeWithAction) {
                return false;
            }
            if (this.state.type === 'info') {
                cb = this.state.cb;
            }
            this.setState({
                showModal: false,
                message: '',
                title: '',
                cb: null,
                beforeClose: null
            }, function () {
                if (typeof cb === 'function') {
                    cb();
                }
                if (typeof this.state.afterClose === 'function') {
                    this.state.afterClose(this.isOkPressed);
                }
            });
        };

        submitCallback = () => {
            this.isOkPressed = true;
            if (typeof this.state.beforeClose === 'function') {
                const shouldClose = this.state.beforeClose();
                if (!shouldClose) {
                    return false;
                }
            }
            this.closeModalDialog(this.state.cb)
        };

        render() {
            const actions = {
                confirm: [
                    <FlatBtn
                        label={this.state.cancelButton}
                        onClick={this.closeModalDialog}
                    />,
                    <FlatBtn
                        label={this.state.submitButton}
                        onClick={this.submitCallback}
                    />
                ],
                info: [
                    <FlatBtn
                        label={this.state.submitButton}
                        onClick={this.submitCallback}
                    />
                ],
                noButtons: []
            };
            const confirmActions = actions[this.state.type];
            return <div>
                <ComposedComponent {...this.props} showModal={this.showModalDialog} />
                <Dialog
                    title={this.state.title}
                    open={this.state.showModal}
                    actions={confirmActions}
                    onRequestClose={this.closeModalDialog}
                >
                    {this.state.message}
                </Dialog>
            </div>;
        }
    };
}

export default withModal;