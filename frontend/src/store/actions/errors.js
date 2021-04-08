import * as actionTypes from '../actions/actionTypes';

export const showError = (message) => dispatch => {
    dispatch({
        type: actionTypes.ERROR_SHOW,
        errorMessage: message,
    });
};

export const hideError = () => dispatch => {
    dispatch({
        type: actionTypes.ERROR_HIDE,
    });
};