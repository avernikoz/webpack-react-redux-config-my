import * as types from './actionTypes';

export function toggleModal() {
    return { type: types.TOGGLE_MODAL };
}

export function filterContacts(inputFilterText) {
    return {
        type: types.FILTER_CONTACTS,
        inputFilterText,
    };
}