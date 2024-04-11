import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT,
    LOGOUT_FAIL, LOGIN_STUDENT_SUCCESS, LOGIN_STUDENT_FAIL, LOGOUT_STUDENT, LOGOUT_STUDENT_FAIL
} from '../actions/types.jsx';

const localStorageIsAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
const localStorageIsStudentAuthenticated = JSON.parse(localStorage.getItem('isStudentAuthenticated'));
const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: localStorageIsAuthenticated,
    isStudentAuthenticated: localStorageIsStudentAuthenticated,
    user: null
};

export default function MyComponent(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            localStorage.setItem('isAuthenticated', 'true');
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case LOGIN_STUDENT_SUCCESS:
            localStorage.setItem('isStudentAuthenticated', 'true');
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isStudentAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case AUTHENTICATED_FAIL:
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGOUT_FAIL:
            return state;
        case LOGOUT_STUDENT_FAIL:
            return state;
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case LOGIN_STUDENT_FAIL:
        case LOGOUT_STUDENT:
            localStorage.removeItem('isStudentAuthenticated');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isStudentAuthenticated: false,
                user: null
            }

        default:
            return state
    }
};
