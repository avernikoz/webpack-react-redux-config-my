import React from 'react';
import createReactClass from 'create-react-class';

React.createClass = createReactClass;
import {withRouter} from 'react-router-dom'


// Как будет правильно - создать все свойства в компоненте, который находится на самом верхнем уровне,
// или объявить их в том компоненте, в котором они меняются, и передавать их с помощью-какого-нибудь метода

// Как правильно - проверять search input text через роутинг и location.search, или через state?

let Navbar = React.createClass({
    getInitialState: function () {
        return ({
            searchInputText: '',
            showCompletedTasks: false
        })
    },
    componentWillMount: function () {

        if (this.props.location.search) {
            const searchParams = new URLSearchParams(this.props.location.search);
            let convertedToBooleanValue = (searchParams.get('showdone') === 'true');

            this.setState({
                    searchInputText: searchParams.get('search'),
                    showCompletedTasks: convertedToBooleanValue
                },
                this.updateFilterValuesOnly);
        }
    },
    searchValuesToUrl: function () {
        const params = new URLSearchParams();

        params.set('search', this.state.searchInputText);
        params.set('showdone', this.state.showCompletedTasks);

        this.props.history.push(`?${params}`);
    },
    updateFilterValuesAndUrl: function () {
        this.props.updateFilter(this.state.searchInputText, this.state.showCompletedTasks);
        this.searchValuesToUrl();
    },
    updateFilterValuesOnly: function () {
        this.props.updateFilter(this.state.searchInputText, this.state.showCompletedTasks);
    },
    searchInTasks: function (event) {
        this.setState({searchInputText: event.target.value}, this.updateFilterValuesAndUrl);
    },
    showTasksOption: function (event) {
        if (event.target.checked) {
            this.setState({showCompletedTasks: true}, this.updateFilterValuesAndUrl);
        }
        else {
            this.setState({showCompletedTasks: false}, this.updateFilterValuesAndUrl);
        }
    },
    clearSearchInput: function () {
        this.setState({searchInputText: ''}, this.updateFilterValuesAndUrl);
    },

    render: function () {
        let SearchBoxActivity = this.props.selectedCategory === '';

        let quantityOfCategories = this.props.numberOfCategoriesThatHaveTasks;
        let quantityOfCompletedCategories = this.props.numberOfAllCompletedCategories;

        let progress = (quantityOfCompletedCategories * 100) / quantityOfCategories;


        let progressBarStyle = {
            width: progress + '%',
        };


        return (
            <div>
                <div className="upper-header">
                    <h1 className="app-title">To do list app</h1>
                    <div className="search-container">
                        <div className="checkbox-search-box">
                            <input id="showDone" type="checkbox" onChange={this.showTasksOption}
                                   checked={this.state.showCompletedTasks}
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
                    <div style={progressBarStyle} className="progress-bar"/>
                </div>
            </div>
        )
    }
});

export default withRouter(Navbar);