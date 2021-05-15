import * as actionTypes from '../actions/actionTypes';

const initialState = {
    objectsLoaded: false,
    objectsData: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OBJECTS_LOAD_SUCCESS:
            return {...state, 
                objectsLoaded: true,
                objectsData: action.data,
            };
        case actionTypes.OBJECTS_LOAD_FAIL:
            return {...state, objectsLoaded: false};
        default:
            return state;
    }
};

export default reducer;