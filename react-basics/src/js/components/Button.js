import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {filterContacts} from '../store/actionCreators'

const propTypes = {
    handleSetModalType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    inasdasd: state.inputFilterText
});

// const mapDispatchToProps = dispatch => (
//     bindActionCreators({filterContacts}, dispatch)
// );
const mapDispatchToProps = dispatch => ({
    filterContacts: inputText => dispatch(filterContacts(inputText))
});

class Button extends Component {

    handleClick = () => {
        this.props.handleSetModalType(this.props.value);
        this.props.filterContacts(this.props.value);

        console.log(this.props.inasdasd);


    };

    render() {
        return (
            <div className="add-button-new-contact-container">
                <div>{this.props.inasdasd}</div>
                <button className="add-button-new-contact" onClick={this.handleClick}>new conctact</button>
            </div>
        );
    }
}

Button.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Button);