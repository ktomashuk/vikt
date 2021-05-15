import authReducer from './reducers/auth';
import errorReducer from './reducers/errors';
import invoiceReducer from './reducers/invoices';
import infoReducer from './reducers/info';
import estimatesReucer from './reducers/estimates';
import coreReducer from './reducers/core';
import undoReducer from './reducers/undo';
import snackReduer from './reducers/snack';
import searchReducer from './reducers/search';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
    auth: authReducer,
    err: errorReducer,
    inv: invoiceReducer,
    info: infoReducer,
    est: estimatesReucer,
    core: coreReducer,
    undo: undoReducer,
    snack: snackReduer,
    srch: searchReducer,
});

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;