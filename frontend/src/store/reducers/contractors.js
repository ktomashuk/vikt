import * as actionTypes from '../actions/actionTypes';

const initialState = {
    contractorsLoaded: false,
    contractorsList: null,
    contractorData: [],
    contractorDataLoaded: false,
    contractorTypes: [],
    contractorListSpinner: false,
    contractorDataSpinner: false,
    representatives: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONTRACTOR_TYPES_LOAD:
            const allData = action.data;
            allData.unshift({ 'type': 'Все' });
            return {...state,
                contractorTypes: allData,
            };
        case actionTypes.CONTRACTOR_LIST_LOAD:
            return {...state, 
                contractorsLoaded: true,
                contractorsList: action.data,
            };
        case actionTypes.CONTRACTOR_DETAILS_LOAD:
        case actionTypes.CONTRACTOR_DETAILS_UPDATE:
            return {...state, 
                contractorData: action.data,
                contractorDataLoaded: true,
            };
        case actionTypes.CONTRACTOR_DETAILS_UNLOAD:
            return {...state,
                contractorsLoaded: false,
                contractorsList: null,
                contractorData: [],
                contractorDataLoaded: false,
            };
        case actionTypes.CONTRACTOR_REPRESENTATIVES_DATA_LOAD:
            return {...state,
                representatives: action.data,
            };
        case actionTypes.CONTRACTOR_DATA_SPINNER_SHOW:
            return {...state,
                contractorDataSpinner: true,
            };
        case actionTypes.CONTRACTOR_DATA_SPINNER_HIDE:
            return {...state,
                contractorDataSpinner: false,
            };
        case actionTypes.CONTRACTOR_LIST_SPINNER_SHOW:
            return {...state,
                contractorListSpinner: true
            };
        case actionTypes.CONTRACTOR_LIST_SPINNER_HIDE:
            return {...state,
                contractorListSpinner: false
            };
        default:
            return state;
    }
};

export default reducer;