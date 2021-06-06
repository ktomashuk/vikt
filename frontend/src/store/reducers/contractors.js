import * as actionTypes from '../actions/actionTypes';

const initialState = {
    contractorsLoaded: false,
    contractorsList: null,
    contractorData: [],
    contractorDataLoaded: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
                contractorDataLoaded: false,}
        default:
            return state;
    }
};

export default reducer;