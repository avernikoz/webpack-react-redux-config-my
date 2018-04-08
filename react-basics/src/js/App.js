// Один из вопросов — всё-таки, как лучше заюзать коннект — использовать его во всех компонентах, или же иногда спускать пропсы сверху?
// https://github.com/reactjs/redux/issues/419
// Где лучше прописывать propTypes — для statless компонентов родительских, или для дочерних /// по-моему, это круто
// Должен ли быть isRequired там, где нет isRequired?

import React, {Component} from 'react';

import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import NoMatch from './components/NoMatch';
import Footer from './components/Footer';
import Header from './components/Header';
import ContactsList from './containers/ContactsList';
import SearchFilter from './containers/SearchFilter';
import Modal from './containers/Modal';
import AddContactButton from './containers/AddContactButton';
import {withRouter} from 'react-router-dom'


// const mapStateToProps = (state) => ({
//     modalWindowOpened: state.modalWindowOpened
// });

class App extends Component {

    render() {

        // console.log('rerender');
        // const mainContentWrapperClassName = this.props.modalWindowOpened ? 'main-content-wrapper blurred' : 'app-main-content-wrapper';

        return (
            <div className="app-container">
                <Switch>
                    <Route exact path='/' render={props =>
                        <div className={'app-main-content-wrapper'}>
                            <Header/>
                            <SearchFilter/>
                            <ContactsList/>
                            <AddContactButton/>
                            <Footer/>
                        </div>
                    }/>
                    <Route path='/contact/:contactId' render={props =>
                        <div className={'app-main-content-wrapper'}>
                            <Header/>
                            <SearchFilter/>
                            <ContactsList/>
                            <AddContactButton/>
                            <Footer/>
                        </div>
                    }/>
                    <Route render={() =>
                        <div>
                            <Header/>
                            <NoMatch/>
                            <Footer/>
                        </div>
                    }/>
                </Switch>
                    <Route path='/contact/:contactId/:modalType(edit|delete)'>
                        <Modal/>
                    </Route>
                    <Route path='/:modalType(add)'>
                        <Modal/>
                    </Route>
            </div>

        )
    }
}

export default withRouter(App);

