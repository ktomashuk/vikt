import * as actionTypes from '../actions/actionTypes';

const initialState = {
    deviceList: [],
    cableJournal: null,
    cableJournalLoaded: false,
    refreshNeeded: false,
    cableObject: 0,
    cableSystem: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CABLE_JOURNAL_DEVICE_ADD:
            return {...state, 
                deviceList: [...state.deviceList, action.data],
            };
        case actionTypes.CABLE_JOURNAL_DEVICE_REMOVE:
            return {...state,
            deviceList: state.deviceList.filter(item => item.id !== action.data),
            };
        case actionTypes.CABLE_JOURNAL_LOAD_SUCCESS:
            return {...state,
            cableJournal: action.data,
            cableJournalLoaded: true,
            cableObject: action.object,
            cableSystem: action.system,
            refreshNeeded: false,
            };
        case actionTypes.CABLE_JOURNAL_ROWS_UPDATE:
            return {...state,
            refreshNeeded: true,};
        case actionTypes.CABLE_JOURNAL_DATA_UNLOAD:
            return {...state,
                deviceList: [],
                cableJournal: null,
                cableJournalLoaded: false,
                refreshNeeded: false,
                cableObject: 0,
                cableSystem: '',
            };
        default:
            return state;
    }
};

export default reducer;