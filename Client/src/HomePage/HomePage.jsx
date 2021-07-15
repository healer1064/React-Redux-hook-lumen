import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';
import { Header } from '../_components/Header';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user.user_info);
    const dispatch = useDispatch();
    console.log(user);
    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }
    return (
        <div className="col-lg-8 offset-lg-2">
            <Header/>
            <h1>Welcome {user.firstName} !</h1>
            <h3>This is meetup websites</h3>
        </div>
    );
}

export { HomePage };