import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';

export const getUnits = () => async dispatch => {

    try {
        const res = await axiosInstance.get('router/units/');
        const data = res.data
        dispatch({
            type: actionTypes.UNITS_LOAD,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить единицы измерения!'
        });
    }
};

export const getObjects = () => async dispatch => {

    try {
        const res = await axiosInstance.get('router/objects/');
        const data = res.data
        dispatch({
            type: actionTypes.OBJECTS_LOAD_SUCCESS,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.OBJECTS_LOAD_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить список объектов!'
        });
    }
};

export const getObjectById = (id) => async dispatch => {

    try {
        const res = await axiosInstance.get(`router/objects/${id}/`);
        const data = res.data
        dispatch({
            type: actionTypes.OBJECTS_CHOOSE_OBJECT,
            data: data,
            id: id,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить объект!'
        });
    }
};

export const addObject = (data) => async dispatch => {
    try { 
        await axiosInstance.post(`router/objects/`, data);
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Объект добавлен!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно добавить объект!',
        });   
    }
};

export const deleteObject = (rowId) => async dispatch => {

    try {
        await axiosInstance.delete(`router/objects/${rowId}/`);
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Объект удален!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно удалить данные!',
        });   
    }
};

export const editObjectData = (id, data) => async dispatch => {

    try {
        await axiosInstance.put(`/core/edit-object/${id}/`, data);
        dispatch({
            type: actionTypes.OBJECTS_EDIT_OBJECT,
            data: data,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Запись изменена!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно изменить запись!',
        });   
    }
};

export const unloadObjects = () => dispatch => {
    dispatch({
        type: actionTypes.OBJECTS_UNLOAD,
    });
};

export const unloadObjectSystems = () => dispatch => {
    dispatch({
        type: actionTypes.OBJECTS_UNLOAD_SYSTEMS,
    });
};

export const getSystemsByObject = (id) => async dispatch => {

    try {
        const res = await axiosInstance.get(`/core/systems-by-object/${id}/`);
        const data = res.data;
        dispatch({
            type: actionTypes.OBJECTS_GET_SYSTEMS,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить список систем!',
        });   
    }
};

export const getSystemsByObjectAndAddAll = (id) => async dispatch => {

    try {
        const res = await axiosInstance.get(`/core/systems-by-object/${id}/`);
        const data = res.data;
        data.unshift({id: 0, acronym: 'Все', object: id});
        dispatch({
            type: actionTypes.OBJECTS_GET_SYSTEMS,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить список систем!',
        });   
    }
};

export const addSystem = (data) => async dispatch => {
    try { 
        await axiosInstance.post(`router/systems/`, data);
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Система добавлена!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно добавить систему!',
        });   
    }
};

export const editSystemData = (id, data) => async dispatch => {

    try {
        await axiosInstance.put(`/core/edit-system/${id}/`, data);
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Запись изменена!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно изменить запись!',
        });   
    }
};

export const deleteSystem = (Id) => async dispatch => {

    try {
        await axiosInstance.delete(`router/systems/${Id}/`);
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Система удалена!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно удалить систему!',
        });   
    }
};