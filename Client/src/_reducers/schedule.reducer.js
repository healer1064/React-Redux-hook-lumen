import { scheduleConstants } from '../_constants';

export function schedule(state = {}, action) {
    switch (action.type) {
        case scheduleConstants.GETSCHEDULE_REQUEST:
            return {
            };
        case scheduleConstants.GETSCHEDULE_SUCCESS:
            return {
                scheduleList: action.scheduleList.scheduleList
            };
        case scheduleConstants.GETSCHEDULE_FAILURE:
            return {
                error: action.error
            }; 
        default:
            return state
    }
}