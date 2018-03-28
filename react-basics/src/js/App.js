import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
React.createClass = createReactClass;

import {Route, Switch} from 'react-router-dom';

// import AnyComponent from './components/AnyComponent';

//App
const App = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        return (
            <div>Hello world!</div>);
    }
})
export default App;


