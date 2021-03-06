import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import { Header } from '../_components/Header';
import { history } from '../_helpers';

/*----------------------------------------------------------------------------
|   Author : Zilya
|   UsersListPage component
|   In this page, all users except for logined user are showed.
------------------------------------------------------------------------------*/

function UsersListPage() {
    // users : users list.
    // user : logined user.
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user.user_info);
    const dispatch = useDispatch();

    useEffect(() => {
        if(users.error === 'Unauthorized') //if token is expaired, log out.
            history.push('/logout');
        const interval = setInterval(() => {
            dispatch(userActions.getAll(user.id));
        }, 1000);
        return () => clearInterval(interval);
    }, [users]);
    
    function handleDisconnect(id) {
        //send message to server with parameter (myId, otherId)
        dispatch(userActions.disconnect(user.id, id));
    }

    function handleConnect(id) {
        //send message to server with parameter (myId, otherId)
        dispatch(userActions.connect(user.id, id));
    }
    
    return (
        <div className="col-lg-12 offset-lg-0">
            <Header/>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <ul className="list-group">
                    {users.items.map((user, index) => 
                        <li key={user.id} className="list-group-item list-group-item-dark">
                            <div className="row">
                                <div className="col-lg-4 col-sm-4 col-md-4 align-self-center">{user.firstName + ' ' + user.lastName}</div>
                                <div className="col-lg-4 col-sm-4 col-md-4 align-self-center">{user.email}</div>
                                <div className="col-lg-4 col-sm-4 col-md-4 align-self-center">
                                    {user.connect === 1? (
                                        <>
                                            <button className="btn btn-outline-primary btn-block" onClick={()=>handleDisconnect(user.id)}>disconnect</button>
                                            <button className="btn btn-outline-primary btn-block">
                                                <Link to={
                                                {     
                                                    pathname: '/callSchedule',
                                                    user: user
                                                }
                                                }>scheduling</Link>
                                            </button>
                                        </>
                                    ): (
                                        <>
                                            <button className="btn btn-outline-primary btn-block" onClick={()=>handleConnect(user.id)}>connect</button>
                                            <button className="btn btn-block" disabled>scheduling</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            }
        </div>
    );
}

export { UsersListPage };