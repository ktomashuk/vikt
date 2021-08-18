import * as actionTypes from '../actions/actionTypes';

const initialState = {
    undoActive: false,
    undoType: '',
    undoData: [],
    undoDataTemp: [],
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
        case actionTypes.UNDO_CABLE_JOURNAL_ROW_ADD:
        case actionTypes.UNDO_ESTIMATES_ROW_ADD:
            return {...state,
                undoType: action.undoType,
                undoDataTemp: [...state.undoDataTemp, action.data]
            };
        case actionTypes.UNDO_CABLE_JOURNAL_ROW_REMOVE:
        case actionTypes.UNDO_ESTIMATES_ROW_REMOVE:
            return {...state,
                undoType: action.undoType,
                undoDataTemp: state.undoDataTemp.filter(item => item.id !== action.data),
            };
        case actionTypes.UNDO_CABLE_JOURNAL_DATA_SAVE:
        case actionTypes.UNDO_ESTIMATES_DATA_SAVE:
            return {...state,
            undoActive: true,
            undoData: state.undoDataTemp,
            undoDataTemp: [], 
            };
        case actionTypes.UNDO_CABLE_JOURNAL_ROWS_ADD_ALL:
            return {...state,
            undoType: action.undoType,
            undoDataTemp: [...state.undoDataTemp, ...action.data],
            };
        case actionTypes.UNDO_CLEAR:
            return {...state, 
                undoActive: false,
                undoType: '',
                undoData: [],
                undoDataTemp: [],
                undoId: 0,
            };
        case actionTypes.UNDO_TEMP_CLEAR:
            return {...state, 
                undoDataTemp: [],
                };
        default:
            return state;
    }
};

export default reducer;