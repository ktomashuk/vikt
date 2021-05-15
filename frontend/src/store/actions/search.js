import * as actionTypes from '../actions/actionTypes';

export const searchStart = (searchResult) => dispatch => {

        dispatch({
            type: actionTypes.SEARCH_START,
            searchResult: searchResult,
        });

};

export const searchStop = () => dispatch => {

        dispatch({
            type: actionTypes.SEARCH_STOP,
        });
};