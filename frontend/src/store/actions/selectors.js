import * as actionTypes from '../actions/actionTypes';

export const switchToDeleting = () => dispatch => {
    dispatch({
        type: actionTypes.SWITCH_TO_DELETING,
    });
};

export const switchToLength = () => dispatch => {
    dispatch({
        type: actionTypes.SWITCH_TO_LENGTH,
    });
};

export const switchToResistance = () => dispatch => {
    dispatch({
        type: actionTypes.SWITCH_TO_RESISTANCE,
    });
};