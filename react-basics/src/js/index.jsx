import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import { devToolsEnhancer } from 'redux-devtools-extension';

// import { rootReducer, initialState } from './reducers/reducers';
import App from './App';


// const reducers = createStore(rootReducer, initialState, devToolsEnhancer());
// const store = createStore(rootReducer, initialState);


ReactDOM.render(
        <App />,
    document.getElementById('root')
);


// ReactDOM.render(
//     <Provider store={store}>
//             <App />
//     </Provider>,
//     document.getElementById('root')
// );
