import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';

export const getEstimatePurchasesByObject = (object) => async dispatch => {

    try {
        const res = await axiosInstance.get(`purchases/estimate-purchases-by-object/${object}/`);
        const data = res.data
        dispatch({
            type: actionTypes.PURCHASES_GET_ESTIMATES_BY_OBJECT,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные закупки!'
        });
    }
};

export const getNonEstimatePurchasesByObject = (object) => async dispatch => {

    try {
        const res = await axiosInstance.get(`purchases/nonestimate-purchases-by-object/${object}/`);
        const data = res.data
        dispatch({
            type: actionTypes.PURCHASES_GET_NONESTIMATES_BY_OBJECT,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные закупки!'
        });
    }
};

export const getPurchasesByInvoice = (invoiceId) => async dispatch => {

    try {
        const res = await axiosInstance.get(`purchases/purchases-by-invoice/${invoiceId}/?ordering=id`);
        const data = res.data
        dispatch({
            type: actionTypes.PURCHASES_GET_PURCHASES_BY_INVOICE,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные закупки по счёту!'
        });
    }
};

export const getPurchasesByEstimateItem = (itemId) => async dispatch => {

    try {
        const res = await axiosInstance.get(`purchases/purchases-by-estimate-item/${itemId}/`);
        const data = res.data
        dispatch({
            type: actionTypes.PURCHASES_GET_PURCHASES_BY_ESTIMATE_ITEM,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить закупки по позиции!'
        });
    }
};

export const getPurchasesByNonEstimateItem = (itemId) => async dispatch => {

    try {
        const res = await axiosInstance.get(`purchases/purchases-by-nonestimate-item/${itemId}/`);
        const data = res.data
        dispatch({
            type: actionTypes.PURCHASES_GET_PURCHASES_BY_NONESTIMATE_ITEM,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить закупки по позиции!'
        });
    }
};

export const getPurchasesNotAssignedAndReceivedCount = () => async dispatch => {

    try {
        const res = await axiosInstance.get(`purchases/purchases-count-not-assigned-received/`);
        const data = res.data
        dispatch({
            type: actionTypes.PURCHASES_GET_NOT_ASSIGNED_AND_RECEIVED_COUNT,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить количество не распределенных и отгруженных позиций!'
        });
    }
};

export const purchaseCheckReceived = (id) => async dispatch => {

    try {
        await axiosInstance.post(`purchases/purchases-check-received/${id}/`);
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно отгрузить товар!'
        });
    }
};

export const purchaseUncheckReceived = (id) => async dispatch => {

    try {
        await axiosInstance.post(`purchases/purchases-uncheck-received/${id}/`);
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно отменить отгрузку товара!'
        });
    }
};

export const addPurchase = (data) => async dispatch => {

    try {
        await axiosInstance.post(`router/purchases/`, data);
        dispatch({
            type: actionTypes.PURCHASES_REFRESH,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Позиция добавлена!',
        }); 
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно добавить позицию в счёт!'
        });
    }
};

export const editPurchase = (id, data) => async dispatch => {

    try {
        await axiosInstance.put(`router/purchases/${id}/`, data);
        dispatch({
            type: actionTypes.PURCHASES_REFRESH,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Позиция изменена!',
        }); 
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно изменить позицию в счете!'
        });
    }
};

export const deletePurchase = (id) => async dispatch => {

    try {
        await axiosInstance.post(`purchases/delete-purchase/${id}/`);
        dispatch({
            type: actionTypes.PURCHASES_REFRESH,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Данные удалены!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно удалить позицию из счёта!'
        });
    }
};

export const getPurchaseById = (id) => async dispatch => {

    try {
        const res = await axiosInstance.get(`router/purchases/${id}/`);
        const data = res.data;
        dispatch({
            type: actionTypes.PURCHASES_GET_PURCHASE_DATA_BY_ID,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно редактировать позицию!'
        });
    }
};

export const getPurchaseReferenceById = (id) => async dispatch => {

    try {
        const res = await axiosInstance.get(`purchases/purchase-reference-by-id/${id}/`);
        const data = res.data;
        dispatch({
            type: actionTypes.PURCHASES_GET_REFERENCES,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно получить привязку!'
        });
    }
};

export const deletePurchasesByInvoice = (id) => async dispatch => {

    try {
        await axiosInstance.post(`purchases/purchases-delete-by-invoice/${id}/`);
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Счет удален!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно удалить счёт!'
        });
    }
};

export const unloadPurchaseReference = () => dispatch => {
    
    dispatch({
        type: actionTypes.PURCHASES_UNLOAD_REFERENCES,
    });
};

export const unloadPurchases = () => dispatch => {
    
    dispatch({
        type: actionTypes.PURCHASES_UNLOAD_EVERYTHING,
    });
};

export const changePurchaseQuantity = (data) => async dispatch => {

    try {
        await axiosInstance.post(`purchases/est-purchase-change-quantity/`, data);
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно изменить кол-во в закупке!'
        });
    }
};

export const changeShippedQuantity = (data) => async dispatch => {

    try {
        await axiosInstance.post(`purchases/purchase-shipped-change/`, data);
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно изменить кол-во в закупке!'
        });
    }
};