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
            return {...state, 
                contractorData: action.data,
                contractorDataLoaded: true,
            };
        default:
            return state;
    }
};

export default reducer;