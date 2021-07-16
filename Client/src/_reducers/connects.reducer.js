import { userConstants } from '../_constants';

export function connects(state = {}, action) {
    switch (action.type) {
        case userConstants.GETCONNECTLIST_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETCONNECTLIST_SUCCESS:
            return {
                connectList: action.connectList
            };
        case userConstants.GETCONNECTLIST_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}