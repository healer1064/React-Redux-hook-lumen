import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { connects } from './connects.reducer';
import { alert } from './alert.reducer';
import { schedule } from './schedule.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    connects,
    alert,
    schedule
});

export default rootReducer;