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

import {exampleCategories, exampleTasks} from './defaultValues';
import Navbar from './Navbar';


let ToDoListApp = React.createClass({
    getInitialState: function () {
        return {
            categories: exampleCategories,
            tasks: exampleTasks,
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
    addCategory: function (categoryName, parentCategory = null) {
        let newCategory = {
            id: Date.now(),
            name: categoryName,
            parent: parentCategory
        };

        let allCategories = this.state.categories;
        allCategories.unshift(newCategory);

        this.setState({categories: allCategories});
    },
    editCategory: function (categoryId, categoryName) {

    }
    addTask: function (taskName) {
        let newTask = {
            id: Date.now(),
            name: taskName,
            catid: this.state.selectedCategory
        };

        let allTasks = this.state.tasks;
        allTasks.unshift(newTask);

        this.setState({tasks: allTasks});
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
                                      showModal={this.showModal}
                                      categories={this.state.categories}
                                      addCategory={this.addCategory}
                        />
                        <TasksBox selectedCategory={this.state.selectedCategory}
                                  filterOptions={this.state.filter}
                                  tasks={this.state.tasks}
                                  addTask={this.addTask}
                        />
                    </div>
                </div>
                <ModalWindowCategoryAdd closeModal={this.closeModal}
                                        modalWindowAddOpened={this.state.modalWindowAddOpened}
                                        modalWindowOpened={this.state.modalWindowOpened}
                                        selectedCategory={this.state.selectedCategory}
                                        />
                <ModalWindowCategoryEdit closeModal={this.closeModal}
                                         modalWindowEditOpened={this.state.modalWindowEditOpened}
                                         modalWindowOpened={this.state.modalWindowOpened}
                                         selectedCategory={this.state.selectedCategory}
                                         selectedCategoryText={this.state.selectedCategoryText}/>
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

        let tasksAddContainerClassName = this.props.selectedCategory === '' ? 'tasks-box disabled' : 'tasks-box';
        return (
            <div className={tasksAddContainerClassName}>
                <div className="tasks-add-container">
                    <input className="task-add-input" type="text" placeholder="Enter task title"
                           value={this.state.taskInputText} onChange={this.setTaskText}
                           onKeyPress={this._handleKeyPress}/>
                    <input className="add-button" type="button" value="Add" onClick={this.addTaskHandler}/>
                </div>
                <TasksList tasks={this.props.tasks} selectedCategory={this.props.selectedCategory}
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
                        <input className="category-add-input" type="text" placeholder="Enter category title"
                               value={this.state.categoryEditedText} onChange={this.onChangeCategoryEditedText}/>
                        <input className="add-button" type="button" value="Save" onClick={this.display}/>
                        <input className="close-button" type="button" value="Close" onClick={this.closeCurrentModal}/>

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



