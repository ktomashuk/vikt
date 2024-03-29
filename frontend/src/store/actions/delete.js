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

export const cableDeleteAddAllItems = (deleteType, data) => dispatch => {
    dispatch({
        type: actionTypes.DELETE_CABLE_JOURNAL_ADD_ALL_ITEMS,
        data: data,
        deleteType: deleteType,
    });
};

export const cableDeleteSelected = (data) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        // Check if data type is an array
        if (Array.isArray(data))
        {
        // Splitting cable data into chunks of 20
        let allRows=[];
        const dataLength = data.length;
        for (let i = 0; i < dataLength; i += 20) {
        const chunk = data.slice(i, i + 20);
        allRows.push(chunk);
        };
        // Running a loop to add each chunk with a separate request
        const allRowsLength = allRows.length;
        for (let i = 0; i < allRowsLength; i++ ) {
            const chunkData = allRows[i];
            await axiosInstance.post(`/cable/cable-delete/`, chunkData);
        };
        } else 
        // If data is not an array
        {
            await axiosInstance.post(`/cable/cable-delete/`, data);
        };
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
        // Check if data type is an array
        if (Array.isArray(data))
        {
        // Splitting cable data into chunks of 20
        let allRows=[];
        const dataLength = data.length;
        for (let i = 0; i < dataLength; i += 20) {
        const chunk = data.slice(i, i + 20);
        allRows.push(chunk);
        };
        // Running a loop to add each chunk with a separate request
        const allRowsLength = allRows.length;
        for (let i = 0; i < allRowsLength; i++ ) {
            const chunkData = allRows[i];
            await axiosInstance.post(`/est/est-delete/`, chunkData);
        };
        } else 
        // If data is not an array
        {
            await axiosInstance.post(`/est/est-delete/`, data);
        };
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