import * as actionTypes from '../actions/actionTypes';
import axiosInstance from '../../axios/axiosServer';

export const addDevice = (data) => dispatch => {
    dispatch({
        type: actionTypes.CABLE_JOURNAL_DEVICE_ADD,
        data: data,
    });
};

export const removeDevice = (id) => dispatch => {
    dispatch({
        type: actionTypes.CABLE_JOURNAL_DEVICE_REMOVE,
        data: id,
    });
};

export const getJournalByObjectBySystem = (object, system) => async dispatch => {
    dispatch({
        type: actionTypes.INFO_LOADING_SPINNER_SHOW,
    });
    try {
        const res = await axiosInstance.get(`cable/cable-obj-sys/${object}/${system}?ordering=index`);
        const data = res.data
        dispatch({
            type: actionTypes.CABLE_JOURNAL_LOAD_SUCCESS,
            data: data,
            object: object,
            system: system,
        });
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
        });
    }
};

export const deleteCableRow = (rowId) => async dispatch => {

    try {
        await axiosInstance.delete(`router/cables/${rowId}`);
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

export const editCableRow = (rowId, data) => async dispatch => {

    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        await axiosInstance.put(`cable/cable-update/${rowId}/`, data);
        dispatch({
            type: actionTypes.CABLE_JOURNAL_ROWS_UPDATE,
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

export const addCableRow = (data) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        await axiosInstance.post(`router/cables/`, data);
        dispatch({
            type: actionTypes.CABLE_JOURNAL_ROWS_UPDATE,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Записи добавлены!',
        });
        
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно добавить запись!',
        });   
    }
};

export const exportJournalByObjectBySystem = (object, system) => async dispatch => {
    try {
        const res = await axiosInstance.get(`cable/export/${object}/${system}/`, {responseType: 'blob'});
        // stolen from https://stackoverflow.com/questions/56971035/download-file-functionality-for-react-and-python-app
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.xlsx');
        document.body.appendChild(link);
        link.click();
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно выполнить экспорт!'
        });
    }
};
