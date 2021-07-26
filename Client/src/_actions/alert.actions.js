import { alertConstants } from '../_constants';
/*--------------------------------------------------------------------
|   Author : Zilya
|   All actions related alert are here.
|   Success : save message and state as success in store.
|   error : save message and state as error in store.
|   clear : remove message in store.
---------------------------------------------------------------------*/
export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}