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


let exampleCategories = [
    {
        id: 1,
        parent: null,
        name: 'Category 1'
    },
    {
        id: 2,
        parent: null,
        name: 'Category 2'
    },
    {
        id: 3,
        parent: null,
        name: 'Category 3'
    }
];

let exampleTasks = [
    {
        id: 1,
        catid: 1,
        name: 'Task 1'
    },
    {
        id: 2,
        catid: 1,
        name: 'Task 2'
    },
    {
        id: 3,
        catid: 2,
        name: 'Task 1'
    },
    {
        id: 4,
        catid: 2,
        name: 'Task 2'
    },
    {
        id: 5,
        catid: 2,
        name: 'Task 3'
    },
    {
        id: 6,
        catid: 3,
        name: 'Task 1'
    },
    {
        id: 7,
        catid: 3,
        name: 'Task 2'
    },
    {
        id: 8,
        catid: 3,
        name: 'Task 3'
    },
    {
        id: 9,
        catid: 3,
        name: 'Task 4'
    },
    {
        id: 10,
        catid: 3,
        name: 'Task 5'
    },
];


let ToDoListApp = React.createClass({
    getInitialState: function () {
        return {
            selectedCategory: '',
            selectedCategoryText: '',
            filter: {
                filterText: '',
                showCompletedTasks: false
            },
            modalWindowOpened: false,
            modalWindowAddOpened: false,
            modalWindowEditOpened: false
        }
    },
    selectCurrentCategory: function (idSelectedCategory, textSelectedCategory) {
        this.setState({
            selectedCategory: idSelectedCategory,
            selectedCategoryText: textSelectedCategory
        });
    },
    updateFilter: function (filterText, showCompleted) {
        this.setState({
            filter: {
                filterText: filterText,
                showCompletedTasks: showCompleted
            }
        })
    },
    showModal: function (modalWindow) {
        switch (modalWindow) {
            case 'addCategory':
                this.setState({
                    modalWindowOpened: true,
                    modalWindowAddOpened: true
                });
                break;

            case 'editCategory':
                this.setState({
                    modalWindowOpened: true,
                    modalWindowEditOpened: true
                });
                break;
        }
    },
    closeModal: function (modalWindow) {
        switch (modalWindow) {
            case 'addCategory':
                this.setState({
                    modalWindowOpened: false,
                    modalWindowAddOpened: false
                });
                break;

            case 'editCategory':
                this.setState({
                    modalWindowOpened: false,
                    modalWindowEditOpened: false
                });
                break;
        }
    },
    render: function () {

        let mainContentWrapperClassName = this.state.modalWindowOpened === false ? 'main-content-wrapper' : 'main-content-wrapper blurred';

        return (
            <div className="todo-list-app">
                <div className={mainContentWrapperClassName}>
                    <Navbar updateFilter={this.updateFilter} selectedCategory={this.state.selectedCategory}/>
                    <div className="main-box">
                        <CategorysBox selectCurrentCategory={this.selectCurrentCategory}
                                      selectedCategory={this.state.selectedCategory}
                                      showModal={this.showModal}/>
                        <TasksBox selectedCategory={this.state.selectedCategory} filterOptions={this.state.filter}/>
                    </div>
                </div>
                <Counter initialCount={7} />
                <ModalWindowCategoryAdd closeModal={this.closeModal}
                                        modalWindowAddOpened={this.state.modalWindowAddOpened}
                                        modalWindowOpened={this.state.modalWindowOpened}
                                        selectedCategory={this.state.selectedCategory}/>
                <ModalWindowCategoryEdit closeModal={this.closeModal}
                                         modalWindowEditOpened={this.state.modalWindowEditOpened}
                                         modalWindowOpened={this.state.modalWindowOpened}
                                         selectedCategory={this.state.selectedCategory}
                                         selectedCategoryText={this.state.selectedCategoryText}/>
            </div>
        )
    }
});

// Как будет правильно - создать все свойства в компоненте, который находится на самом верхнем уровне,
// или объявить их в том компоненте, в котором они меняются, и передавать их с помощью-какого-нибудь метода

let Navbar = React.createClass({
    getInitialState: function () {
        return ({
            searchInputText: '',
            showCompletedTasks: false
        })
    },
    updateFilterValues: function () {
        this.props.updateFilter(this.state.searchInputText, this.state.showCompletedTasks)
    },
    searchInTasks: function (event) {
        this.setState({searchInputText: event.target.value}, this.updateFilterValues);
    },
    showTasksOption: function (event) {
        if (event.target.checked) {
            this.setState({showCompletedTasks: true}, this.updateFilterValues);
        }
        else {
            this.setState({showCompletedTasks: false}, this.updateFilterValues);
        }

    },
    clearSearchInput: function () {
        this.setState({searchInputText: ''}, this.updateFilterValues);
    },

    render: function () {
        let SearchBoxActivity = this.props.selectedCategory === '';

        return (
            <div>
                <div className="upper-header">
                    <h1 className="app-title">To-do-list</h1>
                    <div className="search-container">
                        <div className="checkbox-search-box">
                            <input id="showDone" type="checkbox" onChange={this.showTasksOption}
                                   className="search-checkbox"/>
                            <label htmlFor="showDone">
                                Show done
                            </label>
                        </div>
                        <div className="input-search-box">
                            <input type="text" placeholder="Search..." className="search-field"
                                   value={this.state.searchInputText} onChange={this.searchInTasks}
                                   disabled={SearchBoxActivity}/>
                            <i className="fas fa-times sm clear-icon-search-field" onClick={this.clearSearchInput}/>
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
            // categories: []
            categories: exampleCategories
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
    _handleKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.addCategory();
        }
    },
    render: function () {
        return (
            <div className="category-box">
                <div className="category-add-container">
                    <input className="category-add-input" type="text" placeholder="Enter category title"
                           value={this.state.categoryInputText} onChange={this.setCategoryText}
                           onKeyPress={this._handleKeyPress}/>
                    <input className="add-button" type="button" value="Add" onClick={this.addCategory}/>
                </div>
                <CategoryList categories={this.state.categories}
                              selectCurrentCategory={this.props.selectCurrentCategory}
                              selectedCategory={this.props.selectedCategory}
                              showModal={this.props.showModal}/>
            </div>
        )
    }
});

let CategoryList = React.createClass({
    render: function () {
        return (
            <div className="category-list">
                {this.props.categories.map((elem) => {
                    return <Category id={elem.id} key={elem.id} categoryName={elem.name}
                                     selectCurrentCategory={this.props.selectCurrentCategory}
                                     selectedCategory={this.props.selectedCategory}
                                     showModal={this.props.showModal}/>
                })}
            </div>

        )
    }
});

let Category = React.createClass({
    onClickCurrentCategory: function () {
        this.props.selectCurrentCategory(this.props.id, this.props.categoryName);
    },
    showAddCategoryModal: function () {
        this.props.showModal('addCategory');
    },
    showEditCategoryModal: function () {
        this.props.showModal('editCategory');
    },
    render: function () {
        let categoryClassName = this.props.selectedCategory === this.props.id ? 'category selected-category' : 'category';

        return (
            <div className={categoryClassName} onClick={this.onClickCurrentCategory}>
                <div className="category-name-container">
                    <div className="category-name">{this.props.categoryName}</div>
                    <i className="fas fa-edit fa-sm icon" onClick={this.showEditCategoryModal}/>
                </div>
                <div className="category-icons-container">
                    <i className="fas fa-trash-alt fa-sm icon"/>
                    <i className="fas fa-plus fa-sm icon" onClick={this.showAddCategoryModal}/>
                </div>
            </div>
        )
    }
});


let TasksBox = React.createClass({
    getInitialState: function () {
        return {
            taskInputText: '',
            tasks: exampleTasks
        }
    },
    setTaskText: function (event) {
        this.setState({taskInputText: event.target.value})
    },
    addTask: function () {
        let newTask = {
            id: Date.now(),
            name: this.state.taskInputText,
            catid: this.props.selectedCategory
        };

        let allTasks = this.state.tasks;
        allTasks.unshift(newTask);

        this.setState({tasks: allTasks});
        this.setState({taskInputText: ''});

    },
    _handleKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.addTask()
        }
    },
    render: function () {

        let tasksAddContainerClassName = this.props.selectedCategory === '' ? 'tasks-box disabled' : 'tasks-box';
        return (
            <div className={tasksAddContainerClassName}>
                <div className="tasks-add-container">
                    <input className="task-add-input" type="text" placeholder="Enter task title"
                           value={this.state.taskInputText} onChange={this.setTaskText}
                           onKeyPress={this._handleKeyPress}/>
                    <input className="add-button" type="button" value="Add" onClick={this.addTask}/>
                </div>
                <TasksList tasks={this.state.tasks} selectedCategory={this.props.selectedCategory}
                           filterOptions={this.props.filterOptions}/>
            </div>
        )
    }
});

// Вот тут мне кажется можно проще
// Мб componentWillReceiveProps ???

let TasksList = React.createClass({
    render: function () {
        let filterOptions = this.props.filterOptions;

        return (
            <div className="tasks-list">
                {
                    this.props.tasks.map((elem) => {
                        let ourTaskInOurCategory = (elem.catid === this.props.selectedCategory);
                        let outTaskInSearchQuery = (elem.name.toLowerCase().indexOf(filterOptions.filterText) !== -1);


                        if (ourTaskInOurCategory && outTaskInSearchQuery) {
                            return <Task key={elem.id} taskName={elem.name}/>
                        }
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


let ModalWindowCategoryAdd = React.createClass({
    closeCurrentModal: function () {
        this.props.closeModal('addCategory');
    },
    render: function () {
        let modalWindowWrapperClassName = (this.props.modalWindowOpened && this.props.modalWindowAddOpened) ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';
        return (
            <div className={modalWindowWrapperClassName}>
                <div className="modal-window">
                    <div className="modal-buttons-container">
                        <input className="category-add-input" type="text" placeholder="Enter category title"/>
                        <input className="add-button" type="button" value="Add"/>
                        <input className="close-button" type="button" value="Close" onClick={this.closeCurrentModal}/>

                    </div>
                </div>
            </div>
        )
    }
});

let ModalWindowCategoryEdit = React.createClass({
    getInitialState: function () {
        return ({categoryEditedText: this.props.selectedCategoryText});
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            categoryEditedText: nextProps.selectedCategoryText
        })
    },
    onChangeCategoryEditedText: function (event) {
      this.setState({categoryEditedText: event.target.value})
    },
    closeCurrentModal: function () {
        this.props.closeModal('editCategory');
    },
    display: function () {
        console.log(this.props.selectedCategoryText);

    },
    render: function () {
        let modalWindowWrapperClassName = (this.props.modalWindowOpened && this.props.modalWindowEditOpened) ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';
        return (
            <div className={modalWindowWrapperClassName}>
                <div className="modal-window">
                    <div className="modal-buttons-container">
                        <input className="category-add-input" type="text" placeholder="Enter category title" value={this.state.categoryEditedText} onChange={this.onChangeCategoryEditedText}/>
                        <input className="add-button" type="button" value="Save" onClick={this.display}/>
                        <input className="close-button" type="button" value="Close" onClick={this.closeCurrentModal}/>

                    </div>
                </div>
            </div>
        )
    }
});



// !!!УДОЛИ МЕНЯ!!!
var Counter = React.createClass({
    getInitialState: function() {
        // naming it initialX clearly indicates that the only purpose
        // of the passed down prop is to initialize something internally
        console.log(this.props.initialCount);

        return {count: this.props.initialCount};
    },

    handleClick: function() {
        this.setState({count: this.state.count + 1});
    },

    render: function() {
        return <div onClick={this.handleClick}>{this.state.count}</div>;
    }
});

ReactDOM.render(
    <ToDoListApp/>,
    document.getElementById('root')
);



