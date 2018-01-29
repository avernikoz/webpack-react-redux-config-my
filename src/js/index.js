import React from 'react';
import ReactDOM from 'react-dom';

import ToDoListApp from './ToDoListApp';
import {BrowserRouter as Router} from 'react-router-dom';


ReactDOM.render(
    <Router>
        <ToDoListApp/>
    </Router>,
    document.getElementById('root')
);
