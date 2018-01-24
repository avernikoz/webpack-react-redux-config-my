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
                <div className="main-box">
                    <CategorysBox/>
                    <TasksBox/>
                </div>
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
    getInitialState: function () {
        return {
            categoryInputText: '',
            categories: []
        }
    },
    setCategoryText: function (event) {
        this.setState({categoryInputText: event.target.value})
    },
    addCategory: function () {
        let newCategory = {
            id: Date.now(),
            name: this.state.categoryInputText
        };

        let allCategories = this.state.categories;
        allCategories.unshift(newCategory);

        this.setState({categories: allCategories});
        this.setState({categoryInputText: ''});

    },
    render: function () {
        return (
            <div className="category-box">
                <div className="category-add-container">
                    <input className="category-add-input" type="text" placeholder="Enter category title" value={this.state.categoryInputText} onChange={this.setCategoryText}/>
                    <input className="add-button" type="button" value="Add" onClick={this.addCategory}/>
                </div>
                <CategoryList categories={this.state.categories}/>
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
                {this.props.categories.map((elem) => {
                    return <Category key={elem.id} categoryName={elem.name}/>
                })}
            </div>

        )
    }
});

let Category = React.createClass({
    render: function () {
        return (
            <div className="category">
                <div className="category-name-container">
                    <div className="category-name">{this.props.categoryName}</div>
                    <i className="fas fa-edit fa-sm icon"/>
                </div>
                <div className="category-icons-container">
                        <i className="fas fa-trash-alt fa-sm icon"/>
                        <i className="fas fa-plus fa-sm icon"/>
                </div>
            </div>
        )
    }
});


let TasksBox = React.createClass({
    getInitialState: function () {
        return {
            taskInputText: '',
            tasks: []
        }
    },
    setTaskText: function (event) {
        this.setState({taskInputText: event.target.value})
    },
    addTask: function () {
        let newTask = {
            id: Date.now(),
            name: this.state.taskInputText
        };

        let allTasks = this.state.tasks;
        allTasks.unshift(newTask);

        this.setState({tasks: allTasks});
        this.setState({taskInputText: ''});

    },
    render: function () {
        return (
            <div className="tasks-box">
                <div className="tasks-add-container">
                    <input className="task-add-input" type="text" placeholder="Enter task title" value={this.state.taskInputText} onChange={this.setTaskText}/>
                    <input className="add-button" type="button" value="Add" onClick={this.addTask}/>
                </div>
                <TasksList tasks={this.state.tasks}/>
            </div>
        )
    }
});

let TasksList = React.createClass({
    render: function () {
        return (
            <div className="tasks-list">
                <Task taskName={'Task 1'}/>
                <Task taskName={'Task 2'}/>
                <Task taskName={'Task 3'}/>
                {
                    this.props.tasks.map((elem) => {
                        return  <Task key={elem.id} taskName={elem.name}/>
                    })
                }
            </div>

        )
    }
});

let Task = React.createClass({
    render: function () {
        return (
            <div className="task">
                <div className="task-checkbox-container">
                    <input className="task-checkbox" type="checkbox"/>
                    {this.props.taskName}
                </div>
                <i className="fas fa-edit fa-sm icon"/>
            </div>
        )
    }
});


ReactDOM.render(
    <ToDoListApp/>,
    document.getElementById('root')
);



