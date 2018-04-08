import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    addContact: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    selectedContact: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired
    }).isRequired
};

class ModalAdd extends Component {
    state = {
        inputName: '',
        inputPhoneNumber: ''
    };
    componentDidMount = () => {
        this.nameInput.focus();
    };
    inputChangeNameHandler = (event) => {
        this.setState({
            inputName: event.target.value
        });
    };
    inputChangePhoneHandler = (event) => {
        this.setState({
            inputPhoneNumber: (event.target.value.match(/^[0-9+()-]*$/) ? event.target.value : this.state.inputPhoneNumber)
        });
    };
    keyPressHandler = (event) => {
        if (event.which === 13 && this.validateSubmitButton()) {
            this.addContactHandler();
        }
    };
    addContactHandler = () => {
        this.props.addContact({
            id: Date.now(),
            name: this.state.inputName,
            phoneNumber: this.state.inputPhoneNumber,
            img: '/src/img/contact.jpeg'
        });
        this.props.toggleModal();
        this.props.history.replace(`/contact/${this.props.selectedContact.id}`);
    };
    closeContactHandler = () => {
        this.props.toggleModal();
        this.props.history.replace(`/contact/${this.props.selectedContact.id}`);
    };
    validateSubmitButton = () => (!this.state.inputName || !this.state.inputPhoneNumber);

    render = () => (
        <div className="modal-buttons-container">
            <input
                className="category-add-input"
                type="text"
                placeholder="Contact name"
                value={this.state.inputName}
                onChange={this.inputChangeNameHandler}
                onKeyPress={this.keyPressHandler}
                ref={(input) => {
                    this.nameInput = input;
                }}
            />
            <input
                className="category-add-input"
                type="text"
                placeholder="Phone number"
                value={this.state.inputPhoneNumber}
                onChange={this.inputChangePhoneHandler}
                onKeyPress={this.keyPressHandler}
            />
            <div className="modal-action-buttons-container">
                <input
                    className="add-button"
                    type="button"
                    value="Add"
                    onClick={this.addContactHandler}
                    disabled={this.validateSubmitButton()}
                />
                <input
                    className="close-button"
                    type="button"
                    value="Close"
                    onClick={this.closeContactHandler}
                />
            </div>
        </div>
    );
}

ModalAdd.propTypes = propTypes;

export default ModalAdd;
