// recuder for auth
import {
    REGISTER_SUCCESS,
    //REGISTER_FAIL,
    USER_LOADED,
    //AUTH_ERROR,
    LOGIN_SUCCESS,
    //LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    const { type, userIdAuth } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: userIdAuth
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...userIdAuth,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...userIdAuth,
                isAuthenticated: true,
                loading: false
            };
        case ACCOUNT_DELETED:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;
    }
}