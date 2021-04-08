import axiosInstance from '../../axios/axiosServer';
import * as actionTypes from '../actions/actionTypes';
import jwt_decode from 'jwt-decode';


export const loginUser = (username, password) => async dispatch => {

    const body = JSON.stringify({ username, password});
    try {
        const res = await axiosInstance.post('/api/token/', body);
        // Storing tokens in localStorage
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        // Setting new headers
        axiosInstance.defaults.headers['Authorization'] =
        'JWT ' + localStorage.getItem('access_token');
        // Decoding token
        const decodedToken = jwt_decode(res.data.access);
        const userName = decodedToken.username;
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            username: userName,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Неправильный логин или пароль!'
        });
    }
};

export const checkAuthentication = () => async dispatch => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
    // Decoding token
    const decodedToken = jwt_decode(refreshToken);
    const userName = decodedToken.username;
    const expirationDate = decodedToken.exp * 1000;
    const currentDate = Date.now()
    if (expirationDate > currentDate) {
        dispatch({
            type: actionTypes.AUTH_SUCCESS,
            username: userName
        });
    } else {
        dispatch({
            type: actionTypes.AUTH_FAIL
        });
    }}    
};

export const logoutUser = () => async dispatch => {
    localStorage.clear();
    dispatch({
        type: actionTypes.LOGOUT_SUCCESS
    });
};