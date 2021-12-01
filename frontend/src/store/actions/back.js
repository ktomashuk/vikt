import * as actionTypes from '../actions/actionTypes';

export const backActivate = (backType) => dispatch => {
    dispatch({
        type: actionTypes.BACK_ACTIVATE,
        backType: backType,
    });
};

export const backClick = () => dispatch => {
    dispatch({
        type: actionTypes.BACK_CLICKED,
    });
};

export const backDeactivate = () => dispatch => {
    dispatch({
        type: actionTypes.BACK_DEACTIVATE,
    });
};
