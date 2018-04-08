import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setModalType, toggleModal } from '../store/actionCreators';
import { MODAL_TYPE_ADD } from '../constants/modalTypes';

const propTypes = {
    setModalType: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ setModalType, toggleModal }, dispatch)
);

class AddContactButton extends Component {
    handleClick = () => {
        this.props.setModalType(MODAL_TYPE_ADD);
    };
    render() {
        return (
            <div className="add-button-new-contact-container">
                <Link to="/add">
                    <button className="add-button-new-contact" onClick={this.handleClick}>new contact</button>
                </Link>
            </div>
        );
    }
}

AddContactButton.propTypes = propTypes;

export default connect(null, mapDispatchToProps)(AddContactButton);
