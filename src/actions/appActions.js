import * as appApi from '../api/api';
import {createAction} from "./actionHelper";

export const updatingPerson = createAction('UPDATING_PERSON');
export const loadingPeople = createAction('LOADING_PEOPLE');
export const filterPeople = createAction('FILTER_PEOPLE');

export const getPeople = () => dispatch => {
    dispatch(loadingPeople(true));
    return appApi.getPeople()
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: 'LOAD_PEOPLE',
                    payload: response.data,
                });
                dispatch(loadingPeople(false));
            }
        })
        .catch(() => {
            dispatch(loadingPeople(false));
        });
};

export const updatePersonVisible = (payload) => dispatch => {
    dispatch(updatingPerson(true));
    return appApi.updatePersonVisible(payload)
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: 'UPDATE_PERSON',
                    payload: payload,
                });
                dispatch(updatingPerson(false))
            }
        })
        .catch(() => {
            dispatch(updatingPerson(false))
        });
};

export const deletePerson = (payload) => dispatch => {
    dispatch(updatingPerson(true));
    return appApi.deletePerson(payload)
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: 'DELETE_PERSON',
                    payload: payload,
                });
                dispatch(updatingPerson(false))
            }
        })
        .catch(() => {
            dispatch(updatingPerson(false))
        });
};