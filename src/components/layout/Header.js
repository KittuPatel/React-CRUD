import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const Header = props => {
    return (
        <nav className="navbar navbar-dark navbar-expand-sm bg-primary mb-3 py-0">
            <div className="container">
                <a href="/" className="navbar-brand"> {props.title}</a>
            </div>
            <div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">
                          <i className="fa fa-home" /> Home  
                        </Link>
                    </li>
                
                    <li className="nav-item">
                        <Link to="/contact/add" className="nav-link">
                        <i className="fa fa-plus" /> Add  
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">
                        <i className="fa fa-question" /> About  
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired
};

Header.defaultProps = {
    title: "My App"
};

export default Header;
