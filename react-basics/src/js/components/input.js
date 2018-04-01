import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class FilterInput extends Component {

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
        this.props.handleUpdateVisibilitityFulter(event.target.value);
    }

    render () {
        return (
            <input type="text" value={this.state.filterValue} onChange={this.handleChange}/>
        );
    }


}


