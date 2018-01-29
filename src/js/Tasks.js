import React from 'react';
import createReactClass from 'create-react-class';


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
                           setTaskProgress={this.props.setTaskProgress}
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
                            // && elem.completed === filterOptions.showCompletedTasks;

                        let showDone = filterOptions.showCompletedTasks ? (elem.completed === true || elem.completed === false) : elem.completed === false;

                        if (ourTaskInOurCategory && outTaskInSearchQuery && showDone) {
                            return <Task id={elem.id}
                                         key={elem.id}
                                         taskName={elem.name}
                                         completed={elem.completed}
                                         setSelectedCurrentTask={this.props.setSelectedCurrentTask}
                                         showModal={this.props.showModal}
                                         setTaskProgress={this.props.setTaskProgress}
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
    onTaskCompleteHandler: function (event) {
        if (event.target.checked){
            this.props.setTaskProgress(true, this.props.id);
        }
        else {
            this.props.setTaskProgress(false, this.props.id);
        }
    },
    render: function () {
        return (
            <div className="task" onClick={this.onClickCurrentTask}>
                <div className="task-checkbox-container">
                    <input className="task-checkbox" type="checkbox" checked={this.props.completed} onChange={this.onTaskCompleteHandler}/>
                    {this.props.taskName}
                </div>
                <i className="fas fa-edit fa-sm icon" onClick={this.onEditTaskDescriptionHandler}/>
            </div>
        )
    }
});


export {TasksBox, TasksList, Task}