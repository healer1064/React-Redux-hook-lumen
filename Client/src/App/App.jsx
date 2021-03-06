import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components/PrivateRoute';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { UsersListPage } from '../UsersListPage';
import { SchedulesListPage } from '../SchedulesListPage';
import { EditProfilePage } from '../EditProfilePage';
import { CallSchedulePage } from '../CallSchedulePage';

/*--------------------------------------------------------------------
|   Author : Zilya
|   App is entry point of front pages.
|   Route is defined here.
|   Whenever location changes, displayed alert will be disappeared.
---------------------------------------------------------------------*/
function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-md-12 offset-md-0">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/usersList" component={UsersListPage} />
                            <Route path="/schedulesList" component={SchedulesListPage} />
                            <Route path="/editProfile" component={EditProfilePage} />
                            <Route path="/callSchedule" component={CallSchedulePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export { App };