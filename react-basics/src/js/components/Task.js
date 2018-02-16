import React from 'react';
import createReactClass from 'create-react-class';
React.createClass = createReactClass;

let Task = React.createClass({
    onClickCurrentTask: function () {
        this.props.setSelectedCurrentTask(this.props.id, this.props.taskName, this.props.completed, this.props.taskDesc);
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

export default Task;
