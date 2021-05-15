import * as actionTypes from '../actions/actionTypes';

export const showSnack = (message, severity) => dispatch => {
    dispatch({
        type: actionTypes.SNACK_SHOW,
        snackSeverity: severity,
        snackMessage: message,
    });
};

export const hideSnack = () => dispatch => {
    dispatch({
        type: actionTypes.SNACK_HIDE,
    });
};
