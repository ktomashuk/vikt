import * as actionTypes from '../actions/actionTypes';

export const showInfo = (message) => dispatch => {
    dispatch({
        type: actionTypes.INFO_MESSAGE_SHOW,
        messageText: message,
    });
};

export const hideInfo = () => dispatch => {
    dispatch({
        type: actionTypes.INFO_MESSAGE_HIDE,
    });
};

export const loadPageName = (name) => dispatch => {
    dispatch({
        type: actionTypes.INFO_PAGE_NAME_LOAD,
        pageName: name,
    });
};