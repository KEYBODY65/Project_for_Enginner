import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGOUT_FAIL, LOGIN_STUDENT_SUCCESS, LOGIN_STUDENT_FAIL, LOGOUT_STUDENT, LOGOUT_STUDENT_FAIL
} from './types.jsx';
import Cookies from "universal-cookie";

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password, csrfToken) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    };

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post(`/teacher/auth_data/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const signup = (name, surname, email, password, csrfToken) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    };

    const body = JSON.stringify({name, surname, email, password});
    try {
        const res = await axios.post(`/teacher/register_data/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const loginStudent = (student_login, student_password, csrfToken) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    };

    const body = JSON.stringify({student_login, student_password});

    try {
        const res = await axios.post(`/student/student_login_data/`, body, config);
        document.getElementById('incorrectValue').style.display = 'none';
        console.log(1)
        dispatch({
            type: LOGIN_STUDENT_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        document.getElementById('incorrectValue').style.display = 'block';
        dispatch({
            type: LOGIN_STUDENT_FAIL
        })
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});

        try {
            const res = await axios.post(``, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
};
export const logoutStudent = () => dispatch => {
    dispatch({
        type: LOGOUT_STUDENT
    })
};

