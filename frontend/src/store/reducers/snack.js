import * as actionTypes from '../actions/actionTypes';

const initialState = {
    snackSeverity: '',
    snackMessage: '',
    showSnack: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SNACK_SHOW:
            return {...state, 
                showSnack: true, 
                snackSeverity: action.snackSeverity,
                snackMessage: action.snackMessage,
            };
        case actionTypes.SNACK_HIDE:
            return {...state, showSnack: false, };
        default:
            return state;
    }
};

export default reducer;