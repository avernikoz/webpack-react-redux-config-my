import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import {rootReducer, initialState} from './store/reducers';

const store = createStore(rootReducer, initialState, devToolsEnhancer());


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
