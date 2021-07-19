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
        case scheduleConstants.SAVESCHEDULE_REQUEST:
            return {
            };
        case scheduleConstants.SAVESCHEDULE_SUCCESS:
            return {
                scheduleList: action.scheduleList.scheduleList
            };
        case scheduleConstants.SAVESCHEDULE_FAILURE:
            return {
                error: action.error
            };
        case scheduleConstants.DELETE_REQUEST:
            return {
                id: action.id,
                status: 'processing'
            };
        case scheduleConstants.DELETE_SUCCESS:
            return {
                scheduleList: action.scheduleList.scheduleList
            };
        case scheduleConstants.DELETE_FAILURE:
            return {
                id: action.id,
                error: action.error
            }; 
        default:
            return state
    }
}