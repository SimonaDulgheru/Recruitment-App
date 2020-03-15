// recuder for auth
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function(state = initialState, action) {

    const { type, userIdAuth } = action;

    switch (type) {
        case REGISTER_SUCCESS,
        localStorage.setItem('token', userIdAuth.token);
        return {
            ...state,
            ...userIdAuth,
            isAuthenticated: true,
            loading: false
        }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false

            }
    }

}