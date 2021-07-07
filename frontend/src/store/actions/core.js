import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';


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