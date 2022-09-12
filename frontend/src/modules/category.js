// Actions
const GET_CATEGORIES = 'shady-shack/category/GET_CATEGORIES'
const ADD_CATEGORY = 'shady-shack/category/ADD_CATEGORY'
const DELETE_CATEGORY = 'shady-shack/category/DELETE_CATEGORY'
const EDIT_CATEGORY = 'shady-shack/category/EDIT_CATEGORY'
const FETCH_SUCCESS = 'shady-shack/category/FETCH_SUCCESS'
const FETCH_FAIL = 'shady-shack/category/FETCH_FAIL'
const SHOW_MODAL = 'shady-shack/category/SHOW_MODAL'
const CLOSE_MODAL = 'shady-shack/category/CLOSE_MODAL'
const STREAM_MODAL_DATA = 'shady-shack/category/STREAM_MODAL_DATA'

// Reducer
const initialState = {
    categories: [{id: 0, categoryName: ""}],
    fetchStatus: false,
    showModalFlag: false,
    modalData: {id: -1, categoryName: ""}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                fetchStatus: true
            }
        case ADD_CATEGORY:
            return {
                ...state,
                fetchStatus: true
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                fetchStatus: true
            }
        case EDIT_CATEGORY:
            return {
                ...state,
                fetchStatus: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                fetchStatus: false,
                categories: action.payload
            }
        case FETCH_FAIL:
            return {
                ...state,
                fetchStatus: false
            }
        case SHOW_MODAL:
            return {
                ...state,
                showModalFlag: true,
                modalData: action.payload
            }
        case CLOSE_MODAL:
            return {
                ...state,
                showModalFlag: false
            }
        case STREAM_MODAL_DATA:
            return {
                ...state,
                modalData: action.payload
            }
        default:
            return state
    }
}

// Action Creators
function getCategories() {
    return {
        type: GET_CATEGORIES
    }
}

function addCategory() {
    return {
        type: ADD_CATEGORY
    }
}

function deleteCategory() {
    return {
        type: DELETE_CATEGORY
    }
}

function editCategory() {
    return {
        type: EDIT_CATEGORY
    }
}

function fetchSuccess(payload) {
    return {
        type: FETCH_SUCCESS,
        payload
    }
}

function fetchFail() {
    return {
        type: FETCH_FAIL
    }
}

export function showModal(payload = initialState.modalData) {
    return {
        type: SHOW_MODAL,
        payload
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}

export function streamModalData(payload) {
    return {
        type: STREAM_MODAL_DATA,
        payload
    }
}

// Side Effects
export function initiateGetCategories() {
    return function sideEffect(dispatch) {
        dispatch(getCategories())
        fetch(`http://localhost:8080/productCategories/getAll`, {
            method: "GET"
        }).then(response => {
            if (!response.ok) {
                throw new Error("getCategories failed")
            }
            return response.json()
        }).then(categories => {
            dispatch(fetchSuccess(categories))
        }).catch(error => {
            console.log(error)
            dispatch(fetchFail())
        })
    }
}

export function initiateAddCategory(payload) {
    return function sideEffect(dispatch) {
        dispatch(addCategory())
        fetch(`http://localhost:8080/productCategories/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("addCategory failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetCategories())
            } else {
                throw new Error("addCategory text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(fetchFail())
        })
    }
}

export function initiateDeleteCategory(id) {
    return function sideEffect(dispatch) {
        dispatch(deleteCategory())
        fetch(`http://localhost:8080/productCategories/remove/${id}`, {
            method: "DELETE"
        }).then(response => {
            if (!response.ok) {
                throw new Error("deleteCategory failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetCategories())
            } else if (text === 'failure') {
                alert("Cannot delete category with products associated to it.")
                dispatch(fetchFail()) // Just close the fetch cycle with no error.
            } else {
                throw new Error("deleteCategory text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(fetchFail())
        })
    }
}

export function initiateEditCategory(payload) {
    return function sideEffect(dispatch) {
        dispatch(editCategory())
        fetch(`http://localhost:8080/productCategories/edit`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("editCategory response not OK")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetCategories())
            } else if (text === 'category does not exist') {
                dispatch(fetchFail())
            } else {
                throw new Error("editCategory text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(fetchFail())
        })
    }
}