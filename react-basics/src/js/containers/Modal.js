import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalAdd from '../components/ModalAdd';
import ModalEdit from '../components/ModalEdit';
import ModalDelete from '../components/ModalDelete';
import {MODAL_TYPE_ADD, MODAL_TYPE_EDIT} from '../constants/modalTypes';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addContact, deleteContact, saveContactChanges, toggleModal} from '../store/actionCreators'

const propTypes = {
    modalWindowOpened: PropTypes.bool.isRequired,
    modalType: PropTypes.string.isRequired,
    selectedContact: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired
    }),
    addContact: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    deleteContact: PropTypes.func.isRequired,
    saveContactChanges: PropTypes.func.isRequired
};

const defaultProps = {
    selectedContact: {
        id: null
    }
};

const mapStateToProps = (state) => ({
    modalWindowOpened: state.modalWindowOpened,
    modalType: state.modalType,
    selectedContact: state.selectedContact
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({addContact, deleteContact, saveContactChanges, toggleModal}, dispatch)
);

const Modal = ({modalWindowOpened, modalType, ...props}) => {
    let modalWindowWrapperClassName = modalWindowOpened ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';
    let modal = modalType === MODAL_TYPE_ADD ? (<ModalAdd {...props}/>) :
        modalType === MODAL_TYPE_EDIT ? (<ModalEdit {...props}/>) : (<ModalDelete {...props}/>);

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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);