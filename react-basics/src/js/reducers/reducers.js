import {
    FILTER_CONTACTS,
    SET_MODAL_TYPE,
    TOGGLE_MODAL,
    SET_SELECTED_CONTACT,
    ADD_CONTACT,
    DELETE_CONTACT,
    SAVE_EDITED_CONTACT,
    SAVE_SELECTED_CONTACT
} from '../constants/actionTypes';
import defaultContacts from '../constants/defaultContacts';


export const initialState = {
    contacts: defaultContacts,
    inputFilterText: '',
    selectedContact: {
        id: null,
        name: '',
        phoneNumber: ''
    },
    modalWindowOpened: false,
    modalType: ''
};

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case FILTER_CONTACTS:
            return {
                ...state,
                inputFilterText: action.inputFilterText
            };
        case SET_MODAL_TYPE:
            return {
                ...state,
                modalType: action.modalType
            };
        case TOGGLE_MODAL:
            return {
                ...state,
                modalWindowOpened: !state.modalWindowOpened
            };
        case SET_SELECTED_CONTACT:
            return {
                ...state,
                selectedContact: action.selectedContact
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.newContact, ...state.contacts]
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts.filter(elem => elem.id !== action.idContactToDelete)]
            };
        case SAVE_EDITED_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts
                    .map(elem =>
                        elem.id === action.changedContact.id ? { ...elem, ...action.changedContact }
                            : elem)]
            };
        case SAVE_SELECTED_CONTACT:
            return {
                ...state,
                selectedContact: action.changedContact
            };
        default:
            return state;
    }
}
