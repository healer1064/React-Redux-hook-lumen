import { userConstants } from '../_constants';

/*----------------------------------------------------------------------------
|   Author : Zilya
|   connects reducer store only status of api response. That means there is no special information.
------------------------------------------------------------------------------*/

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}