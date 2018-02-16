// Литература (видео, уроки, ресурсы)
// Вы пишите так let RandomMessage = React.createClass (ES5) или extends.React (ES6) ???
// Какой скелет для реакта юзаете?
// Как вызывать функцию только с одним вторым аргументом (modal window без selected category)
// Как сделать так, чтобы в modal window были норм текст
// Что-то не так с роутингом (нужно типо ререндерить 2 компонента два раза, неужели нельзя сделать как-то проще?)
// Если вы используете redux, то используете ли вы react state?? Если да, то когда?
// Почему не работает фокус в модальном окне, которое редактирует таск???


import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
React.createClass = createReactClass;


import {Route, Switch} from 'react-router-dom';



import {exampleCategories, exampleTasks} from './defaultValues';
import ModalWindowCategoryAdd from './components/ModalWindowCategoryAdd';
import ModalWindowCategoryEdit from './components/ModalWindowCategoryEdit';
import ModalWindowCategoryDelete from './components/ModalWindowCategoryDelete';
import ModalWindowEditTaskDescription from './components/ModalWindowEditTaskDescription';

import NavBar from './components/NavBar';
import TasksBox from './components/TasksBox';
import CategorysBox from './components/CategorysBox';


//TODO: При добавлении таска в выполненную категорию, она должна становится невыполненной +++
//TODO: Добавить старое описание и чекбокс в описание таска +++
//TODO: Добавить стили для вложенных категорий +++


//App
let ToDoListApp = React.createClass({
    getInitialState: function () {
        return {
            categories: [],
            tasks: [],
            selectedCategoryId: '',
            selectedCategoryText: '',
            selectedTaskId: '',
            selectedTaskText: '',
            selectedTaskCompleted: false,
            selectedTaskDescription: '',
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
    setSelectedCurrentTask: function (idSelectedTask, textSelectedTask, checkedSelectedCategory, taskDescription) {
        this.setState({
            selectedTaskId: idSelectedTask,
            selectedTaskText: textSelectedTask,
            selectedTaskCompleted: checkedSelectedCategory,
            selectedTaskDescription: taskDescription
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
            nestedLevel : null,
            numberOfTasks: null,
            numberOfCompletedTasks: null
        };

        let allCategories = this.state.categories;
        allCategories.unshift(newCategory);

        this.setState({categories: allCategories});
    },
    getNestedCategoryLevel: function (parentCategoryId) {
            let allCategories = this.state.categories;
            let nestedLevel = 1;

            deepSearchParentCategory(parentCategoryId);

            function deepSearchParentCategory(parentCategoryId){

                let parentCategory = allCategories.find((elem)=>{
                    return elem.id === parentCategoryId
                });


                if (parentCategory.parent !== null){
                    nestedLevel++;
                    deepSearchParentCategory(parentCategory.parent)
                }

            }

            return nestedLevel;
    },
    addNestedCategory: function (categoryName, parentCategoryId) {
        let newNestedCategory = {
            id: Date.now(),
            name: categoryName,
            parent: parentCategoryId,
            nestedLevel: this.getNestedCategoryLevel(parentCategoryId),
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

        allCategories.splice(parentCategoryIndexInAllCategories + 1, 0, newNestedCategory);

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


        let quantityCategoriesThatHaveTasksAndNeedToDelete = 0;
        let quantityCompletedCategories = 0;


        deepDeleteCategories(categoriesToSearch);

        function deepDeleteCategories(categoriesToSearch) {


            let categoriesNeedToDelete = allCategories.reduce((childCategories, elem) => {

                categoriesToSearch.forEach((categoryId) => {
                    if (categoryId === elem.parent) {
                        childCategories.push(elem.id);
                    }

                    if (categoryId === elem.id && elem.numberOfTasks > 0) {
                        quantityCategoriesThatHaveTasksAndNeedToDelete++;

                        if (elem.numberOfTasks === elem.numberOfCompletedTasks) {
                            quantityCompletedCategories++;
                        }
                    }
                });

                return childCategories;
            }, []);


            allCategories = allCategories.filter((elem) => {
                return !categoriesToSearch.includes(elem.id);
            });


            if (categoriesNeedToDelete.length !== 0) {
                deepDeleteCategories(categoriesNeedToDelete)
            }

        }

        //Apply result after recursion

        this.decreaseCompletedCategories(quantityCompletedCategories);
        this.decreaseQuantityOfCategoriesThatHaveTasks(quantityCategoriesThatHaveTasksAndNeedToDelete);
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

        this.setState({tasks: allTasks}, this.countTasksInCategory);
    },
    countTasksInCategory: function () {
        let allCategories = this.state.categories;

        let categoryIndex = allCategories.findIndex((elem) => {
            return elem.id === this.state.selectedCategoryId
        });

        if (allCategories[categoryIndex].numberOfTasks === null || allCategories[categoryIndex].numberOfTasks === 0) {
            this.increaseQuantityOfCategoriesThatHaveTasks();
        }

        allCategories[categoryIndex].numberOfTasks = allCategories[categoryIndex].numberOfTasks + 1;

        //This is magic and do not touch this
        this.setState({categories: allCategories}, this.checkCategoryProgress('deducting'));

    },
    increaseQuantityOfCategoriesThatHaveTasks: function () {
        this.setState({numberOfCategoriesThatHaveTasks: this.state.numberOfCategoriesThatHaveTasks + 1});

    },
    decreaseQuantityOfCategoriesThatHaveTasks: function (quantity = 1) {
        this.setState({numberOfCategoriesThatHaveTasks: this.state.numberOfCategoriesThatHaveTasks - quantity});
    },
    decreaseCompletedCategories: function (quantity) {
        this.setState({numberOfAllCompletedCategories: this.state.numberOfAllCompletedCategories - quantity});
    },
    componentWillMount: function () {
        this.initLocalStorage();
        this.setStateValuesFromLocalStorage();
    },
    initLocalStorage: function () {
        if (localStorage.length === 0) {
            let categories = JSON.stringify(exampleCategories);
            let tasks = JSON.stringify(exampleTasks);

            localStorage.setItem('categories', categories);
            localStorage.setItem('tasks', tasks);
        }
    },
    setStateValuesFromLocalStorage: function () {
        let categoriesFromLocalStorage = JSON.parse(localStorage.getItem('categories'));
        let tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
        let numberOfAllCompletedCategories = JSON.parse(localStorage.getItem('numberOfAllCompletedCategories'));

        this.setState({
            categories: categoriesFromLocalStorage,
            tasks: tasksFromLocalStorage,
            numberOfAllCompletedCategories: numberOfAllCompletedCategories
        });
    },
    updateLocalStorage: function () {
        let categories = JSON.stringify(this.state.categories);
        let tasks = JSON.stringify(this.state.tasks);
        let numberOfAllCompletedCategories = JSON.stringify(this.state.numberOfAllCompletedCategories);

        localStorage.setItem('categories', categories);
        localStorage.setItem('tasks', tasks);
        localStorage.setItem('numberOfAllCompletedCategories', numberOfAllCompletedCategories);
    },
    componentDidMount: function () {
        this.countCategoriesWithTasks();
    },
    countCategoriesWithTasks: function () {
        let allCategories = this.state.categories;

        let quantityOfCategoriesWithTasks = allCategories.reduce((sumTasks, category) => {

            if (category.numberOfTasks > 0) {
                sumTasks = sumTasks + 1;
            }
            return sumTasks;
        }, 0);


        this.setState({numberOfCategoriesThatHaveTasks: quantityOfCategoriesWithTasks});
    },
    componentDidUpdate: function () {
        this.updateLocalStorage();
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
    //BUT I Think that it is magic and do not touch this
    setCategoryProgress: function (checked) {
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

        this.setState({categories: allCategories}, this.checkCategoryProgress(operationTypeBefore));

    },
    checkCategoryProgress: function (operationTypeBefore) {


        let allCategories = this.state.categories;

        let categoryIndex = allCategories.findIndex((elem) => {
            return elem.id === this.state.selectedCategoryId
        });

        if (allCategories[categoryIndex].numberOfCompletedTasks === allCategories[categoryIndex].numberOfTasks && operationTypeBefore === 'adding') {
            this.countCompletedCategories('add');
        }
        else if (allCategories[categoryIndex].numberOfCompletedTasks === allCategories[categoryIndex].numberOfTasks - 1 && operationTypeBefore === 'deducting') {
            this.countCompletedCategories('deduct');
        }
    },
    countCompletedCategories: function (operation) {
        if (operation === 'add') {
            this.setState({numberOfAllCompletedCategories: this.state.numberOfAllCompletedCategories + 1})
        }
        else {
            this.setState({numberOfAllCompletedCategories: this.state.numberOfAllCompletedCategories - 1})
        }
    },
    editTaskDescription: function (taskId, taskDesc, taskName) {
        //Need to delete/refactor/change// No need
        let allTasks = this.state.tasks;

        allTasks.forEach((elem) => {
            if (elem.id === taskId) {
                elem.description = taskDesc;
                elem.name = taskName;
            }
        });

        this.setState({tasks: allTasks});
    },
    render: function () {

        let mainContentWrapperClassName = this.state.modalWindowOpened === false ? 'main-content-wrapper' : 'main-content-wrapper blurred';

        return (
            <div className="todo-list-app">
                    <div className={mainContentWrapperClassName}>
                        <NavBar updateFilter={this.updateFilter}
                                selectedCategoryId={this.state.selectedCategoryId}
                                numberOfCategoriesThatHaveTasks={this.state.numberOfCategoriesThatHaveTasks}
                                numberOfAllCompletedCategories={this.state.numberOfAllCompletedCategories}
                        />
                        <Switch>
                            <Route exact path='/'
                                   render={props =>
                                       <div className="main-box">
                                           <CategorysBox setSelectedCurrentCategory={this.setSelectedCurrentCategory}
                                                         selectedCategoryId={this.state.selectedCategoryId}
                                                         showModal={this.showModal}
                                                         categories={this.state.categories}
                                                         addCategory={this.addCategory}
                                                         {...props}
                                           />
                                           <TasksBox selectedCategoryId={this.state.selectedCategoryId}
                                                     filterOptions={this.state.filter}
                                                     tasks={this.state.tasks}
                                                     addTask={this.addTask}
                                                     showModal={this.showModal}
                                                     setSelectedCurrentTask={this.setSelectedCurrentTask}
                                                     setTaskProgress={this.setTaskProgress}
                                                     {...props}
                                           />
                                       </div>
                                   }
                            />
                            <Route path='/categories/:categoryId'
                                   render={props =>
                                       <div className="main-box">
                                           <CategorysBox setSelectedCurrentCategory={this.setSelectedCurrentCategory}
                                                         selectedCategoryId={this.state.selectedCategoryId}
                                                         showModal={this.showModal}
                                                         categories={this.state.categories}
                                                         addCategory={this.addCategory}
                                                         {...props}

                                           />
                                           <TasksBox selectedCategoryId={this.state.selectedCategoryId}
                                                     filterOptions={this.state.filter}
                                                     tasks={this.state.tasks}
                                                     addTask={this.addTask}
                                                     showModal={this.showModal}
                                                     setSelectedCurrentTask={this.setSelectedCurrentTask}
                                                     setTaskProgress={this.setTaskProgress}
                                                     {...props}
                                           />
                                       </div>
                                   }
                            />
                        </Switch>
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
                                                selectedTaskCompleted={this.state.selectedTaskCompleted}
                                                setTaskProgress={this.setTaskProgress}
                                                taskDescription={this.state.selectedTaskDescription}
                />
            </div>
        )
    }
});


export default ToDoListApp;


