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

export const editDevice = (id, data) => dispatch => {
    dispatch({
        type: actionTypes.CABLE_JOURNAL_DEVICE_EDIT,
        data: data,
        id: id,
    });
    dispatch({
        type: actionTypes.SNACK_SHOW,
        snackSeverity: 'warning',
        snackMessage: 'Запись изменена!',
    });
};

export const getJournalByObjectBySystem = (object, system) => async dispatch => {
    dispatch({
        type: actionTypes.INFO_LOADING_SPINNER_SHOW,
    });
    try {
        const res = await axiosInstance.get(`cable/cable-obj-sys/${object}/${system}/?ordering=index`);
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
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
        });
    }
};

export const deleteCableRow = (rowId) => async dispatch => {
    try {
        await axiosInstance.delete(`router/cables/${rowId}/`);
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
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
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
            await axiosInstance.post(`router/cables/`, chunkData);
        };
        } else 
        // If data is not an array
        {
            await axiosInstance.post(`router/cables/`, data);
        };
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
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
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

export const exportResistanceByObjectBySystem = (object, system) => async dispatch => {
    try {
        const res = await axiosInstance.get(`cable/export-isolation/${object}/${system}/`, {responseType: 'blob'});
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


export const exportCableJournalWord = (object, system, data) => async dispatch => {
    try {
        const res = await axiosInstance.post(`cable/export-isolation-word/${object}/${system}/`, data, {responseType: 'blob'});
        // stolen from https://stackoverflow.com/questions/56971035/download-file-functionality-for-react-and-python-app
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.docx');
        document.body.appendChild(link);
        link.click();
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно выполнить экспорт!'
        });
    }
};

export const setCableLength = (data) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        // Splitting cable data into chunks
        const cableLength = data.length;
        const dataLength = data.cables.length;
        const varianceType = data.variance;
        const oneCableLength = Number(cableLength) / Number(dataLength);
        let allRows=[];
        let chunkLengths = [];
        for (let i = 0; i < dataLength; i += 20) {
        const chunk = data.cables.slice(i, i + 20);
        const chunkLength = chunk.length;
        allRows.push(chunk);
        chunkLengths.push(chunkLength);
        };
        // Adding cable lengths to the database in chunks
        for (let i = 0; i < allRows.length; i++) {
            // Calculate the total length of all cables in a chunk
            const totalLength = (oneCableLength * Number(chunkLengths[i])).toFixed(0);
            // Construct a new object to add
            const chunkData = {
                length: totalLength,
                variance: varianceType,
                cables: allRows[i],
            };
            await axiosInstance.post(`cable/change-length/`, chunkData);
        };
        dispatch({
            type: actionTypes.CABLE_JOURNAL_ROWS_UPDATE,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Метраж обновлен!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно обновить метраж!',
        });   
    }
};

export const setCableResistance = (data) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        let allRows=[];
        const low = data.low;
        const high = data.high;
        const dataLength = data.cables.length;
        // Splitting cable data into chunks
        for (let i = 0; i < dataLength; i += 20) {
        const chunk = data.cables.slice(i, i + 20);
        allRows.push(chunk);
        };
        // Adding cable lengths to the database in chunks
        for (let i = 0; i < allRows.length; i++) {
            // Construct a new object to add
            const chunkData = {
                low: low,
                high: high,
                cables: allRows[i],
            };
            await axiosInstance.post(`cable/isolation-set/`, chunkData);
        };
        dispatch({
            type: actionTypes.CABLE_JOURNAL_ROWS_UPDATE,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Сопротивление обновлено!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно обновить сопротивление!',
        });   
    }
};