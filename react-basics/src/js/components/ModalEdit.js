import React, {Component} from 'react';
import PropTypes from 'prop-types';


class ModalEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputName: '',
            inputPhoneNumber: ''
        }
    }
    componentDidUpdate = () => {
        this.nameInput.focus();
    };

    inputChangeHandler = (event) => {

    };

    keyPressHandler = (event) => {

    };

    saveCategoryChangesHandler = (event) => {

    };


    render = () => (
        <div className="modal-buttons-container">
            <input className="category-add-input" type="text"
                   value={this.props.selected}
                   onChange={this.onChangeCategoryEditedText} onKeyPress={this.keyPressHandler}
                   ref={(input) => {
                       this.nameInput = input;
                   }}

            />
            <div className="modal-action-buttons-container">
                <input className="add-button" type="button" value="Save"
                       onClick={this.saveCategoryChangesHandler} disabled="disabled"/>
                <input className="close-button" type="button" value="Close"
                       onClick={this.props.handleShowHideModal}/>
            </div>

        </div>
    )
}

export default ModalEdit;