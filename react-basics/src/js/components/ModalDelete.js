import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ModalDelete extends Component {
    constructor(props) {
        super(props);
    }

    deleteCategoryHandler = (event) => {

    };

    render = () => (
        <div className="modal-buttons-container">
            <div className="category-delete-text-container">Delete
                category {this.props.selectedCategoryText} and all nested?
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