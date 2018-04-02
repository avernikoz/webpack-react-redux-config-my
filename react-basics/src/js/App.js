import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

React.createClass = createReactClass;

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
    constructor(props) {
        super(props);
        this.state = {
            contacts: defaultContacts,
            selectedContact: null,
            visibilityFilter: '',
            modalWindowOpened: false,
            modalType: ''
        };
    }

    handleUpdateVisibilitityFilter = (visibilityFilter) => {
        this.setState({
            visibilityFilter,
        })
    };

    handleShowHideModal = (modalType) => {
        this.setState({
            modalWindowOpened: !this.state.modalWindowOpened,
            modalType,
        })
    };
    handleSelectCurrentContact = (id) => {
        this.setState({
            selectedContact: id === this.state.selectedContact ? null : id
        })
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
                        handleShowHideModal={this.handleShowHideModal}
                        selectedContact={this.state.selectedContact}
                        handleSelectCurrentContact={this.handleSelectCurrentContact}
                    />
                    <Button handleShowHideModal={this.handleShowHideModal} value={'add'}>Add contact</Button>
                </div>
                <Modal
                    modalWindowOpened={this.state.modalWindowOpened}
                    modalType={this.state.modalType}
                />
            </div>
        )
    }
}

// const App = () => (
//     <div>
//         <SearchFilter></SearchFilter>
//         <ContactList contactList={defaultContacts}/>
//     </div>
// );


export default App;


