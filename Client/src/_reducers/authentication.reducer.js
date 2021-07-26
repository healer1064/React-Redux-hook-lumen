import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

/*----------------------------------------------------------------------------
|   Author : Zilya
|   authentication reducer store data related to user.
------------------------------------------------------------------------------*/

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        case userConstants.EDIT_PROFILE_REQUEST:
            return {}
        case userConstants.EDIT_PROFILE_SUCCESS:
            return {
                user: action.user
            };
        default:
            return state
    }
}