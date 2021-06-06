import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pageName: '',
    infoMessage: '',
    showInfo: false,
    loadingSpinner: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INFO_MESSAGE_SHOW:
            return {...state, 
                showInfo: true, 
                infoMessage: action.messageText,
            };
        case actionTypes.INFO_MESSAGE_HIDE:
            return {...state, showInfo: false, };
        case actionTypes.INFO_PAGE_NAME_LOAD:
            return {...state, pageName: action.pageName};
        case actionTypes.INFO_LOADING_SPINNER_SHOW:
            return {...state, loadingSpinner: true};
        case actionTypes.INFO_LOADING_SPINNER_HIDE:
            return {...state, loadingSpinner: false};
        default:
            return state;
    }
};

export default reducer;