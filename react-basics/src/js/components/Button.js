import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    handleSetModalType: PropTypes.func.isRequired
};

class Button extends Component {

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

Button.propTypes = propTypes;

export default Button