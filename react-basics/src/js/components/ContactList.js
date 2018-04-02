import React from 'react';
import PropTypes from 'prop-types';

import Contact from './Contact';

const propTypes = {
    contactList: PropTypes.array.isRequired,
    visibilityFilter: PropTypes.string,
    handleShowHideModal: PropTypes.func
};

const visibilityFilter = {
    visibilityFilter: '',
};


const ContactList = ({contactList, visibilityFilter, ...rest}) => (
    <div className="contact-list">
        {
            contactList.filter(item => (item.name.indexOf(visibilityFilter) !== -1))
                .map(item => (
                <Contact key={item.id}
                         id={item.id}
                         name={item.name}
                         phoneNumber={item.number}
                         imgUrl={item.img}
                         {...rest}
                />
            ))
        }
    </div>
);

ContactList.propTypes = propTypes;
// ContactList.defaultProps = defaultProps;

export default ContactList;


// handleShowHideModal={handleShowHideModal}
// selectedContact={selectedContact}
// handleSelectCurrentContact={handleSelectCurrentContact}