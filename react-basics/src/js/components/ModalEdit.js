import React, {Component, ReactPropTypes} from 'react';
import PropTypes from 'prop-types';


class ModalEdit extends Component {
    state = {
        inputName: this.props.selectedContact.name,
        inputPhoneNumber: this.props.selectedContact.phoneNumber
    };

    componentWillReceiveProps = (nextProps) => {
        const {name: inputName, phoneNumber: inputPhoneNumber} = nextProps.selectedContact;
        this.setState({inputName, inputPhoneNumber});
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps !== this.props) {
            this.nameInput.focus();
        }
    };

    inputChangeNameHandler = (event) => {
        this.setState({
            inputName: event.target.value
        })
    };

    inputChangePhoneHandler = (event) => {
        this.setState({
            inputPhoneNumber: (event.target.value.match(/^[0-9+()-]*$/) ? event.target.value : this.state.inputPhoneNumber)
        })
    };

    validateSubmitButton = () => (!this.state.inputName || !this.state.inputPhoneNumber);

    keyPressHandler = (event) => {
        if (event.which === 13 && this.validateSubmitButton()) {
            this.saveContactChangesHandler();
        }
    };

    saveContactChangesHandler = () => {
        this.props.handleSaveContactChanges({
            id: this.props.selectedContact.id,
            name: this.state.inputName,
            phoneNumber: this.state.inputPhoneNumber
        });
        this.props.handleShowHideModal();
    };


    render = () => (
        <div className="modal-buttons-container">
            <input autoFocus className="category-add-input" type="text" placeholder="Contact name"
                   value={this.state.inputName}
                   onChange={this.inputChangeNameHandler} onKeyPress={this.keyPressHandler}
                   ref={(input) => {
                       this.nameInput = input;
                   }}
            />
            <input className="category-add-input"
                   type="text" placeholder="Phone number"
                   value={this.state.inputPhoneNumber}
                   onChange={this.inputChangePhoneHandler} onKeyPress={this.keyPressHandler}
            />
            <div className="modal-action-buttons-container">
                <input className="add-button" type="button" value="Save"
                       onClick={this.saveContactChangesHandler}
                       disabled={this.validateSubmitButton()}/>
                <input className="close-button" type="button" value="Close"
                       onClick={this.props.handleShowHideModal}/>
            </div>

        </div>
    )
}

export default ModalEdit;