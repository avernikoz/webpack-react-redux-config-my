// Нужно ли использовать key в propTypes?
// Можно ли прописывать propTypes внутри функций?
// Где лучше прописывать propTypes — для statless компонентов родительских, или для дочерних /// по-моему, это круто
// Должен ли быть isRequired там, где нет isRequaired?
// https://www.npmjs.com/package/airbnb-prop-types

import React, {Component} from 'react';
import ReactDOM from 'react-dom';


import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import ContactsList from './components/ContactsList';
import SearchFilter from './components/SearchFilter';
import Modal from './components/Modal';
import Button from './components/Button';
import defaultContacts from './defaultContacts';


//App


const mapStateToProps = (state) => ({
    modalWindowOpened: state.modalWindowOpened
});

class App extends Component {
    // state = {
    //     contacts: defaultContacts,
    //     selectedContact: {
    //         id: null,
    //         name: '',
    //         phoneNumber: '',
    //     },
    //     visibilityFilter: '',
    //     modalWindowOpened: false,
    //     modalType: ''
    // };

    // handleUpdateVisibilitityFilter = (visibilityFilter) => {
    //     this.setState({
    //         visibilityFilter,
    //     })
    // };

    // toggleModal = () => {
    //     this.setState({
    //         modalWindowOpened: !this.state.modalWindowOpened,
    //     })
    // };
    //
    // handleSetModalType = (modalType) => {
    //     this.setState({
    //         modalType,
    //     }, this.toggleModal())
    // };
    //
    // handleSelectCurrentContact = (currentContact) => {
    //     this.setState({
    //         selectedContact: currentContact.id === this.state.selectedContact.id ? {
    //             ...this.state.selectedContact,
    //             id: null
    //         } : {...currentContact}
    //     })
    // };

    //add new contact
    // arrayOfContacts = (newContact) => {
    //     this.setState(oldState => ({contacts: [newContact, ...oldState.contacts]}));
    // };
    // //add delete contact
    // deleteContact = (idContactToDelete) => {
    //     this.setState(oldState => ({contacts: [...oldState.contacts.filter((elem) => elem.id !== idContactToDelete)]}));
    // };
    // saveContactChanges = (changedContact) => {
    //     this.setState(oldState => ({contacts: [...oldState.contacts.map((elem) => elem.id === changedContact.id ? {...elem, ...changedContact} : elem)]}))
    // };

    render() {
        let mainContentWrapperClassName = this.props.modalWindowOpened ? 'main-content-wrapper blurred' : 'app-main-content-wrapper';

        return (
            <div className="app-container">
                <div className={mainContentWrapperClassName}>
                    <ContactsList />
                    <Button handleSetModalType={this.handleSetModalType} store={this.props.store}>Add contact</Button>
                </div>
                <Modal/>
            </div>
        )
    }
}




export default connect(mapStateToProps)(App);

// {/*<SearchFilter handleUpdateVisibilitityFilter={this.handleUpdateVisibilitityFilter}/>*/}


//
// <ContactsList
//     contactsList={this.state.contacts}
//     visibilityFilter={this.state.visibilityFilter}
//     handleSetModalType={this.handleSetModalType}
//     selectedContact={this.state.selectedContact}
//     handleSelectCurrentContact={this.handleSelectCurrentContact}
// />

// {/*<Modal*/}
//     {/*modalWindowOpened={this.state.modalWindowOpened}*/}
//     {/*currentModalType={this.state.modalType}*/}
//     {/*toggleModal={this.toggleModal}*/}
//     {/*arrayOfContacts={this.arrayOfContacts}*/}
//     {/*deleteContact={this.deleteContact}*/}
//     {/*saveContactChanges={this.saveContactChanges}*/}
//     {/*selectedContact={this.state.selectedContact}*/}
// {/*/>*/}