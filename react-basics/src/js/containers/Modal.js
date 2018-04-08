import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import ModalAdd from '../components/ModalAdd';
import ModalEdit from '../components/ModalEdit';
import ModalDelete from '../components/ModalDelete';
import {MODAL_TYPE_ADD, MODAL_TYPE_EDIT, MODAL_TYPE_DELETE} from '../constants/modalTypes';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    addContact,
    deleteContact,
    saveContactChanges,
    toggleModal,
    saveSelectedContactChanges
} from '../store/actionCreators'

const propTypes = {
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
    selectedContact: state.selectedContact
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        addContact,
        deleteContact,
        saveContactChanges,
        saveSelectedContactChanges,
        toggleModal,
    }, dispatch)
);

class Modal extends Component {

    render() {

        const {props} = this;
        let modalType = props.match.params.modalType;

        let modalWindowOpened;
        if (modalType === MODAL_TYPE_ADD) {
            modalWindowOpened = true;
        }
        else {
            modalWindowOpened = modalType && props.selectedContact.id ? true : false;
        }

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
    }
}


Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
