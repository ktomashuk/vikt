import authReducer from './reducers/auth';
import errorReducer from './reducers/errors';
import invoiceReducer from './reducers/invoices';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
    auth: authReducer,
    err: errorReducer,
    inv: invoiceReducer,
});

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;