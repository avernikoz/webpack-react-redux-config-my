import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {filterContacts} from '../store/actionCreators';

const propTypes = {
    filterContacts: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({filterContacts},dispatch)
);

class SearchFilter extends Component {
    state = {
        filterValue: ''
    };

    componentWillMount = () => {
        if (this.props.location.search) {
            console.log(this.props.location);

            const searchParams = new URLSearchParams(this.props.location.search);
            const filterValueFromUrl = searchParams.get('search');

            this.setState({filterValue: filterValueFromUrl});
            this.updateFilterValueForAllComponents(filterValueFromUrl);
            console.log('will mount event');

        }
    };

    handleChange = (event) => {
        this.setState({
            filterValue: event.target.value
        },this.searchValuesToUrl);
        this.updateFilterValueForAllComponents(event.target.value);
    };

    updateFilterValueForAllComponents = (filterValue) => {
        this.props.filterContacts(filterValue);
    };

    searchValuesToUrl = () => {
        const params = new URLSearchParams();
        params.set('search', this.state.filterValue);
        this.props.history.push(`?${params}`);
    };

    render() {
        return (
            <input className="search-field" type="text" value={this.state.filterValue} onChange={this.handleChange}/>
        );
    }
}

SearchFilter.propTypes = propTypes;


export default withRouter(connect(null, mapDispatchToProps)(SearchFilter));