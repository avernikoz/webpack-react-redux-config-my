// Нужно ли использовать key в propTypes?
// Можно ли прописывать propTypes внутри функций?
// Где лучше прописывать propTypes — для statless компонентов родительских, или для дочерних /// по-моему, это круто
// Должен ли быть isRequired там, где нет isRequaired?
// https://www.npmjs.com/package/airbnb-prop-types

import React from 'react';

import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Footer from './components/Footer';
import Header from './components/Header';
import ContactsList from './containers/ContactsList';
import SearchFilter from './containers/SearchFilter';
import Modal from './containers/Modal';
import AddContactButton from './containers/AddContactButton';
import {withRouter} from 'react-router-dom'


const mapStateToProps = (state) => ({
    modalWindowOpened: state.modalWindowOpened
});

const App = ({modalWindowOpened}) => {
    let mainContentWrapperClassName = modalWindowOpened ? 'main-content-wrapper blurred' : 'app-main-content-wrapper';

    return (
        <div className="app-container">
            <Route path='/contact/:contactId' component={props =>
                <div className={mainContentWrapperClassName}>
                    <Header/>
                    <SearchFilter/>
                    <ContactsList/>
                    <AddContactButton/>
                    <Footer/>
                </div>
            } />
            {/*</Route>*/}


            <Route path='/contact/:contactId/:modalType(edit|add|delete)'>
                <Modal/>
            </Route>
        </div>

    )
};

export default withRouter(connect(mapStateToProps)(App));

