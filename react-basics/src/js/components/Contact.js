import React, {Component} from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,

};

class Contact extends Component {
    constructor(props) {
        super(props);
    }
    expandContact = (event) => {
        this.props.handleSelectCurrentContact(this.props.id);
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
        <div className={this.props.id === this.props.selectedContact ? 'contact expanded' : 'contact'} onClick={this.expandContact}>
            <img className="contact-image" src={this.props.imgUrl} alt="image"/>
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


export default Contact;

// {/*<div className={this.state.expanded ? 'contact expanded' : 'contact'} onClick={this.expandContact}>*/};
