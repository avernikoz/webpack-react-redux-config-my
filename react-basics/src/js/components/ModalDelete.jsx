import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    selectedContact: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        name: PropTypes.string.isRequired
    }),
    deleteContact: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const defaultProps = {
    selectedContact: {
        id: null
    }
};

class ModalDelete extends Component {
    deleteContactHandler = () => {
        this.props.deleteContact(this.props.selectedContact.id);
        this.props.toggleModal();
        this.props.history.replace(`/contact/${this.props.selectedContact.id}`);
    };
    closeContactHandler = () => {
        this.props.toggleModal();
        this.props.history.replace(`/contact/${this.props.selectedContact.id}`);
    };

    render = () => (
        <div className="modal-buttons-container">
            <div className="category-delete-text-container">
                Delete <b>{this.props.selectedContact.name}</b> contact?
            </div>
            <div className="modal-action-buttons-container">
                <input className="add-button" type="button" value="Delete" onClick={this.deleteContactHandler} />
                <input className="close-button" type="button" value="Close" onClick={this.closeContactHandler} />
            </div>
        </div>
    );
}

ModalDelete.propTypes = propTypes;
ModalDelete.defaultProps = defaultProps;
export default ModalDelete;
