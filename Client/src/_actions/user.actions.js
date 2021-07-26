import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

/*----------------------------------------------------------------------------
|   Author : Zilya
|   All actions related user are here.
|   login, // login
|   logout, // logout
|   register, // register new user
|   editProfile, // change firstname and lastname
|   getAll, // get all users except me
|   disconnect, //disconnect partner with me
|   connect, // connect partner with me
|   delete: _delete // I didn't implement this function on meetup website.
------------------------------------------------------------------------------*/

export const userActions = {
    login, // login
    logout, // logout
    register, // register new user
    editProfile, // change firstname and lastname
    getAll, // get all users except me
    disconnect, //disconnect partner with me
    connect, // connect partner with me
    delete: _delete // I didn't implement this function on meetup website.
};

function login(email, password, from) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request());

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success() { return { type: userConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function editProfile(newData) {
    return dispatch => {
        dispatch(request());

        userService.editProfile(newData).
            then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                    dispatch(alertActions.success('Edit profile successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.EDIT_PROFILE_REQUEST } }
    function success(user) { return { type: userConstants.EDIT_PROFILE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.EDIT_PROFILE_FAILURE, error } }
}

function getAll(id) {
    return dispatch => {

        userService.getAll(id)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function disconnect(myId, otherId) {
    return dispatch => {
        dispatch(request());

        userService.disconnect(myId, otherId)
            .then(
                users => dispatch(success1()),
                error => dispatch(failure1(error.toString()))
            ).then(
                userService.getAll(myId)
                .then(
                    users => dispatch(success2(users)),
                    error => dispatch(failure2(error.toString()))
                )
            );
    };

    function request() { return { type: userConstants.DISCONNECT_REQUEST } }
    function success1() { return { type: userConstants.DISCONNECT_SUCCESS } }
    function failure1(error) { return { type: userConstants.DISCONNECT_FAILURE, error } }
    function success2(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure2(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function connect(myId, otherId) {
    return dispatch => {
        dispatch(request());

        userService.connect(myId, otherId)
            .then(
                users => dispatch(success1()),
                error => dispatch(failure1(error.toString()))
            ).then(
                userService.getAll(myId)
                    .then(
                        users => dispatch(success2(users)),
                        error => dispatch(failure2(error.toString()))
                    )
            );
    };

    function request() { return { type: userConstants.CONNECT_REQUEST } }
    function success1() { return { type: userConstants.CONNECT_SUCCESS } }
    function failure1(error) { return { type: userConstants.CONNECT_FAILURE, error } }
    function success2(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure2(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}