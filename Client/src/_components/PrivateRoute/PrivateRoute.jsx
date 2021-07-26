import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/*----------------------------------------------------------------------------
|   Author : Zilya
|   PrivateRoute component is used to check users' authentication
|   localStorage.getItem('user') is used to check users' authentication
|   If user is logined, localStorage has user Item.
|   If user is not logined, It always show login page.
------------------------------------------------------------------------------*/

function PrivateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('user')) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };