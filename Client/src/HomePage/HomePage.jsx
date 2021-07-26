import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../_components/Header';

/*----------------------------------------------------------------------------
|   Author : Zilya
|   HomePage component
------------------------------------------------------------------------------*/

function HomePage() {
    const user = useSelector(state => state.authentication.user.user_info);

    return (
        <div className="col-lg-8 offset-lg-2">
            <Header/>
            <h1>Welcome {user.firstName} !</h1>
            <h3>This is meetup websites</h3>
        </div>
    );
}

export { HomePage };