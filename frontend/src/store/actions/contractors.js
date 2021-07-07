import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';


export const getContractorTypes = () => async dispatch => {

    try {
        const res = await axiosInstance.get('/core/contractor-types/');
        const data = res.data;
        dispatch({
            type: actionTypes.CONTRACTOR_TYPES_LOAD,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить типы контрагентов!'
        });
    }
};

export const getContractors = () => async dispatch => {

    try {
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_SPINNER_SHOW,
        });
        const res = await axiosInstance.get('/core/contractors/?ordering=name');
        const data = res.data;
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_LOAD,
            data: data,
        });
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_SPINNER_HIDE,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить список контрагентов!'
        });
    }
};

export const getContractorsByType = (type) => async dispatch => {

    try {
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_SPINNER_SHOW,
        });
        const res = await axiosInstance.get(`/core/contractors-by-type/${type}?ordering=name`);
        const data = res.data;
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_LOAD,
            data: data,
        });
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_SPINNER_HIDE,
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
        dispatch({
            type: actionTypes.CONTRACTOR_DATA_SPINNER_SHOW,
        });
        const res = await axiosInstance.get(`router/contractors/${contractorId}/`);
        const data = res.data;
        dispatch({
            type: actionTypes.CONTRACTOR_DETAILS_LOAD,
            data: data,
        });
        dispatch({
            type: actionTypes.CONTRACTOR_DATA_SPINNER_HIDE,
        });

    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные контрагента!'
        });
    }
};

export const searchContractors = (searchValue) => async dispatch => {

    try {
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_SPINNER_SHOW,
        });
        const res = await axiosInstance.get(`core/search-contractors/?search=${searchValue}&ordering=name`);
        const data = res.data
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_LOAD,
            data: data,
        });
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_SPINNER_HIDE,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
        });
    }
};

export const searchContractorsByType = (searchValue, type) => async dispatch => {

    try {
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_SPINNER_SHOW,
        });
        const res = await axiosInstance.get(`core/search-contractors-by-type/${type}?search=${searchValue}&ordering=name`);
        const data = res.data
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_LOAD,
            data: data,
        });
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_SPINNER_HIDE,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
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
        await axiosInstance.post(`router/contractors/`, data);
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
        await axiosInstance.delete(`router/contractors/${rowId}/`);
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

export const getRepresentativesByContractor = (contractorId) => async dispatch => {

    try {
        const res = await axiosInstance.get(`core/representatives-by-contractor/${contractorId}/`);
        const data = res.data;
        dispatch({
            type: actionTypes.CONTRACTOR_REPRESENTATIVES_DATA_LOAD,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить список сотрудников!'
        });
    }
};

export const addRepresentative = (data) => async dispatch => {
    try { 
        await axiosInstance.post(`router/representatives/`, data);
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Сотрудник добавлен!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно добавить сотрудника!',
        });   
    }
};

export const deleteRepresentative = (rowId) => async dispatch => {

    try {
        await axiosInstance.delete(`router/representatives/${rowId}/`);
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Сотрудник удален!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно удалить данные!',
        });   
    }
};

export const editRepresentative = (rowId, data) => async dispatch => {

    try {
        await axiosInstance.put(`/core/representative-update/${rowId}/`, data);
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