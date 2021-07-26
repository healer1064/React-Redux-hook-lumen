import React from 'react';
import { Link } from 'react-router-dom';

/*----------------------------------------------------------------------------
|   Author : Zilya
|   Header component is navbar commenly used in several components.
------------------------------------------------------------------------------*/

function Header() {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <Link className="navbar-brand" to="/">Home</Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/usersList">Users List</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/schedulesList">Schedules List</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/editProfile">Edit profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Logout</Link>
                </li>
            </ul>
        </nav>
    );
}

export { Header };