import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import {setModalType, setSelectedContact, toggleModal} from '../store/actionCreators';
import Contact from '../components/Contact';


const propTypes = {
    arrayOfContacts: PropTypes.array.isRequired,
    inputFilterText: PropTypes.string.isRequired,
    selectedContact: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]),
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired
    }),
    setModalType: PropTypes.func.isRequired,
    setSelectedContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    arrayOfContacts: state.contacts,
    inputFilterText: state.inputFilterText,
    selectedContact: state.selectedContact
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({setModalType, setSelectedContact, toggleModal}, dispatch)
);

const ContactsList = ({arrayOfContacts, inputFilterText, ...props}) => {
    // console.log(props);
return (
    <div className="contact-list">
        {
            // arrayOfContacts.filter(item => ([item.name.toLowerCase(),item.name].find(str => str.includes(visibilityFilter))))
            arrayOfContacts.filter(item => (item.name.toLowerCase().indexOf(inputFilterText) !== -1 || item.name.indexOf(inputFilterText) !== -1))
                .map(item => (
                <Contact key={item.id}
                         {...item}
                         {...props}
                        contactIdInUrl={+props.match.params.contactId}
                />
            ))
        }
    </div>
)};

ContactsList.propTypes = propTypes;

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ContactsList));
