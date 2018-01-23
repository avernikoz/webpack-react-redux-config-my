// Литература (видео, уроки, ресурсы)
// Вы пишите так let RandomMessage = React.createClass или extends.React ???
// Какой скелет для реакта юзаете?
// state атоматом передаётся в пропсы дочерних элементов, или нет?
// 12:04

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

React.createClass = createReactClass;


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


let ToDoListApp = React.createClass({
    render: function () {
        return (
            <div className="todo-list-app">
                <Navbar/>
                <CategorysBox/>
                <TasksBox/>
            </div>
        )
    }
});


let Navbar = React.createClass({
    render: function () {
        return (
            <div>
                <div className="upper-header">
                    <h1 className="app-title">To-do-list</h1>
                    <div className="search-container">
                        <div className="checkbox-search-box">
                            <input id="showDone" type="checkbox" className="search-checkbox"/>
                            <label htmlFor="showDone">
                                Show done
                            </label>
                        </div>
                        <div className="input-search-box">
                            <input type="text" placeholder="Search..." className="search-field"/>
                            <span className="clear-icon-search-field">X</span>
                        </div>
                    </div>
                </div>
                <div className="progress-bar">
                    Progress-bar
                </div>
            </div>
        )
    }
});

let CategorysBox = React.createClass({
    render: function () {
        return (
            <div>
                <div className="category-add-container">
                    <input type="text" placeholder="Enter category title"/>
                    <input type="button"/>
                </div>
                <CategoryList/>
            </div>
        )
    }
});

let CategoryList = React.createClass({
    render: function () {
        return (
            <div className="category-list">
                <Category categoryName={'Category 1'}/>
                <Category categoryName={'Category 2'}/>
                <Category categoryName={'Category 3'}/>
            </div>

        )
    }
});

let Category = React.createClass({
    render: function () {
        return (
            <div className="category">
                {this.props.categoryName}
                <span className="category-edit-icon"/>
                <span className="category-delete-icon"/>
                <span className="category-add-new-task-icon"/>
            </div>
        )
    }
});


let TasksBox = React.createClass({
    render: function () {
        return (
            <div>
                <div className="tasks-add-container">
                    <input type="text" placeholder="Enter task title"/>
                    <input type="button"/>
                </div>
                <TasksList/>
            </div>
        )
    }
});

let TasksList = React.createClass({
    render: function () {
        return (
            <div className="tasks-list">
                <Task taskName={'Category 1'}/>
                <Task taskName={'Category 2'}/>
                <Task taskName={'Category 3'}/>
            </div>

        )
    }
});

let Task = React.createClass({
    render: function () {
        return (
            <div className="task">
                <input type="checkbox"/>
                {this.props.taskName}
                <span className="task-edit-icon"/>
            </div>
        )
    }
});


ReactDOM.render(
    <ToDoListApp/>,
    document.getElementById('root')
);