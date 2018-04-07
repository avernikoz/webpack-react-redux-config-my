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


const mapStateToProps = (state) => ({
    // modalWindowOpened: state.modalWindowOpened
});

class App extends Component {


    render() {
        let mainContentWrapperClassName = false ? 'main-content-wrapper blurred' : 'app-main-content-wrapper';
        // console.log(props);


        return (
            <div className="app-container">
                <Switch>
                    <Route exact path='/' component={props =>
                        <div className={mainContentWrapperClassName}>
                            <Header/>
                            <SearchFilter/>
                            <ContactsList/>
                            <AddContactButton/>
                            <Footer/>
                        </div>
                    }/>
                    <Route path='/contact/:contactId' component={props =>
                        <div className={mainContentWrapperClassName}>
                            <Header/>
                            <SearchFilter/>
                            <ContactsList/>
                            <AddContactButton/>
                            <Footer/>
                        </div>
                    }/>
                    <Route component={() =>
                        <div>
                            <Header/>
                            <NoMatch/>
                            <Footer/>
                        </div>
                    }/>

                </Switch>

                <Route path='/contact/:contactId/:modalType(edit|add|delete)'>
                    <Modal/>
                </Route>
            </div>

        )
    }
}

export default withRouter(connect(mapStateToProps)(App));


// const App = ({modalWindowOpened = true, ...props}) => {
//     let mainContentWrapperClassName = modalWindowOpened ? 'main-content-wrapper blurred' : 'app-main-content-wrapper';
//     console.log(props);
//
//
//     return (
//         <div className="app-container">
//             <Switch>
//                 <Route path='/:contact?/:contactId?/:option?' component={props =>
//                     <div className={mainContentWrapperClassName}>
//                         <Header/>
//                         <SearchFilter/>
//                         <ContactsList/>
//                         <AddContactButton/>
//                         <Footer/>
//                     </div>
//                 }/>
//                 <Route path='/contact/:contactId' component={props =>
//                     <div className={mainContentWrapperClassName}>
//                         <Header/>
//                         <SearchFilter/>
//                         <ContactsList/>
//                         <AddContactButton/>
//                         <Footer/>
//                     </div>
//                 }/>
//                 <Route component={() =>
//                     <div>
//                         <Header/>
//                         <NoMatch/>
//                         <Footer/>
//                     </div>
//                 }/>
//
//             </Switch>
//
//             <Route path='/contact/:contactId/:modalType(edit|add|delete)'>
//                 <Modal/>
//             </Route>
//         </div>
//
//     )
// };