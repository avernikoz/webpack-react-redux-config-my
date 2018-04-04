import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
    handleSetModalType: PropTypes.func.isRequired,
    handleSelectCurrentContact: PropTypes.func.isRequired
};

const defaultProps = {
    selectedContact: {
        id: null
    }
};

class Contact extends Component {
    expandContact = (event) => {
        this.props.handleSelectCurrentContact({id: this.props.id, name: this.props.name, phoneNumber: this.props.phoneNumber});
    };

    handleClickEdit = (event) => {
        event.stopPropagation();
        this.props.handleSetModalType('edit');
    };
    handleClickDelete = (event) => {
        event.stopPropagation();
        this.props.handleSetModalType('delete');
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


export default Contact;