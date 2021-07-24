import * as actionTypes from '../actions/actionTypes';
import axiosInstance from '../../axios/axiosServer';

// Cable journal actions

export const cableDeleteAddItem = (type, data) => dispatch => {
    dispatch({
        type: actionTypes.DELETE_CABLE_JOURNAL_ITEM_ADD,
        data: data,
        deleteType: type,
    });
};

export const cableDeleteRemoveItem = (data) => dispatch => {
    dispatch({
        type: actionTypes.DELETE_CABLE_JOURNAL_ITEM_REMOVE,
        data: data,
    });
};

export const cableDeleteRemoveAll = () => dispatch => {
    dispatch({
        type: actionTypes.DELETE_CABLE_JOURNAL_REMOVE_ALL,
    });
};

export const cableDeleteAddAll = () => dispatch => {
    dispatch({
        type: actionTypes.DELETE_CABLE_JOURNAL_ADD_ALL,
    });
};

export const cableDeleteSelected = (data) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        await axiosInstance.post(`/cable/cable-delete/`, data);
        dispatch({
            type: actionTypes.CABLE_JOURNAL_ROWS_UPDATE,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Элементы удалены!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно удалить элементы!',
        });   
    }
};

// Estimates actions

export const estimateDeleteAddItem = (type, data) => dispatch => {
    dispatch({
        type: actionTypes.DELETE_ESTIMATES_ITEM_ADD,
        data: data,
        deleteType: type,
    });
};

export const estimateDeleteRemoveItem = (data) => dispatch => {
    dispatch({
        type: actionTypes.DELETE_ESTIMATES_ITEM_REMOVE,
        data: data,
    });
};

export const estimateDeleteRemoveAll = () => dispatch => {
    dispatch({
        type: actionTypes.DELETE_ESTIMATES_REMOVE_ALL,
    });
};

export const estimateDeleteAddAll = () => dispatch => {
    dispatch({
        type: actionTypes.DELETE_ESTIMATES_ADD_ALL,
    });
};

export const estimateDeleteSelected = (data) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        await axiosInstance.post(`/est/est-delete/`, data);
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Элементы удалены!',
        });
        dispatch({
            type: actionTypes.ESTIMATES_REFRESH_NEEDED,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно удалить элементы!',
        });   
    }
};