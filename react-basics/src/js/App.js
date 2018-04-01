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


// import AnyComponent from './components/AnyComponent';

//App

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibilityFilter: '',
        };
        this.handleUpdateVisibilitityFulter = this.handleUpdateVisibilitityFulter.bind(this);
    }

    handleUpdateVisibilitityFulter(visibilityFilter) {
        this.setState({
            visibilityFilter,
        })
    }

    render() {
        return (
            <div className="app-container">
                <SearchFilter handleUpdateVisibilitityFulter={this.handleUpdateVisibilitityFulter}/>
                <ContactList
                contactList={defaultContacts}
                visibilityFilter={this.state.visibilityFilter}
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


