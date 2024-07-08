import {getPerPage} from "./paginationHelper";

export const RESET_REDUCER_KEY = 'defaultStateAction'

export const resetStoreMethod = (initialState) => {
    return {
        defaultStateAction: () => initialState
    }
}

export const paginationInitialValues = () => {
    return {
        meta: {
            currentPage: 1,
            from: 1,
            lastPage: 1,
            perPage: 5
        }
    }
}


export const setPaginationAction = (action) => {
    return {
        from: action.payload.from,
        currentPage: action.payload.current_page,
        lastPage: action.payload.last_page,
        perPage: getPerPage()
    }
}

export const defaultCrudInitialState = {
    all: {
        data: [],
        loading: false,
        ...paginationInitialValues()
    },
    show: {
        data: {},
        loading: false
    },
    deleteLoading: false
}