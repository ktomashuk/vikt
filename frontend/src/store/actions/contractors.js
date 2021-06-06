import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';


export const getContractors = () => async dispatch => {

    try {
        const res = await axiosInstance.get('/core/contractors/');
        const data = res.data;
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_LOAD,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить список контрагентов!'
        });
    }
};

export const getContractorById = (contractorId) => async dispatch => {

    try {
        const res = await axiosInstance.get(`/contractors/${contractorId}/`);
        const data = res.data;
        dispatch({
            type: actionTypes.CONTRACTOR_DETAILS_LOAD,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные контрагента!'
        });
    }
};

export const editContractorData = (rowId, data) => async dispatch => {

    try {
        await axiosInstance.put(`/core/contractor-update/${rowId}/`, data);
        dispatch({
            type: actionTypes.CONTRACTOR_DETAILS_UPDATE,
            data: data,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Запись изменена!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ESTIMATE_ROW_EDIT_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно изменить запись!',
        });   
    }
};

export const addContractor = (data) => async dispatch => {
    try { 
        await axiosInstance.post(`/contractors/`, data);
        dispatch({
            type: actionTypes.CONTRACTOR_ADD_SUCCESS,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Контрагент добавлен!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно добавить контрагента!',
        });   
    }
};

export const deleteContractor = (rowId) => async dispatch => {

    try {
        await axiosInstance.delete(`/contractors/${rowId}`);
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Контрагент удален!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно удалить данные!',
        });   
    }
};

export const unloadContractors = () => dispatch => {
    
        dispatch({
            type: actionTypes.CONTRACTOR_DETAILS_UNLOAD,
        });
};