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

export const undoTempClear = () => dispatch => {
    dispatch({
        type: actionTypes.UNDO_TEMP_CLEAR,
    });
};

// Undoing estimates changes
export const undoEstimateRowAdd = (undoType, undoData) => dispatch => {
    dispatch({
        type: actionTypes.UNDO_ESTIMATES_ROW_ADD,
        data: undoData,
        undoType: undoType,
    });
};

export const undoEstimateRowRemove = (undoType, undoData) => dispatch => {
    dispatch({
        type: actionTypes.UNDO_ESTIMATES_ROW_REMOVE,
        data: undoData,
        undoType: undoType,
    });
};

export const undoEstimateDataSave = () => dispatch => {
    dispatch({
        type: actionTypes.UNDO_ESTIMATES_DATA_SAVE,
    });
};

export const undoEstimateDelete = (data) => async dispatch => {
    try {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_SHOW,
        });
        // Check if data type is an array
        if (Array.isArray(data))
        {
        // Splitting estimate data into chunks of 20
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
            await axiosInstance.post(`router/estimates/`, chunkData);
        };
        } else 
        // If data is not an array
        {
            await axiosInstance.post(`router/estimates/`, data);
        };
        dispatch({
            type: actionTypes.UNDO_CLEAR,
        });
        dispatch({
            type: actionTypes.ESTIMATES_REFRESH_NEEDED,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Записи восстановлены!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно восстановить записи!',
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
            type: actionTypes.ESTIMATES_REFRESH_NEEDED,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Изменения отменены!',
        });
    } catch(err) {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно отменить редактирование!'
        });
    }
};

// Undo cable journal changes
export const undoCableJournalRowAdd = (undoType, undoData) => dispatch => {
    dispatch({
        type: actionTypes.UNDO_CABLE_JOURNAL_ROW_ADD,
        data: undoData,
        undoType: undoType,
    });
};

export const undoCableJournalRowsAddAll = (undoType, undoData) => dispatch => {
    dispatch({
        type: actionTypes.UNDO_CABLE_JOURNAL_ROWS_ADD_ALL,
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
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
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
        // Check if data type is an array
        if (Array.isArray(data))
        {
        // Splitting estimate data into chunks of 20
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
            type: actionTypes.UNDO_CLEAR,
        });
        dispatch({
            type: actionTypes.SNACK_SHOW,
            snackSeverity: 'success',
            snackMessage: 'Записи восстановлены!',
        });
        
    } catch(err) {
        dispatch({
            type: actionTypes.INFO_LOADING_SPINNER_HIDE,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно восстановить записи!',
        });   
    }
};