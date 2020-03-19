import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    GET_PROFILES,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    // GET_REPOS,



} from './types';

// get current users profile

export const getCurrentProfile = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            userIdAuth: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            userIdAuth: {
                msg: err.response.statusText,
                status: err.response.status
            }


        });
    }
};




// get all profiles

export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })

    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            userIdAuth: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            userIdAuth: {
                msg: err.response.statusText,
                status: err.response.status
            }


        });
    }
};
// get individual profile by id
export const getProfileById = userId => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            userIdAuth: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            userIdAuth: {
                msg: err.response.statusText,
                status: err.response.status
            }


        });
    }
};


// create/update profile
export const createProfile = (formData,
    history,
    edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            userIdAuth: res.data

        });
        dispatch(setAlert(edit ? 'Profile Upadated' : 'Profile Created'));
        if (!edit) {
            history.push('/dashboard');
            // does the same as redirect
        }
    } catch (err) {
        const errors = err.response.data.errors;


        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: PROFILE_ERROR,
            userIdAuth: { msg: err.response.statusText, status: err.response.status }
        });

    }
}