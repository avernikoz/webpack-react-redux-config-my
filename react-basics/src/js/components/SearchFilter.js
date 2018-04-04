import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    handleUpdateVisibilitityFilter: PropTypes.func.isRequired
};

class SearchFilter extends Component {
    state = {
        filterValue: ''
    };

    handleChange = (event) => {
        this.setState({
            filterValue: event.target.value
        });
        this.props.handleUpdateVisibilitityFilter(event.target.value);
    };

    render() {
        return (
            <input className="search-field" type="text" value={this.state.filterValue} onChange={this.handleChange}/>
        );
    }
}

SearchFilter.propTypes = propTypes;


export default SearchFilter;