
const notes = [
    {
        id: 1,
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis cupiditate, eos! Adipisci autem harum quos!',
        color: '#3444FF'
    }, {
        id: 2,
        text: 'veritatis? Eos illum laudantium recusandae repellendus similique. Consequatur dolorem nesciunt numquam possimus soluta! Provident.',
        color: '#FF113A'
    }, {
        id: 3,
        text: 'Amet aspernatur autem facilis laborum molestias praesentium reiciendis rerum elit. Excepturi, voluptatum.',
        color: '#19FF2C'
    }, {
        id: 4,
        text: 'dolorem dolores, ea eligendi facilis fuga harum illum in ipsum itaque.',
        color: '#FFD700'
    }, {
        id: 5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi.',
        color: '#E88AFF'
    }, {
        id: 6,
        text: 'optio perferendis quidem quisquam recusandae repellendus suscipit veniam',
        color: '#9AFF8F'
    }, {
        id: 7,
        text: 'ducimus eos eum expedita explicabo incidunt inventore iste iure labore minus nostrum nulla,',
        color: '#FF3BBA'
    }, {
        id: 8,
        text: 'consequuntur culpa cum cupiditate deserunt distinctio,',
        color: '#B91BFF'
    }, {
        id: 9,
        text: 'unde veritatis vitae voluptates voluptatibus! ',
        color: '#00FFF9'
    }
];

// function getRandomColor() {
//     let letters = '789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 9)];
//     }
//     return color;
// }
//
//
//
//
//
//
//
//
//
//
//
//
// let NotesEditor = React.createClass({
//     getInitialState: function () {
//         return {textInput: ''}
//     },
//     inputTextChanged: function (event) {
//         this.setState({textInput: event.target.value});
//         console.log(event.target.value);
//     },
//     addNote: function () {
//         let newNote = {
//             id: Date.now(),
//             text: this.state.textInput,
//             color: getRandomColor()
//         };
//
//         this.props.onNotesAdd(newNote);
//         this.setState({textInput: ''});
//     },
//     render: function () {
//         return (
//             <div className="notes-editor">
//                 <textarea className="textarea" name="editor" cols="30" rows="10" placeholder="Текст заметки"
//                           value={this.state.textInput} onChange={this.inputTextChanged}/>
//                 <input className="add-button" type="button" value="Добавить" onClick={this.addNote}/>
//             </div>
//         )
//     }
// });
//
// let DeleteButton = React.createClass({
//     hello: function (event) {
//         console.log('hello', event.target.value);
//     },
//     render: function () {
//         return (
//             <div onClick={this.props.onDeleteNote} className="delete-button">x</div>
//         )
//     }
// });
//
// let Note = React.createClass({
//     deleteNote: function () {
//         this.props.deleteHandler(this.props.id);
//     },
//     render: function () {
//         let notesStyle = {
//             backgroundColor: this.props.color,
//             position: 'relative'
//         };
//
//         return (
//             <div style={notesStyle} className="note">
//                 <DeleteButton onDeleteNote={this.deleteNote} />
//                 {this.props.children}
//             </div>
//         )
//     }
// });
//
// let NotesContainer = React.createClass({
//     render: function () {
//         return (
//             <div className="notes-container">
//                 {
//                     this.props.notes.map((element) => {
//                         return <Note deleteHandler={this.props.deleteFunction} id={element.id} key={element.id} color={element.color}>{element.text}</Note>
//                     })
//                 }
//             </div>
//         )
//     }
// });
//
// let NotesApp = React.createClass({
//     getInitialState: function () {
//         return ({notes: notes})
//     },
//     componentDidMount: function () {
//         let notesFromLocalStorage = JSON.parse(localStorage.getItem('notes'));
//         if (notesFromLocalStorage){
//             this.setState({notes: notesFromLocalStorage});
//         }
//     },
//     componentDidUpdate: function () {
//         this.updateLocalStorage()
//     },
//     addNoteInContainer: function (newNote) {
//         let oldNotes = this.state.notes;
//         oldNotes.push(newNote);
//
//         this.setState({notes: oldNotes})
//     },
//     deleteNoteInContainer: function (noteIdToDelete) {
//
//         let notesAfterDeleting = this.state.notes.filter((element) => {
//             return element.id !== noteIdToDelete;
//         });
//
//         this.setState({notes: notesAfterDeleting});
//     },
//     render: function () {
//         return (
//             <div className="notes-app">
//                 <NotesEditor onNotesAdd={this.addNoteInContainer}/>
//                 <NotesContainer deleteFunction={this.deleteNoteInContainer} notes={this.state.notes}/>
//             </div>
//         )
//     },
//     updateLocalStorage: function () {
//         let notes = JSON.stringify(this.state.notes);
//         localStorage.setItem('notes', notes);
//     }
// });
//
//
// ReactDOM.render(
//     <NotesApp/>,
//     document.getElementById('root')
// );
//


//
// let ContactsPanel = React.createClass({
//     getInitialState: function () {
//         return {
//             displayedContacts: CONTACTS,
//             personWhomWeSayHello: 'stranger'
//         };
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
//