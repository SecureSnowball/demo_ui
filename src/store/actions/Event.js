import axios from '../../axiosUrl';
import * as actionTypes from './actionTypes';

export const setCategoriesData = (data) => {
    return {
        type: actionTypes.SET_CATEGORIES_DATA,
        data,
    }
}

export const setEventList = (data) => {
    return {
        type: actionTypes.SET_EVENT_LIST,
        data,
    }
}

export const getEventList = (filterString) => {
    return dispatch => {
        return axios.get(`/event?${filterString}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                dispatch(setEventList(res.data.events));
                return res.data.events;
            }).catch(err => {
                console.log(err);
                return [];
            });
    }
}
