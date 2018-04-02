import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SearchFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            filterValue: event.target.value
        });
        this.props.handleUpdateVisibilitityFilter(event.target.value);
    }

    render () {
        return (
            <input className="search-field" type="text" value={this.state.filterValue} onChange={this.handleChange}/>
        );
    }


}


