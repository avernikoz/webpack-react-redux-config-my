import React, {Component} from 'react';
import PropTypes from 'prop-types';


class ModalEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: ''
        }
    }
    componentDidUpdate = () => {
        this.nameInput.focus();
    };

    inputChangeHandler = (event) => {

    };

    keyPressHandler = (event) => {

    };

    addCategoryHandler = (event) => {

    };


    render = () => (
        <div className="modal-buttons-container">
            <input className="category-add-input" type="text" placeholder={this.props.selectedCategoryText}
                   value={this.state.categoryEditedText}
                   onChange={this.onChangeCategoryEditedText} onKeyPress={this.keyPressHandler}
                   ref={(input) => {
                       this.nameInput = input;
                   }}

            />
            <div className="modal-action-buttons-container">
                <input className="add-button" type="button" value="Save"
                       onClick={this.saveCategoryChangesHandler} disabled={saveButtonCondition}/>
                <input className="close-button" type="button" value="Close"
                       onClick={this.props.handleShowHideModal}/>
            </div>

        </div>
    )
}

export default ModalEdit;