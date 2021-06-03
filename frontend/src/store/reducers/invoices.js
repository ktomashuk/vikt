import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoaded: false,
    data: null,
    newInvoiceCreated: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INVOICES_LOAD_SUCCESS:
            return {...state, 
                isLoaded: true,
                data: action.data,
            };
        case actionTypes.INVOICES_LOAD_FAIL:
            return {...state, isLoaded: false};
        case actionTypes.INVOICE_NEW_CREATE:
            return {...state, newInvoiceCreated: true }
        default:
            return state;
    }
};

export default reducer;