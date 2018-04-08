// 1. Один из вопросов — всё-таки, как лучше заюзать коннект — использовать его во всех компонентах,
// или же иногда спускать пропсы сверху?
// https://github.com/reactjs/redux/issues/419
// 2. Где лучше прописывать propTypes — для statless компонентов родительских, или для дочерних ///
// 3. Как избежать ререндера родительского компонента при измененни пропсов, которые он использует?

import React from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';

import NoMatch from './components/NoMatch';
import Footer from './components/Footer';
import Header from './components/Header';
import ContactsList from './containers/ContactsList';
import SearchFilter from './containers/SearchFilter';
import Modal from './containers/Modal';
import AddContactButton from './containers/AddContactButton';

// import '../scss/style.scss';

const App = () => (
    <div className="app-container">
        <Switch>
            <Route
                exact
                path="/"
                render={() => (
                    <div className="app-main-content-wrapper">
                        <Header />
                        <SearchFilter />
                        <ContactsList />
                        <AddContactButton />
                        <Footer />
                    </div>
                )}
            />
            <Route
                path="/contact/:contactId"
                render={() => (
                    <div className="app-main-content-wrapper">
                        <Header />
                        <SearchFilter />
                        <ContactsList />
                        <AddContactButton />
                        <Footer />
                    </div>
                )}
            />
            <Route render={() => (
                <div>
                    <Header />
                    <NoMatch />
                    <Footer />
                </div>
            )}
            />
        </Switch>
        <Route path="/contact/:contactId/:modalType(edit|delete)">
            <Modal />
        </Route>
        <Route path="/:modalType(add)">
            <Modal />
        </Route>
    </div>

);


export default withRouter(App);
