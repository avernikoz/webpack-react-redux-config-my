import React from 'react';
import PropTypes from 'prop-types';

import Contact from './contact';

const propTypes = {
    contactList: PropTypes.array.isRequired,
    visibilityFilter: PropTypes.string
};

const visibilityFilter = {
    visibilityFilter: '',
};


const ContactList = ({contactList, visibilityFilter}) => (
    <div className="listWrapper">
        {
            contactList.filter(item => (item.name.indexOf(visibilityFilter) !== -1))
                .map(item => (
                <Contact key={item.id}
                         name={item.name}
                         phoneNumber={item.number}
                         imgUrl={item.img}/>
            ))
        }
    </div>
);

ContactList.propTypes = propTypes;
// ContactList.defaultProps = defaultProps;

export default ContactList;