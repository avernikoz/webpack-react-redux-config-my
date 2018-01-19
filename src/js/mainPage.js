// Литература (видео, уроки, ресурсы)
// Вы пишите так let RandomMessage = React.createClass или extends.React ???
// Какой скелет для реакта юзаете?
// state атоматом передаётся в пропсы дочерних элементов, или нет?

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

React.createClass = createReactClass;

// ReactDOM.render(
//     <div>
//         <h1>Hello World!</h1>
//         <h1><div>loka <div>hola <div>srsk</div> </div> sup</div>Hello World 200123!</h1>
//         <h1>Opa-pa</h1>
//         {/*<h1>Hello World 3!</h1>*/}
//
//     </div>,
//     document.getElementById('root')
// );


//
// let Greeting = React.createClass({
//     render: function() {
//         return ([
//                 <h1>{this.props.message}</h1>,
//                 <p> {this.props.data}</p>
//             ]
//     )
//     }
// });

let Greeting = React.createClass({
    render: function() {
        return ( <div>
                    <h1>{this.props.message}</h1>
                    <p> {this.props.data}</p>
                </div>
        )
    }
});

// setInterval(() => {
//
//     let messages = ['Hello, Friend', 'Hello, Universe', 'Hello, Brother'];
//     let randomMessage = messages[Math.floor(Math.random() * 3)];
//
//
//     ReactDOM.render(
//         <Greeting message = {randomMessage} data={new Date(Date.now()).getSeconds()} />,
//         document.getElementById('root')
//     );
//
//
// },1000);


let RandomMessage = React.createClass({
    getInitialState: () => ( {message : 'Hello, Initial Message!!!!'} ),

    onClick: function() {
        let messages = ['Hello, Friend', 'Hello, Universe', 'Hello, Brother'];
        let randomMessage = messages[Math.floor((Math.random() * 3))];

        this.setState({message: randomMessage});
    },

    render: function() {
        return (
            <div>
                <MessageView message={this.state.message}/>
                <p>
                    <input type="button" onClick={this.onClick} value="Change Message"/>
                </p>
            </div>
        )
    }
});


let MessageView = React.createClass({
    render: function () {
        return (
            <p>{this.props.message}</p>
        )
    }

});

ReactDOM.render(
    <RandomMessage/>,
    document.getElementById('root')
);
