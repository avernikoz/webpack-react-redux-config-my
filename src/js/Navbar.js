import React from 'react';
import createReactClass from 'create-react-class';
React.createClass = createReactClass;


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
                            <input id="showDone" type="checkbox" onChange={this.showTasksOption} checked={this.state.showCompletedTasks}
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
                <div className="progress-bar-container">
                    <div className="progress-bar"/>
                </div>
            </div>
        )
    }
});

export default Navbar;