export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';
export const ITEM_CLICKED = 'ITEM_CLICKED';
export const OPEN_MODAL = 'OPEN_MODAL';
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const MODAL_FETCH_DATA_SUCCESS = 'MODAL_FETCH_DATA_SUCCESS';
export const MODAL_HAS_ERRORED = 'MODAL_HAS_ERRORED';
export const MODAL_IS_LOADING = 'MODAL_IS_LOADING';

// БЛОК ПЕРВОНАЧАЛЬНОЙ ЗАГРУЗКИ
export function itemsHasErrored() {
    return {
        type: ITEMS_HAS_ERRORED,
    };
}

export function itemsIsLoading(bool) {
    return {
        type: ITEMS_IS_LOADING,
    };
}

export function itemsFetchDataSuccess(payload){
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        payload
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading());

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading());

                return response;
            })
            .then((response) => response.json())
            .then((payload) => dispatch(itemsFetchDataSuccess(payload)))
            .catch(() => dispatch(itemsHasErrored()));
    };
}

// БЛОК РАБОТЫ МОДАЛЬНОГО ОКНА

export function openModal () {
    return {
        type: OPEN_MODAL,
    }
}

export function closeModal () {
    return {
        type: CLOSE_MODAL,
    }
}

export function modalFetchDataSuccess(payload) {
    return {
        type: MODAL_FETCH_DATA_SUCCESS,
        payload
    };
}

export function modalHasErrored() {
    return {
        type: MODAL_HAS_ERRORED,
    };
}

export function modalIsLoading() {
    return {
        type: MODAL_IS_LOADING,
    };
}

export function modalFetchData(url) {
    return (dispatch) => {
        dispatch(modalIsLoading());

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(modalIsLoading());

                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(modalFetchDataSuccess(data)))

            .catch(() => dispatch(modalHasErrored()));
    };
}