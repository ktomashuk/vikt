import * as actionTypes from '../actions/actionTypes';

const initialState = {
    deleteEnabled: false,
    deleteAllEnabled: false,
    deleteData: [],
    deleteType: '',
    deleteItemsNumber: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DELETE_CABLE_JOURNAL_ITEM_ADD:
        case actionTypes.DELETE_ESTIMATES_ITEM_ADD:
            return {...state, 
                deleteEnabled: true,
                deleteData: [...state.deleteData, action.data],
                deleteType: action.deleteType,
                deleteItemsNumber: state.deleteItemsNumber + 1,
             };
        case actionTypes.DELETE_CABLE_JOURNAL_ITEM_REMOVE:
        case actionTypes.DELETE_ESTIMATES_ITEM_REMOVE:
            const newNumber = state.deleteItemsNumber - 1;
            let enabled = null;
            if (newNumber === 0) {
                enabled = false;
            } else {
                enabled = true;
            }
            return {...state,
                deleteData: state.deleteData.filter(item => item !== action.data),
                deleteItemsNumber: newNumber,
                deleteEnabled: enabled,
            };
        case actionTypes.DELETE_CABLE_JOURNAL_REMOVE_ALL:
        case actionTypes.DELETE_ESTIMATES_REMOVE_ALL:
            return {...state,
            deleteData: [],
            deleteItemsNumber: 0,
            deleteEnabled: false,
            deleteAllEnabled: false,
            };
        case actionTypes.DELETE_CABLE_JOURNAL_ADD_ALL:
        case actionTypes.DELETE_ESTIMATES_ADD_ALL:
            return {...state,
            deleteEnabled: true,
            deleteAllEnabled: true};
        case actionTypes.DELETE_CABLE_JOURNAL_ADD_ALL_ITEMS:
            return {...state,
            deleteEnabled: true,
            deleteData: [...state.deleteData, ...action.data],
            deleteType: action.deleteType,
            deleteItemsNumber: state.deleteItemsNumber + action.data.length,
            };
        default:
            return state;
    }
};

export default reducer;