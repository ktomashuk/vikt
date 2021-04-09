import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {...state, 
                isAuthenticated: true, 
                username: action.username,
                firstName: action.firstName,
                lastName: action.lastName,
            };
        case actionTypes.LOGIN_SUCCESS:
            return {...state, isAuthenticated: true};
        case actionTypes.AUTH_FAIL:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.LOGOUT_SUCCESS:
            return {...state, isAuthenticated: false, username: 'anon'};
        case actionTypes.LOGOUT_FAIL:
            return state
        case actionTypes.PROFILE_LOAD_SUCCESS:
            return {...state, 
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
            };
        case actionTypes.PROFILE_CHANGE_SUCCESS:
            return {...state, 
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
            };
        default:
            return state;
    }
};

export default reducer;