import * as actionTypes from '../actions/actionTypes';

const initialState = {
    objectsLoaded: false,
    objectsData: null,
    chosenObjectId: 0,
    chosenObjectData: null,
    chosenObjectSystems: null,
    chosenObjectSystemsLoaded: false,
    units: null,
    unitsLoaded: false,
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
        case actionTypes.OBJECTS_EDIT_OBJECT:
            return {...state, chosenObjectData: action.data};
        case actionTypes.OBJECTS_CHOOSE_OBJECT:
            return {...state, 
                chosenObjectId: action.id,
                chosenObjectData: action.data,
            };
        case actionTypes.OBJECTS_GET_SYSTEMS:
            return {...state,
                chosenObjectSystems: action.data,
                chosenObjectSystemsLoaded: true,
            };
        case actionTypes.OBJECTS_UNLOAD:
            return {
                objectsLoaded: false,
                objectsData: null,
                chosenObjectId: 0,
                chosenObjectData: null,
                chosenObjectSystems: null,
                chosenObjectSystemsLoaded: false,
                units: null,
                unitsLoaded: false,
            };
        case actionTypes.UNITS_LOAD:
            return {...state, 
                units: action.data,
                unitsLoaded: true,
            };
        default:
            return state;
    }
};

export default reducer;