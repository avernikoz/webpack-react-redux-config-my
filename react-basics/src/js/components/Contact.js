import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {EDIT_BUTTON_TAG_TYPE, DELETE_BUTTON_TAG_TYPE} from '../constants/controlButtonsTagTypes'
import {MODAL_TYPE_EDIT, MODAL_TYPE_DELETE} from '../constants/modalTypes';
import {setModalType, setSelectedContact, toggleModal} from '../store/actionCreators';

//TODO: REWRITE stop.Propagation to something else

const propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    selectedContact: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired
    }),
    setModalType: PropTypes.func.isRequired,
    setSelectedContact: PropTypes.func.isRequired
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
    bindActionCreators({setModalType, setSelectedContact, toggleModal}, dispatch)
);


class Contact extends Component {
    expandContact = () => {
        const {id, name, phoneNumber} = this.props;
        this.props.setSelectedContact({id, name, phoneNumber });
    };

    handleClickEdit = (event) => {
        if (event.target.tagName.toUpperCase() === EDIT_BUTTON_TAG_TYPE) {
            this.props.setModalType(MODAL_TYPE_EDIT);
            this.props.toggleModal();
        }
    };
    handleClickDelete = (event) => {
        if (event.target.tagName.toUpperCase() === DELETE_BUTTON_TAG_TYPE) {
            this.props.setModalType(MODAL_TYPE_DELETE);
            this.props.toggleModal();
        }
    };

    render() {
        return (
        <div className={this.props.id === this.props.selectedContact.id ? 'contact expanded' : 'contact'} onClick={this.expandContact}>
            <img className="contact-image" src={this.props.img} alt="image"/>
            <div className="contact-name"> {this.props.name}</div>
            <div className="contact-number"> {this.props.phoneNumber}</div>
            <div className="contact-buttons-container">
                <button className="contact-edit-button" onClick={this.handleClickEdit}>edit</button>
                <button className="contact-delete-button" onClick={this.handleClickDelete}>delete</button>
            </div>
        </div>
    )
    }

}

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;


export default connect(mapStateToProps,mapDispatchToProps)(Contact);