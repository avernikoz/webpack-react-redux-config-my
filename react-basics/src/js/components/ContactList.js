import React from 'react';
import PropTypes from 'prop-types';

import Contact from './Contact';

const propTypes = {
    contactList: PropTypes.array.isRequired,
    visibilityFilter: PropTypes.string,
    selectedContact: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired
    }),
    handleSetModalType: PropTypes.func.isRequired,
    handleSelectCurrentContact: PropTypes.func.isRequired
};

const defaultProps = {
    visibilityFilter: '',
    selectedContact: {
        id: null
    }
};


const ContactList = ({contactList, visibilityFilter, ...rest}) => (
    <div className="contact-list">
        {
            contactList.filter(item => (item.name.toLowerCase().indexOf(visibilityFilter) !== -1 || item.name.indexOf(visibilityFilter) !== -1))
            // contactList.filter(item => ([item.name.toLowerCase(),item.name].find(str => str.includes(visibilityFilter))))
                .map(item => (
                <Contact key={item.id}
                         id={item.id}
                         name={item.name}
                         phoneNumber={item.phoneNumber}
                         img={item.img}
                         {...rest}
                />
            ))
        }
    </div>
);

ContactList.propTypes = propTypes;
ContactList.defaultProps = defaultProps;

export default ContactList;
