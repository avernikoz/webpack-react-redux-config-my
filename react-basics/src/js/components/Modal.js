import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: ''
        }
    }

    // componentDidUpdate() {
    //     this.nameInput.focus();
    // }

    inputChangeHandler = (event) => {

    };

    _handleKeyPress = (event) => {

    };

    addCategoryHandler = (event) => {

    };

    closeCurrentModal = (event) => {

    };

    render () {
        let modalWindowWrapperClassName = (this.props.modalWindowOpened && this.props.modalWindowAddOpened) ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';
        let addButtonCondition = this.state.inputText === '';

        return (
            <div className={modalWindowWrapperClassName}>
                <div className="modal-window">
                    <div className="modal-buttons-container">
                        <input className="category-add-input"
                               type="text" placeholder="Enter new subcategory title..."
                               value={this.state.inputText}
                               onChange={this.inputChangeHandler} onKeyPress={this._handleKeyPress}
                               ref={(input) => {
                                   this.nameInput = input;
                               }}
                        />
                        <div className="modal-action-buttons-container">
                            <input className="add-button" type="button" value="Add" onClick={this.addCategoryHandler}
                                   disabled={addButtonCondition}/>
                            <input className="close-button" type="button" value="Close"
                                   onClick={this.closeCurrentModal}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}