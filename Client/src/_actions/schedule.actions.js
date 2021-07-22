import { scheduleConstants } from '../_constants';
import { scheduleService } from '../_services';

export const scheduleActions = {
    getSchedules, // getting all schedules between I and selected partner.
    getAllSchedules, // getting all schedules between I and all partner.
    saveSchedule, // creating one schedules between I and selected partner.
    cancelSchedule, // deleting one schedules between I and selected partner.
    updateSchedule, // updating one schedules between I and selected partner.
};

function getSchedules(myId, partnerId) {
    return dispatch => {

        scheduleService.getSchedules(myId, partnerId)
            .then(
                scheduleList => dispatch(success(scheduleList)),
                error => dispatch(failure(error.toString()))
            );
    };

    function success(scheduleList) { return { type: scheduleConstants.GETSCHEDULE_SUCCESS, scheduleList } }
    function failure(error) { return { type: scheduleConstants.GETSCHEDULE_FAILURE, error } }
}

function getAllSchedules(myId) {
    return dispatch => {

        scheduleService.getAllSchedules(myId)
            .then(
                scheduleList => dispatch(success(scheduleList)),
                error => dispatch(failure(error.toString()))
            );
    };

    function success(scheduleList) { return { type: scheduleConstants.GETSCHEDULE_SUCCESS, scheduleList } }
    function failure(error) { return { type: scheduleConstants.GETSCHEDULE_FAILURE, error } }
}

function saveSchedule(myId, partnerId, meetTime, title, description) {
    return dispatch => {

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

    function success(scheduleList) { return { type: scheduleConstants.SAVESCHEDULE_SUCCESS, scheduleList } }
    function failure(error) { return { type: scheduleConstants.SAVESCHEDULE_FAILURE, error } }
}

function cancelSchedule(id) {
    return dispatch => {

        scheduleService.cancelSchedule(id)
            .then(
                scheduleList => dispatch(success(scheduleList)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function success(scheduleList) { return { type: scheduleConstants.DELETE_SUCCESS, scheduleList } }
    function failure(id, error) { return { type: scheduleConstants.DELETE_FAILURE, id, error } }
}

function updateSchedule(id, meetTime, title, description) {
    return dispatch => {

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

    function success(scheduleList) { return { type: scheduleConstants.UPDATESCHEDULE_SUCCESS, scheduleList } }
    function failure(error) { return { type: scheduleConstants.UPDATESCHEDULE_FAILURE, error } }
}