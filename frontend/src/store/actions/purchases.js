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