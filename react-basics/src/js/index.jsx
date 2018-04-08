import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import { devToolsEnhancer } from 'redux-devtools-extension';

import { rootReducer, initialState } from './store/reducers';
import App from './App';


// const store = createStore(rootReducer, initialState, devToolsEnhancer());
const store = createStore(rootReducer, initialState);


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
