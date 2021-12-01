import * as actionTypes from '../actions/actionTypes';

const initialState = {
    backActive: false,
    backType: '',
    backClicked: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BACK_ACTIVATE:
            return {...state, 
                backActive: true,
                backType: action.backType,
                backClicked: false,
            };
        case actionTypes.BACK_DEACTIVATE:
            return {...state,
                backActive: false,
                backType: '',
                backClicked: false,
            };
        case actionTypes.BACK_CLICKED:
            return {...state,
                backClicked: true,
            };
        default:
            return state;
    }
};

export default reducer;