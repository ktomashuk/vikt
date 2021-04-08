import * as actionTypes from '../actions/actionTypes';

const initialState = {
    errorShow: false,
    errorMessage: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ERROR_SHOW:
            return {...state, errorShow: true, errorMessage: action.errorMessage};
        case actionTypes.ERROR_HIDE:
            return {...state, errorShow: false, errorMessage: ''};
        default:
            return state;
    }
};

export default reducer;