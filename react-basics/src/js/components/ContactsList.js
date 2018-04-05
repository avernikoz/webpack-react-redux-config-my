import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Contact from './Contact';


const propTypes = {
    arrayOfContacts: PropTypes.array.isRequired,
    inputFilterText: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    arrayOfContacts: state.contacts,
    inputFilterText: state.inputFilterText,
});

const ContactsList = ({arrayOfContacts, inputFilterText}) => (
    <div className="contact-list">
        {
            // arrayOfContacts.filter(item => ([item.name.toLowerCase(),item.name].find(str => str.includes(visibilityFilter))))
            arrayOfContacts.filter(item => (item.name.toLowerCase().indexOf(inputFilterText) !== -1 || item.name.indexOf(inputFilterText) !== -1))
                .map(item => (
                <Contact key={item.id}
                         {...item}
                />
            ))
        }
    </div>
);

ContactsList.propTypes = propTypes;

export default connect(mapStateToProps)(ContactsList);
