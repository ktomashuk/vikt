import * as actionTypes from '../actions/actionTypes';

const initialState = {
    deleteSelectorEnabled: false,
    lengthSelectorEnabled: false,
    resistanceSelectorEnabled: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SWITCH_TO_DELETING:
            return {...state, 
                deleteSelectorEnabled: true, 
                lengthSelectorEnabled: false,
                resistanceSelectorEnabled: false,
            };
        case actionTypes.SWITCH_TO_LENGTH:
            return {...state, 
                deleteSelectorEnabled: false, 
                lengthSelectorEnabled: true,
                resistanceSelectorEnabled: false,
            };
        case actionTypes.SWITCH_TO_RESISTANCE:
            return {...state, 
                deleteSelectorEnabled: false, 
                lengthSelectorEnabled: false,
                resistanceSelectorEnabled: true,
            };
        default:
            return state;
    }
};

export default reducer;