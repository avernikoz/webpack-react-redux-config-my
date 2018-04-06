import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


import {EDIT_BUTTON_TAG_TYPE, DELETE_BUTTON_TAG_TYPE} from '../constants/controlButtonsTagTypes'
import {MODAL_TYPE_EDIT, MODAL_TYPE_DELETE} from '../constants/modalTypes';

//TODO: REWRITE stop.Propagation to something else ++++

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
        // console.log(this.props.match.params.contactId);

        if (+this.props.match.params.contactId === this.props.id) {
            const {id, name, phoneNumber} = this.props;
            this.props.setSelectedContact({id, name, phoneNumber});
        }
    };

    componentWillReceiveProps = (nextProps) => {

        // const contactIdFromUrl = +nextProps.history.location.pathname.match(/(?<=contact\/)\d*$/g)[0];
        // console.log(contactIdFromUrl);


        // if (contactIdFromUrl === this.props.id) {
        //     console.log('true');
        console.log('nextprop:  '+nextProps.match.params.contactId);
        console.log('from parent:  '+nextProps.contactIdInUrl);
        //

        // if (+nextProps.contactIdInUrl  === this.props.id) {
        //
        //     const {id, name, phoneNumber} = this.props;
        //     this.props.setSelectedContact({id, name, phoneNumber});
        // }
    };

    expandContact = (event) => {
        if (event.target === event.currentTarget) {
            const {id, name, phoneNumber} = this.props;
            this.props.setSelectedContact({id, name, phoneNumber});
            this.props.history.push(`/contact/${id}`);
        }
    };

    handleClickEdit = (event) => {
        this.props.setModalType(MODAL_TYPE_EDIT);
        // this.props.toggleModal();
    };
    handleClickDelete = (event) => {
        this.props.setModalType(MODAL_TYPE_DELETE);
        // this.props.toggleModal();
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