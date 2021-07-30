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
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
        });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Неправильный логин или пароль!'
        });
    }
};

export const checkAuthentication = () => dispatch => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
    // Decoding token
    const decodedToken = jwt_decode(refreshToken);
    const userName = decodedToken.username;
    const firstName = decodedToken.first_name;
    const lastName = decodedToken.last_name;
    const expirationDate = decodedToken.exp * 1000;
    const currentDate = Date.now()
    if (expirationDate > currentDate) {
        dispatch({
            type: actionTypes.AUTH_SUCCESS,
            username: userName,
            firstName: firstName,
            lastName: lastName,
        });
    } else {
        dispatch({
            type: actionTypes.AUTH_FAIL
        });
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Истек срок авторизации. Войдите в систему заново!'
        });
        localStorage.clear();
    }}    
};

export const logoutUser = () => dispatch => {
    localStorage.clear();
    dispatch({
        type: actionTypes.LOGOUT_SUCCESS
    });
};

export const getUserProfile = (id) => async dispatch => {
    try {
    const res = await axiosInstance.get(`router/users/${id}/`);
    const firstName = res.data.first_name;
    const lastName = res.data.last_name;
    const email = res.data.email;
    dispatch({
        type: actionTypes.PROFILE_LOAD_SUCCESS,
        firstName: firstName,
        lastName: lastName,
        email: email,
        dataLoaded: true,
    });
    } catch(err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно загрузить данные!'
        });
    };
};

export const updateUserProfile = (id, firstName, lastName, email) => async dispatch => {
    try {
    const body = {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
    };
    await axiosInstance.put(`/update/${id}/`, body);
    dispatch({
        type: actionTypes.PROFILE_CHANGE_SUCCESS,
        firstName: firstName,
        lastName: lastName,
        email: email,
    });
    } catch (err) {
        dispatch({
            type: actionTypes.ERROR_SHOW,
            errorMessage: 'Невозможно обновить данные!'
        });
    }
};