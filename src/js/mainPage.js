// Литература (видео, уроки, ресурсы)
// Вы пишите так let RandomMessage = React.createClass или extends.React ???
// Какой скелет для реакта юзаете?
// Как вызывать функцию только с одним вторым аргументом (modal window без selected category)
// Как сделать так, чтобы в modal window были норм текст

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

React.createClass = createReactClass;

import {exampleCategories, exampleTasks} from './defaultValues';
import Navbar from './Navbar';


let ToDoListApp = React.createClass({
    getInitialState: function () {
        return {
            categories: exampleCategories,
            tasks: exampleTasks,
            selectedCategoryId: '',
            selectedCategoryText: '',
            selectedTaskId: '',
            selectedTaskText: '',
            filter: {
                filterText: '',
                showCompletedTasks: false
            },
            modalWindowOpened: false,
            modalWindowAddOpened: false,
            modalWindowEditOpened: false,
            modalWindowDeleteOpened: false,
            modalWindowTaskEditDescriptionOpened: false
        }
    },
    setSelectedCurrentCategory: function (idSelectedCategory, textSelectedCategory) {
        this.setState({
            selectedCategoryId: idSelectedCategory,
            selectedCategoryText: textSelectedCategory
        });
    },
    setSelectedCurrentTask: function (idSelectedTask, textSelectedTask) {
        this.setState({
            selectedTaskId: idSelectedTask,
            selectedTaskText: textSelectedTask
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
            case 'deleteCategory':
                this.setState({
                    modalWindowOpened: true,
                    modalWindowDeleteOpened: true
                });
                break;
            case 'editTaskDescription':
                this.setState({
                    modalWindowOpened: true,
                    modalWindowTaskEditDescriptionOpened: true
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
            case 'deleteCategory':
                this.setState({
                    modalWindowOpened: false,
                    modalWindowDeleteOpened: false
                });
                break;
            case 'editTaskDescription':
                this.setState({
                    modalWindowOpened: false,
                    modalWindowTaskEditDescriptionOpened: false
                });
                break;
        }
    },
    addCategory: function (categoryName) {
        let newCategory = {
            id: Date.now(),
            name: categoryName,
            parent: null
        };

        let allCategories = this.state.categories;
        allCategories.unshift(newCategory);

        this.setState({categories: allCategories});
    },
    addNestedCategory: function (categoryName, parentCategoryId) {
        let newNestedCategory = {
            id: Date.now(),
            name: categoryName,
            parent: parentCategoryId
        };

        let allCategories = this.state.categories;
        let parentCategoryIndexInAllCategories = allCategories.findIndex((elem) => {
            return elem.id === parentCategoryId;
        });

        let nestedCategoriesCountInCurrentCategory = allCategories.reduce((sum, currElem) => {

            if (currElem.parent === parentCategoryId) {
                sum++;
            }
            return sum;

        }, 1);

        allCategories.splice(parentCategoryIndexInAllCategories + nestedCategoriesCountInCurrentCategory, 0, newNestedCategory);

        this.setState({categories: allCategories});
    },
    editCategory: function (categoryId, categoryName) {
        let allCategories = this.state.categories;

        allCategories.forEach((elem) => {
            if (elem.id === categoryId) {
                elem.name = categoryName;
            }
        });

        this.setState({categories: allCategories});

    },
    deleteCategory: function (categoryId) {
        let allCategories = this.state.categories;


        let categoriesToSearch = [];
        categoriesToSearch.push(categoryId);


        deepDeleteCategories(categoriesToSearch);

        function deepDeleteCategories(categoriesToSearch) {

            let categoriesNeedToDelete = allCategories.reduce((childCategories, elem) => {

                categoriesToSearch.forEach((categoryId) => {
                    if (categoryId === elem.parent) {
                        childCategories.push(elem.id)
                    }
                });

                return childCategories;
            }, []);


            allCategories = allCategories.filter((elem) => {
                return !categoriesNeedToDelete.includes(elem.id);
            });

            allCategories = allCategories.filter((elem) => {
                return !categoriesToSearch.includes(elem.id);
            });

            if (categoriesNeedToDelete.length !== 0) {
                deepDeleteCategories(categoriesNeedToDelete)
            }

        }

        //Apply result after recursion

        this.setState({categories: allCategories});

    },
    addTask: function (taskName) {
        let newTask = {
            id: Date.now(),
            name: taskName,
            catid: this.state.selectedCategoryId
        };

        let allTasks = this.state.tasks;
        allTasks.unshift(newTask);

        this.setState({tasks: allTasks});
    },
    editTaskDescription: function (taskId,taskDesc) {
        let allTasks = this.state.tasks;

        allTasks.forEach((elem) => {
            if (elem.id === taskId) {
                elem.name = taskDesc;
            }
        });

        this.setState({tasks: allTasks});

        console.log(taskId,taskDesc);
    },
    render: function () {

        let mainContentWrapperClassName = this.state.modalWindowOpened === false ? 'main-content-wrapper' : 'main-content-wrapper blurred';

        return (
            <div className="todo-list-app">
                <div className={mainContentWrapperClassName}>
                    <Navbar updateFilter={this.updateFilter} selectedCategoryId={this.state.selectedCategoryId}/>
                    <div className="main-box">
                        <CategorysBox setSelectedCurrentCategory={this.setSelectedCurrentCategory}
                                      selectedCategoryId={this.state.selectedCategoryId}
                                      showModal={this.showModal}
                                      categories={this.state.categories}
                                      addCategory={this.addCategory}

                        />
                        <TasksBox selectedCategoryId={this.state.selectedCategoryId}
                                  filterOptions={this.state.filter}
                                  tasks={this.state.tasks}
                                  addTask={this.addTask}
                                  showModal={this.showModal}
                                  setSelectedCurrentTask={this.setSelectedCurrentTask}
                        />
                    </div>
                </div>
                <ModalWindowCategoryAdd closeModal={this.closeModal}
                                        modalWindowAddOpened={this.state.modalWindowAddOpened}
                                        modalWindowOpened={this.state.modalWindowOpened}
                                        selectedCategoryId={this.state.selectedCategoryId}
                                        addNestedCategory={this.addNestedCategory}
                />
                <ModalWindowCategoryEdit closeModal={this.closeModal}
                                         modalWindowEditOpened={this.state.modalWindowEditOpened}
                                         modalWindowOpened={this.state.modalWindowOpened}
                                         selectedCategoryId={this.state.selectedCategoryId}
                                         selectedCategoryText={this.state.selectedCategoryText}
                                         editCategory={this.editCategory}

                />
                <ModalWindowCategoryDelete closeModal={this.closeModal}
                                           modalWindowDeleteOpened={this.state.modalWindowDeleteOpened}
                                           modalWindowOpened={this.state.modalWindowOpened}
                                           selectedCategoryId={this.state.selectedCategoryId}
                                           selectedCategoryText={this.state.selectedCategoryText}
                                           deleteCategory={this.deleteCategory}

                />
                <ModalWindowEditTaskDescription closeModal={this.closeModal}
                                                modalWindowTaskEditDescriptionOpened={this.state.modalWindowTaskEditDescriptionOpened}
                                                modalWindowOpened={this.state.modalWindowOpened}
                                                selectedTaskId={this.state.selectedTaskId}
                                                selectedTaskText={this.state.selectedTaskText}
                                                editTaskDescription={this.editTaskDescription}

                />
            </div>
        )
    }
});

let CategorysBox = React.createClass({
    getInitialState: function () {
        return {
            categoryInputText: '',
        }
    },
    setCategoryText: function (event) {
        this.setState({categoryInputText: event.target.value})
    },
    addCategoryHandler: function () {
        let categoryText = this.state.categoryInputText;

        this.props.addCategory(categoryText);

        this.setState({categoryInputText: ''});   // to handler
    },
    _handleKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.addCategoryHandler();
        }
    },
    render: function () {
        return (
            <div className="category-box">
                <div className="category-add-container">
                    <input className="category-add-input" type="text" placeholder="Enter category title"
                           value={this.state.categoryInputText} onChange={this.setCategoryText}
                           onKeyPress={this._handleKeyPress}/>
                    <input className="add-button" type="button" value="Add" onClick={this.addCategoryHandler}/>
                </div>
                <CategoryList categories={this.props.categories}
                              setSelectedCurrentCategory={this.props.setSelectedCurrentCategory}
                              selectedCategoryId={this.props.selectedCategoryId}
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
                    return <Category id={elem.id} key={elem.id} categoryName={elem.name} parentCategory={elem.parent}
                                     setSelectedCurrentCategory={this.props.setSelectedCurrentCategory}
                                     selectedCategoryId={this.props.selectedCategoryId}
                                     showModal={this.props.showModal}/>
                })}
            </div>

        )
    }
});

let Category = React.createClass({
    onClickCurrentCategory: function () {
        this.props.setSelectedCurrentCategory(this.props.id, this.props.categoryName);
    },
    showAddCategoryModal: function () {
        this.props.showModal('addCategory');
    },
    showEditCategoryModal: function () {
        this.props.showModal('editCategory');
    },
    showDeleteCategoryModal: function () {
        this.props.showModal('deleteCategory');
    },
    render: function () {
        let categoryClassName = this.props.selectedCategoryId === this.props.id ? 'category selected-category' : 'category';
        let nested = this.props.parentCategory === null ? '' : ' nested';

        return (
            <div className={categoryClassName + nested} onClick={this.onClickCurrentCategory}>
                <div className="category-name-container">
                    <div className="category-name">{this.props.categoryName}</div>
                    <i className="fas fa-edit fa-sm icon" onClick={this.showEditCategoryModal}/>
                </div>
                <div className="category-icons-container">
                    <i className="fas fa-trash-alt fa-sm icon" onClick={this.showDeleteCategoryModal}/>
                    <i className="fas fa-plus fa-sm icon" onClick={this.showAddCategoryModal}/>
                </div>
            </div>
        )
    }
});


let TasksBox = React.createClass({
    getInitialState: function () {
        return {
            taskInputText: ''
        }
    },
    setTaskText: function (event) {
        this.setState({taskInputText: event.target.value})
    },
    addTaskHandler: function () {
        let newTaskText = this.state.taskInputText;

        this.props.addTask(newTaskText);
        this.setState({taskInputText: ''});

    },
    _handleKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.addTaskHandler()
        }
    },
    render: function () {

        let tasksAddContainerClassName = this.props.selectedCategoryId === '' ? 'tasks-box disabled' : 'tasks-box';
        return (
            <div className={tasksAddContainerClassName}>
                <div className="tasks-add-container">
                    <input className="task-add-input" type="text" placeholder="Enter task title"
                           value={this.state.taskInputText} onChange={this.setTaskText}
                           onKeyPress={this._handleKeyPress}/>
                    <input className="add-button" type="button" value="Add" onClick={this.addTaskHandler}/>
                </div>
                <TasksList tasks={this.props.tasks} selectedCategoryId={this.props.selectedCategoryId}
                           filterOptions={this.props.filterOptions}
                           setSelectedCurrentTask={this.props.setSelectedCurrentTask}
                           showModal={this.props.showModal}
                />

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
                        let ourTaskInOurCategory = (elem.catid === this.props.selectedCategoryId);
                        let outTaskInSearchQuery = (elem.name.toLowerCase().indexOf(filterOptions.filterText) !== -1);


                        if (ourTaskInOurCategory && outTaskInSearchQuery) {
                            return <Task id={elem.id}
                                         key={elem.id}
                                         taskName={elem.name}
                                         setSelectedCurrentTask={this.props.setSelectedCurrentTask}
                                         showModal={this.props.showModal}
                            />
                        }
                    })
                }
            </div>
        )

    }
});

let Task = React.createClass({
    onClickCurrentTask: function () {
        this.props.setSelectedCurrentTask(this.props.id, this.props.taskName);
    },
    onEditTaskDescriptionHandler: function () {
        this.props.showModal('editTaskDescription');
    },
    render: function () {
        return (
            <div className="task" onClick={this.onClickCurrentTask}>
                <div className="task-checkbox-container">
                    <input className="task-checkbox" type="checkbox"/>
                    {this.props.taskName}
                </div>
                <i className="fas fa-edit fa-sm icon" onClick={this.onEditTaskDescriptionHandler}/>
            </div>
        )
    }
});


let ModalWindowCategoryAdd = React.createClass({
    getInitialState: function () {
        return ({inputText: ''});
    },
    componentDidUpdate() {
        this.nameInput.focus();
    },
    inputChangeHandler: function (event) {
        this.setState({inputText: event.target.value});
    },
    addCategoryHandler: function () {
        this.props.addNestedCategory(this.state.inputText, this.props.selectedCategoryId);

        this.clearTextInput();
        this.closeCurrentModal();
    },
    _handleKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.addCategoryHandler();
        }
    },
    clearTextInput: function () {
        this.setState({inputText: ''});
    },
    closeCurrentModal: function () {
        this.clearTextInput();
        this.props.closeModal('addCategory');
    },
    render: function () {
        let modalWindowWrapperClassName = (this.props.modalWindowOpened && this.props.modalWindowAddOpened) ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';
        let addButtonCondition = this.state.inputText === '';

        return (
            <div className={modalWindowWrapperClassName}>
                <div className="modal-window">
                    <div className="modal-buttons-container">
                        <input className="category-add-input"
                               type="text" placeholder="Enter new subcategory title..."
                               value={this.state.inputText}
                               onChange={this.inputChangeHandler} onKeyPress={this._handleKeyPress}
                               ref={(input) => {
                                   this.nameInput = input;
                               }}
                        />
                        <input className="add-button" type="button" value="Add" onClick={this.addCategoryHandler}
                               disabled={addButtonCondition}/>
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
    componentDidUpdate() {
        this.nameInput.focus();
    },
    // componentWillReceiveProps: function (nextProps) {
    //     this.setState({
    //         categoryEditedText: nextProps.selectedCategoryText
    //     })
    // },
    onChangeCategoryEditedText: function (event) {
        this.setState({categoryEditedText: event.target.value})
    },
    closeCurrentModal: function () {
        this.clearSearchInput();
        this.props.closeModal('editCategory');
    },
    saveCategoryChangesHandler: function () {
        let newCategoryText = this.state.categoryEditedText;
        this.props.editCategory(this.props.selectedCategoryId, newCategoryText);

        this.clearSearchInput();
        this.closeCurrentModal();
    },
    _handleKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.saveCategoryChangesHandler()
        }
    },
    clearSearchInput: function () {
        this.setState({categoryEditedText: ''});
    },
    render: function () {
        let modalWindowWrapperClassName = (this.props.modalWindowOpened && this.props.modalWindowEditOpened) ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';
        let saveButtonCondition = this.state.categoryEditedText === '';

        return (
            <div className={modalWindowWrapperClassName}>
                <div className="modal-window">
                    <div className="modal-buttons-container">
                        <input className="category-add-input" type="text" placeholder={this.props.selectedCategoryText}
                               value={this.state.categoryEditedText}
                               onChange={this.onChangeCategoryEditedText} onKeyPress={this._handleKeyPress}
                               ref={(input) => {
                                   this.nameInput = input;
                               }}

                        />
                        <input className="add-button" type="button" value="Save"
                               onClick={this.saveCategoryChangesHandler} disabled={saveButtonCondition}/>
                        <input className="close-button" type="button" value="Close" onClick={this.closeCurrentModal}/>

                    </div>
                </div>
            </div>
        )
    }
});


let ModalWindowCategoryDelete = React.createClass({
    getInitialState: function () {
        return ({categoryName: ''});
    },
    deleteCategoryHandler: function () {
        this.props.deleteCategory(this.props.selectedCategoryId);

        this.closeCurrentModal();
    },
    closeCurrentModal: function () {
        this.props.closeModal('deleteCategory');
    },
    render: function () {
        let modalWindowWrapperClassName = (this.props.modalWindowOpened && this.props.modalWindowDeleteOpened) ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';

        return (
            <div className={modalWindowWrapperClassName}>
                <div className="modal-window">
                    <div className="modal-buttons-container">
                        <div className="category-delete-text-container">Delete
                            category {this.props.selectedCategoryText} and all nested?
                        </div>
                        <input className="add-button" type="button" value="Delete"
                               onClick={this.deleteCategoryHandler}/>
                        <input className="close-button" type="button" value="Close" onClick={this.closeCurrentModal}/>
                    </div>
                </div>
            </div>
        )
    }
});


let ModalWindowEditTaskDescription = React.createClass({
    getInitialState: function () {
        return ({inputText: ''});
    },
    componentDidUpdate: function() {
        this.nameInput.focus();
    },
    inputChangeHandler: function (event) {
        this.setState({inputText: event.target.value});
    },
    editTaskDescriptionHandler: function () {
        this.props.editTaskDescription(this.state.inputText, this.props.selectedTaskId);

        this.clearTextInput();
        this.closeCurrentModal();
    },
    _handleKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.editTaskDescriptionHandler()
        }
    },
    clearTextInput: function () {
        this.setState({inputText: ''});
    },
    closeCurrentModal: function () {
        this.clearTextInput();
        this.props.closeModal('editTaskDescription');
    },
    render: function () {
        let modalWindowWrapperClassName = (this.props.modalWindowOpened && this.props.modalWindowTaskEditDescriptionOpened) ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';
        let addButtonCondition = this.state.inputText === '';

        return (
            <div className={modalWindowWrapperClassName}>
                <div className="modal-window-large">
                    <div className="modal-buttons-container large">
                        <h1>{this.props.selectedTaskText}</h1>
                        <textarea className="task-textarea"
                                  placeholder="Enter task description..."
                                  value={this.state.inputText}
                                  onChange={this.inputChangeHandler} onKeyPress={this._handleKeyPress}
                                  ref={(input) => this.nameInput = input}
                        />
                        <div className="modal-action-buttons-container">
                        <input className="add-button" type="button" value="Save"
                               onClick={this.editTaskDescriptionHandler}
                               disabled={addButtonCondition}/>
                        <input className="close-button" type="button" value="Close" onClick={this.closeCurrentModal}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});


ReactDOM.render(
    <ToDoListApp/>,
    document.getElementById('root')
);



