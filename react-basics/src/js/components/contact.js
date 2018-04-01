import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    name: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,

};

const Concact = ({name, phoneNumber, imgUrl}) => (
    <div className="contactWrapper">
        <div className="image">
            <img src={imgUrl} alt="image"/>
        </div>
        <div className="dataWrapper">
            <div className="name"> {name} </div>
            <div className="phoneNumber"> {phoneNumber} </div>
        </div>
    </div>
);

Concact.propTypes = propTypes;

export default Concact;