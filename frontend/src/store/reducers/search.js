import * as actionTypes from '../actions/actionTypes';

const initialState = {
    searchResult: '',
    searchActive: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_START:
            return {...state, 
                searchResult: action.searchResult,
                searchActive: true,
            };
        case actionTypes.SEARCH_STOP:
            return {...state,
                searchResult: '',
                searchActive: false,
            };
        default:
            return state;
    }
};

export default reducer;