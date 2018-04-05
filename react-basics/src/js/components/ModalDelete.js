import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {deleteContact} from "../store/actionCreators";

const propTypes = {
    selectedContact: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        name: PropTypes.string.isRequired,
    }),
    deleteContact: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired
};

const defaultProps = {
    selectedContact: {
        id: null
    }
};

class ModalDelete extends Component {
    deleteCategoryHandler = (event) => {
        this.props.deleteContact(this.props.selectedContact.id);
        this.props.toggleModal();
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
                       onClick={this.props.toggleModal}/>
            </div>
        </div>
    )
}

ModalDelete.propTypes = propTypes;
ModalDelete.defaultProps = defaultProps;
export default ModalDelete;