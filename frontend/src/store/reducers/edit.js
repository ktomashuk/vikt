import * as actionTypes from '../actions/actionTypes';

const initialState = {
    editEnabled: false,
    editData: null,
    editType: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EDIT_START:
            return {...state, 
                editEnabled: true,
                editData: action.data,
                editType: action.editType,
            };
        case actionTypes.EDIT_STOP:
            return {...state,
                editEnabled: false,
                editData: null,
                editType: '',
            };
        default:
            return state;
    }
};

export default reducer;