import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';

const propTypes = {
    modalWindowOpened: PropTypes.bool.isRequired,
    modalType: PropTypes.string.isRequired,
    selectedContact: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired
    }),
    handleShowHideModal: PropTypes.func.isRequired,
    handleAddNewContact: PropTypes.func.isRequired,
    handleDeleteContact: PropTypes.func.isRequired,
    handleSaveContactChanges: PropTypes.func.isRequired
};

const defaultProps = {
    selectedContact: {
        id: null
    }
};

const Modal = ({modalWindowOpened, modalType, ...props}) => {
    let modalWindowWrapperClassName = modalWindowOpened ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';
    let modal = modalType === 'add' ? (<ModalAdd {...props}/>) :
        modalType === 'edit' ? (<ModalEdit {...props}/>) : (<ModalDelete {...props}/>);

    return (
        <div className={modalWindowWrapperClassName}>
            <div className="modal-window">
                {modal}
            </div>
        </div>
    )
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
