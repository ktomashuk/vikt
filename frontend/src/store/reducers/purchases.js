import * as actionTypes from '../actions/actionTypes';

const initialState = {
    estimatePurchases: [],
    nonEstimatePurchases: [],
    estimatePurchasesLoaded: false,
    nonEstimatePurchasesLoaded: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASES_GET_ESTIMATES_BY_OBJECT:
            return {...state, 
                estimatePurchasesLoaded: true,
                estimatePurchases: action.data,
            };
        case actionTypes.PURCHASES_GET_NONESTIMATES_BY_OBJECT:
            return {...state, 
                nonEstimatePurchasesLoaded: true,
                nonEstimatePurchases: action.data,
            };
        case actionTypes.PURCHASES_UNLOAD:
            return {...state,
                estimatePurchases: [],
                nonEstimatePurchases: [],
                estimatePurchasesLoaded: false,
                nonEstimatePurchasesLoaded: false,
            };
        default:
            return state;
    }
};

export default reducer;