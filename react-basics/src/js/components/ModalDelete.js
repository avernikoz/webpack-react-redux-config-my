import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ModalDelete extends Component {
    deleteCategoryHandler = (event) => {
        this.props.handleDeleteContact(this.props.selectedContact.id);
        this.props.handleShowHideModal();
    };

    render = () => (
        <div className="modal-buttons-container">
            <div className="category-delete-text-container">
                Delete <b>{this.props.selectedContact.name}</b> contact?
            </div>
            <div className="modal-action-buttons-container">
                <input className="add-button" type="button" value="Delete"
                       onClick={this.deleteCategoryHandler}/>
                <input className="close-button" type="button" value="Close"
                       onClick={this.props.handleShowHideModal}/>
            </div>
        </div>
    )
}

export default ModalDelete;