import { scheduleConstants } from '../_constants';
import { scheduleService } from '../_services';

export const scheduleActions = {
    getSchedules
};

function getSchedules(myId, partnerId) {
    return dispatch => {
        dispatch(request());

        scheduleService.getSchedules(myId, partnerId)
            .then(
                scheduleList => dispatch(success(scheduleList)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: scheduleConstants.GETSCHEDULE_REQUEST } }
    function success(scheduleList) { return { type: scheduleConstants.GETSCHEDULE_SUCCESS, scheduleList } }
    function failure(error) { return { type: scheduleConstants.GETSCHEDULE_FAILURE, error } }
    
}