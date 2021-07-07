import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';


export const getInvoices = () => async dispatch => {

    try {
        const res = await axiosInstance.get('router/invoices/');
        const data = res.data
        dispatch({
            type: actionTypes.INVOICES_LOAD_SUCCESS,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.INVOICES_LOAD_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
        });
    }
};