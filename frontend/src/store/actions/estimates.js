import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';


export const getEstimates = () => async dispatch => {

    try {
        const res = await axiosInstance.get('router/estimates/');
        const data = res.data
        dispatch({
            type: actionTypes.ESTIMATES_LOAD_SUCCESS,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ESTIMATES_LOAD_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
        });
    }
};

export const getEstimatesByObject = (object) => async dispatch => {

    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        const res = await axiosInstance.get(`est/est-obj/${object}/?ordering=system_number,ware_number`);
        const data = res.data
        dispatch({
            type: actionTypes.ESTIMATES_LOAD_SUCCESS,
            data: data,
            objId: object,
            system: 'Все',
        });
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ESTIMATES_LOAD_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
        });
    }
};


export const getEstimatesByObjectBySystem = (object, system) => async dispatch => {

    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        const res = await axiosInstance.get(`est/est-obj-sys/${object}/${system}/?ordering=system_number,ware_number`);
        const data = res.data
        dispatch({
            type: actionTypes.ESTIMATES_LOAD_SUCCESS,
            data: data,
            objId: object,
            system: system,
        });
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ESTIMATES_LOAD_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
        });
    }
};

export const getSystemsByObject = (object) => async dispatch => {

    try {
        const res = await axiosInstance.get(`est/systems-per-object/${object}/`);
        const data = res.data
        const uniqueSystems = [...new Set(data.map(item => item.system))];
        uniqueSystems.unshift('Все');
        dispatch({
            type: actionTypes.ESTIMATE_SYSTEMS_LOAD_SUCCESS,
            data: uniqueSystems,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ESTIMATE_SYSTEMS_LOAD_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные о системах!'
        });
    }
};

export const deleteEstimateRow = (rowId) => async dispatch => {

    try {
        await axiosInstance.delete(`router/estimates/${rowId}/`);
        dispatch({
            type: actionTypes.ESTIMATE_ROW_DELETE_SUCCESS,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Данные удалены!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно удалить данные!',
        });   
    }
};

export const addEstimateRow = (data) => async dispatch => {

    try {
        await axiosInstance.post(`router/estimates/`, data);
        dispatch({
            type: actionTypes.ESTIMATE_ROW_ADD_SUCCESS,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Запись добавлена!',
        });
        dispatch({
            type: actionTypes.ESTIMATES_REFRESH_NEEDED,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ESTIMATE_ROW_ADD_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно добавить запись!',
        });   
    }
};

export const editEstimateRow = (rowId, data) => async dispatch => {

    try {
        await axiosInstance.put(`est/est-update/${rowId}/`, data);
        dispatch({
            type: actionTypes.ESTIMATE_ROW_EDIT_SUCCESS,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Запись изменена!',
        }); 
        dispatch({
            type: actionTypes.ESTIMATES_REFRESH_NEEDED,
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

export const searchEstimatesByObject = (ware, objId) => async dispatch => {

    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        const res = await axiosInstance.get(`est/search-est-obj/${objId}/?search=${ware}&ordering=system_number,ware_number/`);
        const data = res.data
        dispatch({
            type: actionTypes.SEARCH_ESTIMATES,
            data: data,
        });
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ESTIMATES_LOAD_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
        });
    }
};

export const searchEstimatesByObjectBySystem = (ware, objId, system) => async dispatch => {

    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        const res = await axiosInstance.get(`est/search-est-obj-sys/${objId}/${system}?search=${ware}&ordering=system_number,ware_number/`);
        const data = res.data
        dispatch({
            type: actionTypes.SEARCH_ESTIMATES,
            data: data,
        });
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ESTIMATES_LOAD_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
        });
    }
};

export const unloadEstimates = () => async dispatch => {
    dispatch({
        type: actionTypes.ESTIMATES_DATA_UNLOAD,
    });
};