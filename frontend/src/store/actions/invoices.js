import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';


export const getInvoices = () => async dispatch => {

    try {
        dispatch({
            type: actionTypes.INVOICES_LIST_SPINNER_SHOW,
        });
        const res = await axiosInstance.get('router/invoices/');
        const data = res.data
        dispatch({
            type: actionTypes.INVOICES_LOAD_SUCCESS,
            data: data,
        });
        dispatch({
            type: actionTypes.INVOICES_LIST_SPINNER_HIDE,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.INVOICES_LOAD_FAIL,
        });
        dispatch({
            type: actionTypes.INVOICES_LIST_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить счета!'
        });
    }
};

export const searchInvoices = (value) => async dispatch => {

    try {
        dispatch({
            type: actionTypes.INVOICES_LIST_SPINNER_SHOW,
        });
        const res = await axiosInstance.get(`inv/search-invoices/?search=${value}&ordering=id`);
        const data = res.data
        dispatch({
            type: actionTypes.INVOICES_LOAD_SUCCESS,
            data: data,
        });
        dispatch({
            type: actionTypes.INVOICES_LIST_SPINNER_HIDE,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.INVOICES_LOAD_FAIL,
        });
        dispatch({
            type: actionTypes.INVOICES_LIST_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно найти счета!'
        });
    }
};

export const chooseInvoice = (id) => async dispatch => {
    try {
        const res = await axiosInstance.get(`router/invoices/${id}/`);
        const data = res.data
        dispatch({
            type: actionTypes.INVOICES_CHOOSE_INVOICE,
            data: data,
            chosenId: id,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные счета!'
        });
    }
};

export const editInvoice = (id, data) => async dispatch => {

    try {
        await axiosInstance.put(`router/invoices/${id}/`, data);
        dispatch({
            type: actionTypes.INVOICES_EDIT_INVOICE,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Запись изменена!',
        }); 
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно изменить данные счета!',
        });   
    }
};

export const addInvoice = (data) => async dispatch => {

    try {
        await axiosInstance.post(`router/invoices/`, data);
        dispatch({
            type: actionTypes.INVOICES_REFRESH,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Счёт добавлен!',
        }); 
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно добавить счет!',
        });   
    }
};

export const recountInvoice = (id) => async dispatch => {
    try {
        const res = await axiosInstance.post(`inv/invoice-recount-all/${id}/`);
        const data = res.data[0];
        dispatch({
            type: actionTypes.INVOICES_INVOICE_RECOUNT,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно пересчитать счёт!'
        });
    }
};

export const invoiceUptickReceived = (id) => async dispatch => {

    try {
        await axiosInstance.post(`inv/invoice-uptick/${id}/`);
        dispatch({
            type: actionTypes.INVOICES_REFRESH,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно отметить получение!',
        });   
    }
};

export const invoiceDowntickReceived = (id) => async dispatch => {

    try {
        await axiosInstance.post(`inv/invoice-downtick/${id}/`);
        dispatch({
            type: actionTypes.INVOICES_REFRESH,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно убрать получение!',
        });   
    }
};

export const deleteInvoice = (id) => async dispatch => {

    try {
        await axiosInstance.delete(`router/invoices/${id}/`);
        dispatch({
            type: actionTypes.INVOICES_REFRESH,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Счёт удален!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно удалить счёт!'
        });
    }
};