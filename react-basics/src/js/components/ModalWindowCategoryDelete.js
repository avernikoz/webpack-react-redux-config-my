import React from 'react';
import createReactClass from 'create-react-class';
import {Link} from 'react-router-dom';


let ModalWindowCategoryDelete = React.createClass({
    getInitialState: function () {
        return ({categoryName: ''});
    },
    deleteCategoryHandler: function () {
        this.props.deleteCategory(this.props.selectedCategoryId);

        this.closeCurrentModal();
    },
    closeCurrentModal: function () {
        this.props.closeModal('deleteCategory');
    },
    render: function () {
        let modalWindowWrapperClassName = (this.props.modalWindowOpened && this.props.modalWindowDeleteOpened) ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';

        return (
            <div className={modalWindowWrapperClassName}>
                <div className="modal-window">
                    <div className="modal-buttons-container">
                        <div className="category-delete-text-container">Delete
                            category {this.props.selectedCategoryText} and all nested?
                        </div>
                        <div className="modal-action-buttons-container">
                            <Link to={'/'}>
                            <input className="add-button" type="button" value="Delete"
                                   onClick={this.deleteCategoryHandler}/>
                            </Link>
                            <input className="close-button" type="button" value="Close"
                                   onClick={this.closeCurrentModal}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default ModalWindowCategoryDelete;