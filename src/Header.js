import React from 'react';
import './Header.css';

function Header({ remainingTasks, totalTasks }) {
    return (
        <header className="header">
            <h1>Ma liste de tâches</h1>
            <p>Tâches restantes : {remainingTasks} / {totalTasks}</p>
        </header>
    );
}

export default Header;