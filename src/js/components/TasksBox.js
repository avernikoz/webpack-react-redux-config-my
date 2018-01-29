import React from 'react';
import createReactClass from 'create-react-class';
React.createClass = createReactClass;

import TasksList from './TasksList'

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
        // It works without router
        // let tasksAddContainerClassName = this.props.selectedCategoryId === '' ? 'tasks-box disabled' : 'tasks-box';

        let tasksAddContainerClassName = this.props.match.params.categoryId === undefined ? 'tasks-box disabled' : 'tasks-box';

        let categoryIdLink = +this.props.match.params.categoryId;



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
                           categoryIdInLink={categoryIdLink}
                />

            </div>
        )
    }
});

export default TasksBox;