import * as actionTypes from '../actions/actionTypes';

export const editStart = (editType, data) => dispatch => {
    dispatch({
        type: actionTypes.EDIT_START,
        data: data,
        editType: editType,
    });
};

export const editStop = () => dispatch => {
    dispatch({
        type: actionTypes.EDIT_STOP,
    });
};