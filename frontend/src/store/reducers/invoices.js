import * as actionTypes from '../actions/actionTypes';

const initialState = {
    invoicesLoaded: false,
    invoicesData: null,
    invoicesListSpinner: false,
    invoicesListRefreshNeeded: false,
    invoicesChosenData: [],
    invoicesChosenId: 0,
    invoicesChosenLoaded: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INVOICES_LOAD_SUCCESS:
            return {...state, 
                invoicesLoaded: true,
                invoicesData: action.data,
                invoicesListRefreshNeeded: false,
            };
        case actionTypes.INVOICES_LOAD_FAIL:
            return {...state, invoicesLoaded: false};
        case actionTypes.INVOICES_LIST_SPINNER_SHOW:
            return {...state, invoicesListSpinner: true };
        case actionTypes.INVOICES_LIST_SPINNER_HIDE:
            return {...state, invoicesListSpinner: false };
        case actionTypes.INVOICES_CHOOSE_INVOICE:
            return {...state,
                invoicesChosenId: action.chosenId,
                invoicesChosenData: action.data,
                invoicesChosenLoaded: true,
            };
        case actionTypes.INVOICES_EDIT_INVOICE:
            return {...state,
                invoicesListRefreshNeeded: true,
            };
        case actionTypes.INVOICES_REFRESH:
            return {...state, invoicesListRefreshNeeded: true };
        case actionTypes.INVOICES_INVOICE_RECOUNT:
            return {...state, 
            invoicesChosenData: action.data,
            };
        case actionTypes.INVOICES_UNLOAD:
            return {...state,
                invoicesLoaded: false,
                invoicesData: null,
                invoicesListSpinner: false,
                invoicesListRefreshNeeded: false,
                invoicesChosenData: [],
                invoicesChosenId: 0,
                invoicesChosenLoaded: false,
            };
        default:
            return state;
    }
};

export default reducer;