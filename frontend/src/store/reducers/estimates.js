import * as actionTypes from '../actions/actionTypes';

const initialState = {
    estimatesLoaded: false,
    estimatesData: null,
    systemsByObject: null,
    systemsLoaded: false,
    estimatesObject: 0,
    estimatesSystem: '',
    estimatesRefreshNeeded: false,
    nonEstimatesData: null,
    nonEstimatesLoaded: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ESTIMATES_LOAD_SUCCESS:
            return {...state, 
                estimatesLoaded: true,
                estimatesData: action.data,
                estimatesObject: action.objId,
                estimatesSystem: action.system,
                estimatesRefreshNeeded: false,
            };
        case actionTypes.ESTIMATES_NON_LOAD_SUCCESS:
            return {...state,
                nonEstimatesData: action.data,
                nonEstimatesLoaded: true,
            };
        case actionTypes.ESTIMATE_SYSTEMS_LOAD_SUCCESS:
            return {...state,
                systemsLoaded: true,
                systemsByObject: action.data,
            };
        case actionTypes.ESTIMATE_SYSTEMS_LOAD_FAIL:
            return {...state, 
                systemsLoaded: false};
        case actionTypes.ESTIMATE_ROW_DELETE_SUCCESS:
        case actionTypes.ESTIMATE_ROW_EDIT_SUCCESS:
            return {...state};
        case actionTypes.ESTIMATE_ROW_DELETE_FAIL:
        case actionTypes.ESTIMATE_ROW_EDIT_FAIL:
            return {...state};
        case actionTypes.ESTIMATES_LOAD_FAIL:
            return {...state, estimatesLoaded: false };
        case actionTypes.ESTIMATES_DATA_UNLOAD:
            return {...state,
                estimatesLoaded: false, 
                estimatesData: null,
                systemsByObject: null,
                systemsLoaded: false,
                estimatesObject: 0,
                estimatesSystem: '',
                estimatesRefreshNeeded: false,
                nonEstimatesLoaded: false,
                nonEstimatesData: null,
            };
        case actionTypes.SEARCH_ESTIMATES:
            return {...state,
                estimatesData: action.data,
                estimatesRefreshNeeded: false,
            };
        case actionTypes.SEARCH_NONESTIMATES:
            return {...state,
                nonEstimatesData: action.data,
                estimatesRefreshNeeded: false,
            };
        case actionTypes.ESTIMATES_REFRESH_NEEDED:
            return {...state, estimatesRefreshNeeded: true };
        default:
            return state;
    }
};

export default reducer;