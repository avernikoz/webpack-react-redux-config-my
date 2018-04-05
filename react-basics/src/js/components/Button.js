import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setModalType, toggleModal} from '../store/actionCreators';
import {MODAL_TYPE_ADD} from "../constants/modalTypes";

const propTypes = {
    setModalType: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({setModalType, toggleModal}, dispatch)
);
// const mapDispatchToProps = dispatch => ({
//     filterContacts: inputText => dispatch(filterContacts(inputText))
// });

class Button extends Component {

    handleClick = () => {
        this.props.setModalType(MODAL_TYPE_ADD);
        this.props.toggleModal();
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

export default connect(null, mapDispatchToProps)(Button);