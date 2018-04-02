import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {

    handleClick = () => {
        this.props.handleSetModalType(this.props.value);
    };

    render() {
        return (
            <div className="add-button-new-contact-container">
                <button className="add-button-new-contact" onClick={this.handleClick}>new conctact</button>
            </div>
        );
    }
}