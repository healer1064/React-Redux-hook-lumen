import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

/*----------------------------------------------------------------------------
|   Author : Zilya
|   createStore function is used to link reducer to App component. After linked, we can use reducer.
------------------------------------------------------------------------------*/

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);