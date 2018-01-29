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
import ModalWindowCategoryAdd from './ModalWindowCategoryAdd';
import ModalWindowCategoryEdit from './ModalWindowCategoryEdit';
import ModalWindowCategoryDelete from './ModalWindowCategoryDelete';

import {TasksBox, TasksList, Task} from './Tasks';




//App
let ToDoListApp = React.createClass({
    getInitialState: function () {
        return {
            categories: exampleCategories,
            tasks: exampleTasks,
            selectedCategoryId: '',
            selectedCategoryText: '',
            selectedTaskId: '',
            selectedTaskText: '',
            numberOfCategoriesThatHaveTasks: null,
            numberOfAllCompletedCategories: null,
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
            parent: null,
            numberOfTasks: null,
            numberOfCompletedTasks: null
        };

        let allCategories = this.state.categories;
        allCategories.unshift(newCategory);

        this.setState({categories: allCategories});
    },
    addNestedCategory: function (categoryName, parentCategoryId) {
        let newNestedCategory = {
            id: Date.now(),
            name: categoryName,
            parent: parentCategoryId,
            numberOfTasks: null,
            numberOfCompletedTasks: null
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

    // TODO: Fix progress bar when category will be deleted

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
            catid: this.state.selectedCategoryId,
            completed: false
        };

        let allTasks = this.state.tasks;
        allTasks.unshift(newTask);

        this.setState({tasks: allTasks},this.countTasksInCategory);
    },
    countTasksInCategory: function () {
        let allCategories = this.state.categories;

        let categoryIndex = allCategories.findIndex((elem) => {
            return elem.id === this.state.selectedCategoryId
        });

        if (allCategories[categoryIndex].numberOfTasks === null || allCategories[categoryIndex].numberOfTasks === 0){
            this.increaseQuantityOfCategoriesThatHaveTasks();
        }

        allCategories[categoryIndex].numberOfTasks = allCategories[categoryIndex].numberOfTasks + 1;


        this.setState({categories: allCategories});

    },
    increaseQuantityOfCategoriesThatHaveTasks: function () {
        this.setState({numberOfCategoriesThatHaveTasks: this.state.numberOfCategoriesThatHaveTasks + 1});
    },
    componentWillMount: function () {
        let allCategories = this.state.categories;

        let quantityOfCategoriesWithTasks = allCategories.reduce( (sumTasks, category) => {

            if (category.numberOfTasks > 0) {
                sumTasks = sumTasks + 1 ;
            }
            return sumTasks;
        },0);


        this.setState({numberOfCategoriesThatHaveTasks: quantityOfCategoriesWithTasks});

    },
    setTaskProgress: function (checked, taskId) {


        let allTasks = this.state.tasks;

        let taskIndex = allTasks.findIndex((elem) => {
            return elem.id === taskId
        });

        allTasks[taskIndex].completed = checked;

        this.setState({tasks: allTasks}, this.setCategoryProgress(checked));
    },
    //These 3 functions after need to refactor
    setCategoryProgress: function(checked) {
        let allCategories = this.state.categories;

        let categoryIndex = allCategories.findIndex((elem) => {
            return elem.id === this.state.selectedCategoryId
        });

        let operationTypeBefore;

        if (checked) {

            allCategories[categoryIndex].numberOfCompletedTasks = allCategories[categoryIndex].numberOfCompletedTasks + 1;
            operationTypeBefore = 'adding';
        }
        else {
            allCategories[categoryIndex].numberOfCompletedTasks = allCategories[categoryIndex].numberOfCompletedTasks - 1;
            operationTypeBefore = 'deducting';
        }

        this.setState({categories: allCategories},this.checkCategoryProgress(operationTypeBefore));

    },
    checkCategoryProgress: function (operationTypeBefore) {


        let allCategories = this.state.categories;

        let categoryIndex = allCategories.findIndex((elem) => {
            return elem.id === this.state.selectedCategoryId
        });

        if (allCategories[categoryIndex].numberOfCompletedTasks === allCategories[categoryIndex].numberOfTasks && operationTypeBefore === 'adding'){
            console.log(`All tasks in current category ${this.state.selectedCategoryId} is completed`);
            this.countCompletedCategories('add');
        }
        else if (allCategories[categoryIndex].numberOfCompletedTasks === allCategories[categoryIndex].numberOfTasks - 1 && operationTypeBefore === 'deducting') {
            this.countCompletedCategories('deduct');
        }
    },
    countCompletedCategories: function (operation) {
          if (operation === 'add'){
              this.setState({numberOfAllCompletedCategories: this.state.numberOfAllCompletedCategories + 1})
          }
          else {
              this.setState({numberOfAllCompletedCategories: this.state.numberOfAllCompletedCategories - 1})
          }
    },
    editTaskDescription: function (taskId,taskDesc) {
        //Need to delete/refactor/change
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
                    <Navbar updateFilter={this.updateFilter}
                            selectedCategoryId={this.state.selectedCategoryId}
                            numberOfCategoriesThatHaveTasks={this.state.numberOfCategoriesThatHaveTasks}
                            numberOfAllCompletedCategories={this.state.numberOfAllCompletedCategories}
                    />
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
                                  setTaskProgress={this.setTaskProgress}
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



