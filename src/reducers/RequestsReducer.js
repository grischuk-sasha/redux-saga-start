import {ADD_NEW_REQUEST, DELETE_REQUEST, FINISH_REQUEST, UPDATE_REQUEST} from '../actions/RequestsActions';

export const initialState = {
    list: [
        {
            id: '9c1b6584-ac4e-4cd4-a979-51ae5fe2d2e5',
            name: 'Load Permissions',
            delay: 5
        },
        {
            id: 'e19bb3e3-8d22-4bf9-a15d-2d26a139008b',
            name: 'Load boards',
            delay: 3
        },
        {
            id: 'e19bb3e3-8d22-4bf9-a15d-2d26a13900t5',
            name: 'Load Something',
            delay: 4
        }
    ],
    processingRequest: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_REQUEST:
            return {
                ...state,
                list: [...state.list, action.payload]
            };

        case DELETE_REQUEST:
            return {
                ...state,
                list: state.list.filter((item) => item.id !== action.payload.id)
            };

        case UPDATE_REQUEST:
            return {
                ...state,
                processingRequest: action.payload,
            }

        case FINISH_REQUEST:
            return {
                ...state,
                processingRequest: {},
            }

        default:
            return state;
    }
}