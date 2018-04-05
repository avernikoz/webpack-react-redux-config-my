import * as types from '../constants/actionTypes';

export function toggleModal() {
    return {type: types.TOGGLE_MODAL};
}

export function setModalType(modalType) {
    return {type: types.SET_MODAL_TYPE, modalType}
}

export function filterContacts(inputFilterText) {
    return {
        type: types.FILTER_CONTACTS,
        inputFilterText,
    };
}

export function setSelectedContact(selectedContact) {
    return {
        type: types.SET_SELECTED_CONTACT,
        selectedContact
    }
}


//other stuff

export function addContact(newContact) {
    return {
        type: types.ADD_CONTACT,
        newContact,
    }
}

export function deleteContact(idContactToDelete) {
    return {
        type: types.DELETE_CONTACT,
        idContactToDelete,
    }
}

export function saveContactChanges(changedContact) {
    return {
        type: types.SAVE_EDITED_CONTACT,
        changedContact,
    }
}



