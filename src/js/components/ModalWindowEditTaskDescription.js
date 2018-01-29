import React from 'react';
import createReactClass from 'create-react-class';
React.createClass = createReactClass;


let ModalWindowEditTaskDescription = React.createClass({
    getInitialState: function () {
        return ({
            inputText: '',
            checkboxStatus: false,
            inputNameTaskText: ''
        });
    },
    componentWillMount: function () {
        this.setState({checkboxStatus: this.props.selectedTaskCompleted})
    },
    componentWillReceiveProps: function (nextProps) {
        //Why if we include textarea that will work differently then other components
        this.setState({checkboxStatus: nextProps.selectedTaskCompleted});
        this.setState({inputNameTaskText: nextProps.selectedTaskText});

    },
    inputChangeHandler: function (event) {
        this.setState({inputText: event.target.value});
    },
    editTaskHandler: function () {

        this.props.editTaskDescription(this.props.selectedTaskId, this.state.inputText, this.state.inputNameTaskText);
        this.checkForChangesInTaskCompletedStatus();

        this.clearTextInput();
        this.closeCurrentModal();
    },
    checkForChangesInTaskCompletedStatus: function () {
        if (this.state.checkboxStatus !== this.props.selectedTaskCompleted) {
            this.applyTaskCompleteStatus();
        }
    },
    applyTaskCompleteStatus: function () {
        if (this.state.checkboxStatus) {
            this.props.setTaskProgress(true, this.props.selectedTaskId);
        }
        else {
            this.props.setTaskProgress(false, this.props.selectedTaskId);
        }
    },
    onTaskCompleteHandler: function (event) {
        this.setState({checkboxStatus: !this.state.checkboxStatus});
    },
    onTaskNameEditHandler: function (event) {
        this.setState({inputNameTaskText: event.target.value});
    },
    _handleKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.editTaskHandler()
        }
    },
    clearTextInput: function () {
        this.setState({inputText: ''});
        this.setState({inputNameTaskText: ''});

    },
    closeCurrentModal: function () {
        this.clearTextInput();
        this.props.closeModal('editTaskDescription');
    },
    render: function () {
        let modalWindowWrapperClassName = (this.props.modalWindowOpened && this.props.modalWindowTaskEditDescriptionOpened) ? 'modal-window-wrapper' : 'modal-window-wrapper disabled';
        let placeholderDescription = this.props.taskDescription === '' ? 'Enter task description...' : `Old task description : ${this.props.taskDescription}`;


        return (
            <div className={modalWindowWrapperClassName}>
                <div className="modal-window-large">
                    <div className="modal-buttons-container large">
                        <h1>{this.props.selectedTaskText}</h1>
                        <div className="task-checkbox-container">
                            <input className="task-checkbox" type="checkbox" checked={this.state.checkboxStatus}
                                   onChange={this.onTaskCompleteHandler}/>
                        </div>
                        <div className="modal-buttons-container">
                            <input className="category-add-input" type="text"
                                   placeholder={this.props.selectedTaskText}
                                   value={this.state.inputNameTaskText}
                                   onKeyPress={this._handleKeyPress}
                                   onChange={this.onTaskNameEditHandler}
                            />
                        </div>
                        <textarea className="task-textarea"
                                  placeholder={placeholderDescription}
                                  value={this.state.inputText}
                                  onChange={this.inputChangeHandler} onKeyPress={this._handleKeyPress}
                                  ref={(input) => this.nameInput = input}
                        />
                        <div className="modal-action-buttons-container">
                            <input className="add-button" type="button" value="Save"
                                   onClick={this.editTaskHandler}
                            />
                            <input className="close-button" type="button" value="Close"
                                   onClick={this.closeCurrentModal}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default ModalWindowEditTaskDescription;