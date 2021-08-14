import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';

export const exportStart = (type, data) => dispatch => {
    dispatch({
        type: actionTypes.EXPORT_START,
        exportType: type,
        exportData: data,
    });
};

export const exportStop = () => dispatch => {
    dispatch({
        type: actionTypes.EXPORT_STOP,
    });
};

export const getSignersByObject = (object) => async dispatch => {
    const res = await axiosInstance.get(`core/representatives-by-object/${object}/`);
    const data = res.data
    dispatch({
        type: actionTypes.EXPORT_GET_SIGNERS,
        signers: data,
    });
};

export const exportCableJournalWord = (data) => async dispatch => {
    try {
        const res = await axiosInstance.post(`cable/export-isolation-word/`, data, {responseType: 'blob'});
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
