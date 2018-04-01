import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,

};

const Concact = ({name, phoneNumber, imgUrl}) => (
    <div className="contact">
        <div className="contact-image">
            <img src={imgUrl} alt="image" height="50px" width="50px"/>
        </div>
        <div>
            <div className="contact-image"> {name} </div>
            <div className="contact-number"> {phoneNumber} </div>
        </div>
    </div>
);

Concact.propTypes = propTypes;

export default Concact;