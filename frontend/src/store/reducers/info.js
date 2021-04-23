import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pageName: '',
    infoMessage: '',
    showInfo: false,
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
        default:
            return state;
    }
};

export default reducer;