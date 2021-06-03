import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';


export const getContractors = () => async dispatch => {

    try {
        const res = await axiosInstance.get('/core/contractors/');
        const data = res.data;
        dispatch({
            type: actionTypes.CONTRACTOR_LIST_LOAD,
            data: data,
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
        const res = await axiosInstance.get(`/contractors/${contractorId}/`);
        const data = res.data;
        dispatch({
            type: actionTypes.CONTRACTOR_DETAILS_LOAD,
            data: data,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные контрагента!'
        });
    }
};