import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';


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

// Username.propTypes = {
//     username: React.PropTypes.string.isRequired,
// };
//
// Username.defaultProps = {
//     username: 'Jack',
// };


export default Modal;
