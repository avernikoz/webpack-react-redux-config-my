import React from 'react';
import ReactDOM from 'react-dom';

import {ToDoListApp} from './ToDoListApp';


ReactDOM.render(
    <ToDoListApp/>,
    document.getElementById('root')
);






// const newComp = ({ match }) => {
//     return <h1>Hello {match.params.loka}!</h1>
// };


// ReactDOM.render(
//     <Router>
//         <Switch>
//             <Route exact path='/' component={ToDoListApp}/>
//             <Route path='/:loca/:koka' component={OtherComp}/>
//             <Route path={'/cat/:roca'} component={}/>
//         </Switch>
//     </Router>,
//     document.getElementById('root')
// );