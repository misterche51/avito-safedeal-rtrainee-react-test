import {
    ITEMS_IS_LOADING,
    ITEMS_HAS_ERRORED,
    ITEMS_FETCH_DATA_SUCCESS,
    OPEN_MODAL,
    CLOSE_MODAL,
    MODAL_FETCH_DATA_SUCCESS,
    MODAL_HAS_ERRORED,
    MODAL_IS_LOADING,
} from '../actions';


const initialState = {
    items: [],
    itemsIsLoading: false,
    itemsHasErrored: false,
    isModalOpen: false,
    itemId: null,
    modalData: {},
    modalIsLoading: false,
    modalHasErrored: false,
}

export default function appReducer(state = initialState, {type, payload}) {
    switch (type) {
        case ITEMS_IS_LOADING:
            return {
                ...state,
                itemsIsLoading: true,
            };
        case ITEMS_HAS_ERRORED:
            return {
                ...state,
                itemsIsLoading: false,
                itemsHasErrored: true,
            }
        case ITEMS_FETCH_DATA_SUCCESS:
            return {
                ...state,
                itemsIsLoading: false,
                itemsHasErrored: false,
                items: payload,
            }
        case MODAL_IS_LOADING:
            return {
                ...state,
                modalIsLoading: true,
            }
        case MODAL_HAS_ERRORED:
            return {
                ...state,
                modalIsLoading: false,
                modalHasErrored: true,
            }
        case MODAL_FETCH_DATA_SUCCESS:
            return {
                ...state,
                modalIsLoading: false,
                modalHasErrored: false,
                modalData: payload,
            }
        case OPEN_MODAL:
            return {
                ...state,
                isModalOpen: true,
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modalData: {},
                isModalOpen: false,
            }
        default:
            return state;
    }
}
