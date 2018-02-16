import React from 'react';
import createReactClass from 'create-react-class';
React.createClass = createReactClass;

import Task from './Task';

// Вот тут мне кажется можно проще
// Мб componentWillReceiveProps ???

let TasksList = React.createClass({
    render: function () {
        let filterOptions = this.props.filterOptions;

        return (
            <div className="tasks-list">
                {
                    this.props.tasks.map((elem) => {
                        let ourTaskInOurCategory = (elem.catid === this.props.categoryIdInLink);
                        let outTaskInSearchQuery = (elem.name.toLowerCase().indexOf(filterOptions.filterText) !== -1);
                        let showDone = filterOptions.showCompletedTasks ? (elem.completed === true || elem.completed === false) : elem.completed === false;

                        if (ourTaskInOurCategory && outTaskInSearchQuery && showDone) {
                            return <Task id={elem.id}
                                         key={elem.id}
                                         taskName={elem.name}
                                         completed={elem.completed}
                                         taskDesc={elem.description}
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

export default TasksList;