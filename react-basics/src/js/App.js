import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


import {Route, Switch} from 'react-router-dom';

import defaultContacts from './defaultContacts';
import Contact from './components/Contact';
import ContactList from './components/ContactList';
import SearchFilter from './components/SearchFilter';
import Modal from './components/Modal';
import Button from './components/Button';


// import AnyComponent from './components/AnyComponent';

//App

class App extends Component {
    state = {
        contacts: defaultContacts,
        selectedContact: {
            id: null,
            name: '',
            phoneNumber: '',
        },
        visibilityFilter: '',
        modalWindowOpened: false,
        modalType: ''
    };

    handleUpdateVisibilitityFilter = (visibilityFilter) => {
        this.setState({
            visibilityFilter,
        })
    };

    handleShowHideModal = () => {
        this.setState({
            modalWindowOpened: !this.state.modalWindowOpened,
        })
    };

    handleSetModalType = (modalType) => {
        this.setState({
            modalType,
        }, this.handleShowHideModal())
    };

    handleSelectCurrentContact = (currentContact) => {
        this.setState({
            selectedContact: currentContact.id === this.state.selectedContact.id ? {
                ...this.state.selectedContact,
                id: null
            } : {...currentContact}
        })
    };

    //add new contact
    handleAddNewContact = (newContact) => {
        this.setState(oldState => ({contacts: [newContact, ...oldState.contacts]}));
    };
    //add delete contact
    handleDeleteContact = (idContactToDelete) => {
        this.setState(oldState => ({contacts: [...oldState.contacts.filter((elem) => elem.id !== idContactToDelete)]}));
    };
    handleSaveContactChanges = (changedContact) => {
        this.setState(oldState => ({contacts: [...oldState.contacts.map((elem) => elem.id === changedContact.id ? {...elem, ...changedContact} : elem)]}))
    };


    render() {
        let mainContentWrapperClassName = this.state.modalWindowOpened ? 'main-content-wrapper blurred' : 'app-main-content-wrapper';

        return (
            <div className="app-container">
                <div className={mainContentWrapperClassName}>
                    <SearchFilter handleUpdateVisibilitityFilter={this.handleUpdateVisibilitityFilter}/>
                    <ContactList
                        contactList={this.state.contacts}
                        visibilityFilter={this.state.visibilityFilter}
                        handleSetModalType={this.handleSetModalType}
                        selectedContact={this.state.selectedContact}
                        handleSelectCurrentContact={this.handleSelectCurrentContact}
                    />
                    <Button handleSetModalType={this.handleSetModalType} value={'add'}>Add contact</Button>
                </div>
                <Modal
                    modalWindowOpened={this.state.modalWindowOpened}
                    modalType={this.state.modalType}
                    handleShowHideModal={this.handleShowHideModal}
                    handleAddNewContact={this.handleAddNewContact}
                    handleDeleteContact={this.handleDeleteContact}
                    handleSaveContactChanges={this.handleSaveContactChanges}
                    selectedContact={this.state.selectedContact}
                />
            </div>
        )
    }
}



export default App;


