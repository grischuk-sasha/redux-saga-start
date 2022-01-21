import { v4 as uuidv4 } from 'uuid';

export const ADD_NEW_REQUEST = 'ADD_NEW_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const FINISH_REQUEST = 'FINISH_REQUEST';
export const RUN_REQUEST = 'RUN_REQUEST';
export const STOP_REQUEST = 'STOP_REQUEST';

export const addNewRequest = (name, delay) => {
    return {
        type: ADD_NEW_REQUEST,
        payload: {
            id: uuidv4(),
            name,
            delay
        }
    };
};

export const deleteRequest = (item) => {
    return {
        type: DELETE_REQUEST,
        payload: item
    };
}