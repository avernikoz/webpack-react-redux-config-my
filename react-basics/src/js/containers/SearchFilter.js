import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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

    handleChange = (event) => {
        this.setState({
            filterValue: event.target.value
        });
        this.props.filterContacts(event.target.value);
    };

    render() {
        return (
            <input className="search-field" type="text" value={this.state.filterValue} onChange={this.handleChange}/>
        );
    }
}

SearchFilter.propTypes = propTypes;


export default connect(null, mapDispatchToProps)(SearchFilter);