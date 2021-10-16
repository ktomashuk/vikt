import * as actionTypes from '../actions/actionTypes';

const initialState = {
    estimatePurchases: [],
    nonEstimatePurchases: [],
    estimatePurchasesLoaded: false,
    nonEstimatePurchasesLoaded: false,
    purchasesByInvoice: [],
    purchasesByInvoiceLoaded: false,
    purchasesByInvoiceRefreshNeeded: false,
    purchasesByItem: [],
    purchasesByItemLoaded: false,
    purchasesNotAssignedCount: 0,
    purchasesNotReceivedCount: 0,
    purchasesTotalNotCount: 0,
    purchaseById: null,
    purchaseByIdLoaded: false,
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
                purchasesByInvoiceRefreshNeeded: false,
            };
        case actionTypes.PURCHASES_GET_PURCHASES_BY_INVOICE:
            return {...state,
                purchasesByInvoice: action.data,
                purchasesByInvoiceLoaded: true,
                purchasesByInvoiceRefreshNeeded: false,
            };
        case actionTypes.PURCHASES_GET_PURCHASES_BY_ESTIMATE_ITEM:
        case actionTypes.PURCHASES_GET_PURCHASES_BY_NONESTIMATE_ITEM:
            return {...state,
                purchasesByItem: action.data,
                purchasesByItemLoaded: true,
            };
        case actionTypes.PURCHASES_GET_NOT_ASSIGNED_AND_RECEIVED_COUNT:
            return {...state,
                purchasesNotAssignedCount: action.data.not_assigned,
                purchasesNotReceivedCount: action.data.not_received,
                purchasesTotalNotCount: action.data.not_total,
            };
        case actionTypes.PURCHASES_REFRESH:
            return {...state,
                purchasesByInvoiceRefreshNeeded: true,
            };
        case actionTypes.PURCHASES_GET_PURCHASE_DATA_BY_ID:
            return {...state,
                purchaseById: action.data,
                purchaseByIdLoaded: true,
            };
        default:
            return state;
    }
};

export default reducer;