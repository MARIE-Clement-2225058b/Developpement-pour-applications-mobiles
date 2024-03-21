import React from 'react';
import './Footer.css';

function Footer({ searchInput, addTaskButton }) {
    return (
        <div className="footer">
            {searchInput}
            {addTaskButton}
        </div>
    );
}

export default Footer;