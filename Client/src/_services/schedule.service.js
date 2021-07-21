import config from 'config';
import { authHeader } from '../_helpers';

export const scheduleService = {
    getSchedules,
    getAllSchedules,
    saveSchedules,
    cancelSchedule,
    updateSchedule
};

function getSchedules(myId, partnerId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/scheduleList/${myId}/${partnerId}`, requestOptions).then(handleResponse);
}

function getAllSchedules(myId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/allScheduleList/${myId}`, requestOptions).then(handleResponse);
}

function saveSchedules(newSchedule) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(newSchedule)
    };
    return fetch(`${config.apiUrl}/api/schedule`, requestOptions).then(handleResponse);
}

function cancelSchedule(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/schedule/${id}`, requestOptions).then(handleResponse);
}

function updateSchedule(schedule) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(schedule)
    };
    return fetch(`${config.apiUrl}/api/schedule/${schedule.id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}