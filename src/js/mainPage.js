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
    render: function () {
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


// let RandomMessage = React.createClass({
//     getInitialState: () => ( {message : 'Hello, Initial Message!!!!'} ),
//
//     onClick: function() {
//         let messages = ['Hello, Friend', 'Hello, Universe', 'Hello, Brother'];
//         let randomMessage = messages[Math.floor((Math.random() * 3))];
//
//         this.setState({message: randomMessage});
//     },
//
//     render: function() {
//         return (
//             <div>
//                 <MessageView message={this.state.message}/>
//                 <p>
//                     <input type="button" onClick={this.onClick} value="Change Message"/>
//                 </p>
//             </div>
//         )
//     }
// });
//
//
// let MessageView = React.createClass({
//     render: function () {
//         return (
//             <p>{this.props.message}</p>
//         )
//     }
//
// });
//
// ReactDOM.render(
//     <RandomMessage/>,
//     document.getElementById('root')
// );


// const CONTACTS = [
//     {
//         id: 1,
//         name: 'Darth Vader',
//         phoneNumber: '+250966666666',
//         image: 'src/img/darth.gif',
//         email: 'superdarthvader@gmail.com'
//     }, {
//         id: 2,
//         name: 'Princess Leia',
//         phoneNumber: '+250966344466',
//         image: 'src/img/leia.gif',
//         email: 'PrincessLeia@gmail.com'
//
//     }, {
//         id: 3,
//         name: 'Luke Skywalker',
//         phoneNumber: '+250976654433',
//         image: 'src/img/luke.gif',
//         email: 'LukeSkywalker@gmail.com'
//     }, {
//         id: 4,
//         name: 'Chewbacca',
//         phoneNumber: '+250456784935',
//         image: 'src/img/chewbacca.gif',
//         email: 'LukeSkywalker@gmail.com'
//     }
// ];


// let ContactsPanel = React.createClass({
//     getInitialState: function () {
//         return {
//             displayedContacts: CONTACTS,
//             personWhomWeSayHello: 'stranger'
//                 };
//     },
//     chageGreetingText: function (event) {
//         this.setState({personWhomWeSayHello : event.target.value});
//     },
//     searchFunction: function (event) {
//         let searchQuery = event.target.value.toLowerCase();
//         let displayedContacts = CONTACTS.filter((element) => {
//             let contactsName = element.name.toLowerCase();
//             let contactsPhone = element.phoneNumber;
//
//             return (contactsName.indexOf(searchQuery) !== -1 || contactsPhone.indexOf(searchQuery) !== -1);
//         });
//
//         this.setState({displayedContacts: displayedContacts});
//
//         console.log(displayedContacts);
//     },
//     render: function () {
//         return (
//             <div className="contacts">
//                 <input type="text" className="search-field" onChange={this.searchFunction}/>
//                 <div className="contacts-list">
//                     {
//                         this.state.displayedContacts.map((element) => {
//                             return <Contact key={element.id} name={element.name} phoneNumber={element.phoneNumber}
//                                             image={element.image} email={element.email}/>
//                         })
//                     }
//                 </div>
//                 <input type="text" className="search-field" onChange={this.chageGreetingText}/>
//                 <p>Hello,{' '+this.state.personWhomWeSayHello}</p>
//             </div>
//         )
//     }
// });
//
//
// let Contact = React.createClass({
//     getInitialState: function () {
//         return {expanded: false}
//     },
//     contactExpand: function (event) {
//         this.setState({expanded: (this.state.expanded ? false : true)})
//     },
//     render: function () {
//
//         if (this.state.expanded) {
//             return (
//                 <div className="contact expanded" onClick={this.contactExpand}>
//                     <img className="contact-image" src={this.props.image} height="50px" width="50px"/>
//                     <div>
//                         <div className="contact-name">{this.props.name}</div>
//                         <div className="contact-number">{this.props.phoneNumber}</div>
//                         <div className="contact-number">{this.props.email}</div>
//                     </div>
//                 </div>
//             )
//         }
//         else {
//             return (
//                 <div className="contact" onClick={this.contactExpand}>
//                     <img className="contact-image" src={this.props.image} height="50px" width="50px"/>
//                     <div className="contact-name">{this.props.name}</div>
//                     <div className="contact-number">{this.props.phoneNumber}</div>
//                 </div>
//             )
//         }
//     }
// });
//
//
// ReactDOM.render(
//     <ContactsPanel/>,
//     document.getElementById('root')
// );

const notes = [
    {
        id: 1,
        name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cupiditate, eos! Adipisci autem harum quos!',
        color: '#3444FF'
    }, {
        id: 2,
        name: 'veritatis? Eos illum laudantium recusandae repellendus similique. Consequatur dolorem nesciunt numquam possimus soluta! Provident.',
        color: '#FF113A'
    }, {
        id: 3,
        name: 'Amet aspernatur autem facilis laborum molestias praesentium reiciendis rerum elit. Excepturi, voluptatum.',
        color: '#19FF2C'
    }, {
        id: 4,
        name: 'dolorem dolores, ea eligendi facilis fuga harum illum in ipsum itaque.',
        color: '#FFD700'
    }, {
        id: 5,
        name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi.,
        color: '#E88AFF'
    }, {
        id: 6,
        name: 'optio perferendis quidem quisquam recusandae repellendus suscipit veniam',
        color: '#9AFF8F'
    }, {
        id: 7,
        name: 'ducimus eos eum expedita explicabo incidunt inventore iste iure labore minus nostrum nulla,',
        color: '#FF3BBA'
    }, {
        id: 8,
        name: 'consequuntur culpa cum cupiditate deserunt distinctio,',
        color: '#B91BFF'
    }, {
        id: 9,
        name: 'unde veritatis vitae voluptates voluptatibus! ',
        color: '#00FFF9'
    }
];


let Note = React.createClass({
    render: function () {
        return (
            <div className="note">Note</div>
        )
    }
});

let NotesEditor = React.createClass({
    render: function () {
        return (
            <div className="notes-editor">
                <textarea className="textarea" name="editor" cols="30" rows="10" placeholder="Текст заметки"/>
                <input className="add-button" type="button" value="Добавить"/>
            </div>
        )
    }
});

let NotesContainer = React.createClass({
    render: function () {
        return (
            <div className="notes-container">
                <Note/>
                <Note/>
                <Note/>
            </div>
        )
    }
});

let NotesApp = React.createClass({
    render: function () {
        return (
            <div className="notes-app">
                <NotesEditor/>
                <NotesContainer/>
            </div>
        )
    }
});


ReactDOM.render(
    <NotesApp />,
    document.getElementById('root')
);




