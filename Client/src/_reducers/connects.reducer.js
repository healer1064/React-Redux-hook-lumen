import { userConstants } from '../_constants';

/*----------------------------------------------------------------------------
|   Author : Zilya
|   connects reducer store only status of api response. That means there is no special information.
------------------------------------------------------------------------------*/

export function connects(state = {}, action) {
    switch (action.type) {
        case userConstants.DISCONNECT_REQUEST: 
            return {
                loading: true
            };
        case userConstants.DISCONNECT_SUCCESS:
            return {

            };
        case userConstants.DISCONNECT_FAILURE:
            return {
                error: action.error
            };
        case userConstants.CONNECT_REQUEST: 
            return {
                loading: true
            };
        case userConstants.CONNECT_SUCCESS:
            return {
                
            };
        case userConstants.CONNECT_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}