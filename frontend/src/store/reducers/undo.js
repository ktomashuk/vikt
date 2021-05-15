import * as actionTypes from '../actions/actionTypes';

const initialState = {
    undoActive: false,
    undoType: '',
    undoData: null,
    undoId: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UNDO_DATA_SAVE:
            return {...state, 
                undoActive: true, 
                undoType: action.undoType,
                undoData: action.undoData,
                undoId: action.undoId,
            };
        case actionTypes.UNDO_ESTIMATE_ROW_ADD:
        case actionTypes.UNDO_ESTIMATE_ROW_DELETE:
        case actionTypes.UNDO_ESTIMATE_ROW_EDIT:
            return {...state, 
                undoActive: false,
                undoType: '',
                undoData: null,
                undoId: 0,
            };
        default:
            return state;
    }
};

export default reducer;