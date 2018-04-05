import {FILTER_CONTACTS, TOGGLE_MODAL, ADD_CONTACT, DELETE_CONTACT, SAVE_EDITED_CONTACT} from './actionTypes';


export const initialState = {
    sdsad: 133,
    inputFilterText: '111'
};

export function contacts(state = initialState, action) {
    switch (action.type) {
        case FILTER_CONTACTS:
            return {
                ...state,
                inputFilterText: action.inputFilterText
            };
        default:
            return state;
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case 'COMPLETE_TODO':
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: true
                    })
                }
                return todo
            });
        default:
            return state
    }
}