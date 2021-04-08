import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    username: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            return {...state, isAuthenticated: true, username: action.username};
        case actionTypes.AUTH_FAIL:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.LOGOUT_SUCCESS:
            return {...state, isAuthenticated: false, username: 'anon'};
        case actionTypes.LOGOUT_FAIL:
            return state
        default:
            return state;
    }
};

export default reducer;