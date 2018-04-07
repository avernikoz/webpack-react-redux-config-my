import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {MODAL_TYPE_EDIT, MODAL_TYPE_DELETE} from '../constants/modalTypes';


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
    contactIdInUrl: PropTypes.number.isRequired,
    setModalType: PropTypes.func.isRequired,
    setSelectedContact: PropTypes.func.isRequired
};

const defaultProps = {
    selectedContact: {
        id: null
    }
};


class Contact extends Component {

    componentWillMount = () => {
        if (+this.props.match.params.contactId === this.props.id) {
            const {id, name, phoneNumber} = this.props;
            this.props.setSelectedContact({id, name, phoneNumber});
        }
    };
    expandContact = (event) => {
        if (event.target === event.currentTarget) {
            const {id, name, phoneNumber} = this.props;
            this.props.setSelectedContact({id, name, phoneNumber});
            this.props.history.push(`/contact/${id}`);
        }
    };

    handleClickEdit = () => {
        this.props.setModalType(MODAL_TYPE_EDIT);
    };
    handleClickDelete = () => {
        this.props.setModalType(MODAL_TYPE_DELETE);
    };

    render() {
        return (
            <div className={this.props.id === this.props.contactIdInUrl ? 'contact expanded' : 'contact'}
                 onClick={this.expandContact}>
                    <img className="contact-image" src={this.props.img} alt="image"/>
                    <div className="contact-name"> {this.props.name}</div>
                    <div className="contact-number"> {this.props.phoneNumber}</div>
                    <div className="contact-buttons-container">
                        <Link to={`/contact/${this.props.id}/edit`}>
                            <button className="contact-edit-button" onClick={this.handleClickEdit}>edit</button>
                        </Link>
                        <Link to={`/contact/${this.props.id}/delete`}>
                            <button className="contact-delete-button" onClick={this.handleClickDelete}>delete</button>
                        </Link>
                    </div>
            </div>
        )
    }

}

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;


export default Contact;