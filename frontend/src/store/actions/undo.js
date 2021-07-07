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

export const undoClear = () => dispatch => {
    dispatch({
        type: actionTypes.UNDO_CLEAR,
    });
};

export const undoEstimateRowDelete = (undoData) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        const body = JSON.stringify(undoData);
        await axiosInstance.post(`router/estimates/`, body);
        dispatch({
            type: actionTypes.UNDO_CLEAR,
        });
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
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
};

export const undoEstimateRowEdit = (rowId, undoData) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        const body = JSON.stringify(undoData);
        await axiosInstance.put(`est/est-update/${rowId}/`, body);
        dispatch({
            type: actionTypes.UNDO_CLEAR,
        });
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Изменения отменены!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно отменить редактирование!'
        });
    }
};

export const undoCableJournalRowAdd = (undoType, undoData) => dispatch => {
    dispatch({
        type: actionTypes.UNDO_CABLE_JOURNAL_ROW_ADD,
        data: undoData,
        undoType: undoType,
    });
};

export const undoCableJournalRowRemove = (undoType, undoData) => dispatch => {
    dispatch({
        type: actionTypes.UNDO_CABLE_JOURNAL_ROW_REMOVE,
        data: undoData,
        undoType: undoType,
    });
};

export const undoCableJournalDataSave = () => dispatch => {
    dispatch({
        type: actionTypes.UNDO_CABLE_JOURNAL_DATA_SAVE,
    });
};

export const undoCableJournalRowEdit = (rowId, data) => async dispatch => {

    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        await axiosInstance.put(`cable/cable-update/${rowId}/`, data);
        dispatch({
            type: actionTypes.CABLE_JOURNAL_ROWS_UPDATE,
        });
        dispatch({
            type: actionTypes.UNDO_CLEAR,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'warning',
            snackMessage: 'Изменениея отменены!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно отменить изменения!',
        });   
    }
};

export const undoCableJournalDelete = (data) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        await axiosInstance.post(`router/cables/`, data);
        dispatch({
            type: actionTypes.CABLE_JOURNAL_ROWS_UPDATE,
        });
        dispatch({
            type: actionTypes.UNDO_CLEAR,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Записи восстановлены!',
        });
        
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно восстановить записи!',
        });   
    }
};