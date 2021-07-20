import { scheduleConstants } from '../_constants';
import { scheduleService } from '../_services';

export const scheduleActions = {
    getSchedules,
    saveSchedule,
    cancelSchedule,
    updateSchedule
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

function saveSchedule(myId, partnerId, meetTime, title, description) {
    return dispatch => {
        dispatch(request());
        const newSchedule = {
            myId: myId,
            partnerId: partnerId,
            meetTime: meetTime,
            title: title,
            description: description
        }
        scheduleService.saveSchedules(newSchedule)
            .then(
                scheduleList => dispatch(success(scheduleList)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: scheduleConstants.SAVESCHEDULE_REQUEST } }
    function success(scheduleList) { return { type: scheduleConstants.SAVESCHEDULE_SUCCESS, scheduleList } }
    function failure(error) { return { type: scheduleConstants.SAVESCHEDULE_FAILURE, error } }
}

function cancelSchedule(id) {
    return dispatch => {
        dispatch(request(id));

        scheduleService.cancelSchedule(id)
            .then(
                scheduleList => dispatch(success(scheduleList)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: scheduleConstants.DELETE_REQUEST, id } }
    function success(scheduleList) { return { type: scheduleConstants.DELETE_SUCCESS, scheduleList } }
    function failure(id, error) { return { type: scheduleConstants.DELETE_FAILURE, id, error } }
}

function updateSchedule(id, meetTime, title, description) {
    return dispatch => {
        dispatch(request());
        const Schedule = {
            id: id,
            meetTime: meetTime,
            title: title,
            description: description
        }
        scheduleService.updateSchedule(Schedule)
            .then(
                scheduleList => dispatch(success(scheduleList)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: scheduleConstants.UPDATESCHEDULE_REQUEST } }
    function success(scheduleList) { return { type: scheduleConstants.UPDATESCHEDULE_SUCCESS, scheduleList } }
    function failure(error) { return { type: scheduleConstants.UPDATESCHEDULE_FAILURE, error } }
}
