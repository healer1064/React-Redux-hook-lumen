/*----------------------------------------------------------------------------
|   Author : Zilya
|   If user is logined, localStorage has user Item.
|   When apis are called, authHeader is used to add token to request' header.
------------------------------------------------------------------------------*/

export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}