import React from 'react';
import {Link} from 'react-router-dom';


const Header = ({}) => (
    <div className="header">
        <Link className="mylink" to='/'>
                Contact's app
        </Link>
    </div>

);

export default Header;