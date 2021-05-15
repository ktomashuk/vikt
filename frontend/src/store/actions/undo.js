import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';


export const undoDataSave = (undoType, undoData, undoId) => dispatch => {

    dispatch({
        type: actionTypes.UNDO_DATA_SAVE,
        undoType: undoType,
        undoData: undoData,
        undoId: undoId,
    });
};

export const undoEstimateRowDelete = (undoData) => async dispatch => {
    try {
        const body = JSON.stringify(undoData);
        const res = await axiosInstance.post(`/estimates/`, body);
        const data = res.data
        dispatch({
            type: actionTypes.UNDO_ESTIMATE_ROW_DELETE,
            data: data,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Данные восстановлены!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно отменить удаление!'
        });
    }
}


export const undoEstimateRowEdit = (rowId, undoData) => async dispatch => {
    try {
        const body = JSON.stringify(undoData);
        const res = await axiosInstance.put(`/est-update/${rowId}/`, body);
        const data = res.data
        dispatch({
            type: actionTypes.UNDO_ESTIMATE_ROW_EDIT,
            data: data,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Изменения отменены!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно отменить удаление!'
        });
    }
}