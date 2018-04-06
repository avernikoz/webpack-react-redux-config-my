// Нужно ли использовать key в propTypes?
// Можно ли прописывать propTypes внутри функций?
// Где лучше прописывать propTypes — для statless компонентов родительских, или для дочерних /// по-моему, это круто
// Должен ли быть isRequired там, где нет isRequaired?
// https://www.npmjs.com/package/airbnb-prop-types

import React from 'react';

import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import ContactsList from './containers/ContactsList';
import SearchFilter from './containers/SearchFilter';
import Modal from './containers/Modal';
import AddContactButton from './containers/AddContactButton';


const mapStateToProps = (state) => ({
    modalWindowOpened: state.modalWindowOpened
});

const App = ({modalWindowOpened}) => {
    let mainContentWrapperClassName = modalWindowOpened ? 'main-content-wrapper blurred' : 'app-main-content-wrapper';

    return (
        <div className="app-container">
            <div className={mainContentWrapperClassName}>
                <SearchFilter/>
                <ContactsList/>
                <AddContactButton/>
            </div>
            <Modal/>
        </div>
    )
};

export default connect(mapStateToProps)(App);

