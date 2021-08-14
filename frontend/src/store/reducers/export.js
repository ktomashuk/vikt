import * as actionTypes from '../actions/actionTypes';

const initialState = {
    exportEnabled: false,
    exportData: null,
    exportType: '',
    exportSigners: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EXPORT_START:
            return {...state, 
                exportEnabled: true,
                exportType: action.exportType,
                exportData: action.exportData,
            };
        case actionTypes.EXPORT_STOP:
            return {...state,
                exportEnabled: false,
                exportType: '',
                exportData: null,
            };
        case actionTypes.EXPORT_GET_SIGNERS:
            return {...state,
                exportSigners: action.signers,
            };
        default:
            return state;
    }
};

export default reducer;