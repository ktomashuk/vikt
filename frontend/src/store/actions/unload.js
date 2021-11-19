import * as actionTypes from '../actions/actionTypes';

export const unloadEverything = () => async dispatch => {
    dispatch({
        type: actionTypes.ESTIMATES_DATA_UNLOAD,
    });
    dispatch({
        type: actionTypes.CONTRACTOR_DETAILS_UNLOAD,
    });
    dispatch({
        type: actionTypes.CABLE_JOURNAL_DATA_UNLOAD,
    });
    dispatch({
        type: actionTypes.OBJECTS_UNLOAD,
    });
    dispatch({
        type: actionTypes.PURCHASES_UNLOAD_EVERYTHING,
    });
    dispatch({
        type: actionTypes.INVOICES_UNLOAD,
    });
};