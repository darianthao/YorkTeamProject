import {dateCorrection} from "../helpers/dateCorrection";

const GET_PRODUCTS = 'shady-shack/product/GET_PRODUCTS'
const ADD_PRODUCT = 'shady-shack/product/ADD_PRODUCT'
const DELETE_PRODUCT = 'shady-shack/product/DELETE_PRODUCT'
const EDIT_PRODUCT = 'shady-shack/product/EDIT_PRODUCT'
const GET_PRODUCTS_FAILED = 'shady-shack/product/GET_PRODUCTS_FAILED'
const GET_PRODUCTS_SUCCESS = 'shady-shack/product/GET_PRODUCTS_SUCCESS'
const GET_ONE_PRODUCT_SUCCESS = 'shady-shack/product/GET_ONE_PRODUCT_SUCCESS'
const GET_ONE_PRODUCT_FAILED = 'shady-shack/product/GET_ONE_PRODUCT_FAILED'
const GET_CATEGORY_SUCCESS = 'shady-shack/product/GET_CATEGORY_SUCCESS'
const SHOW_PRODUCT_MODAL = 'shady-shack/product/SHOW_PRODUCT_MODAL'
const CLOSE_PRODUCT_MODAL = 'shady-shack/product/CLOSE_PRODUCT_MODAL'
const STREAM_MODAL_DATA = 'shady-shack/product/STREAM_MODAL_DATA'
const SORT_PRODUCTS = 'shady-shack/product/SORT_PRODUCTS'
const CLEAR_SORT_ARRAY = 'shady-shack/product/CLEAR_SORT_ARRAY'

// Reducer
const initialState = {
    products: [],
    fetchStatus: false,
    oneProduct: [],
    categoryProds: [],
    showModal: false,
    modalData: {
        name: "",
        brand: "",
        productCategoryId: "",
        inventory: "",
        availableOnDate: "",
        isDiscontinued: false,
        description: "",
        price: "",
        salePrice: "",
        image: ""
    },
    realSalePrice: 0,
    sortProductsArray: [],
    sortStatus: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                fetchStatus: true
            }
        case ADD_PRODUCT:
            return {
                ...state,
                fetchStatus: true,
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                fetchStatus: true,
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                fetchStatus: true,
            }
        case GET_PRODUCTS_FAILED:
            return {
                ...state,
                fetchStatus: false
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                fetchStatus: false,
                products: action.payload,
                sortStatus: '',
                sortProductsArray: []
            }

        case GET_ONE_PRODUCT_SUCCESS:
            return {
                ...state,
                fetchStatus: false,
                oneProduct: action.payload
            }
        case GET_ONE_PRODUCT_FAILED:
            return {
                ...state,
                fetchStatus: false
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                fetchStatus: false,
                categoryProds: action.payload,
                sortStatus: '',
                sortProductsArray: []
            }
        case SHOW_PRODUCT_MODAL:
            return {
                ...state,
                showModal: true,
                modalData: action.payload,
            }

        case CLOSE_PRODUCT_MODAL:
            return {
                ...state,
                showModal: false,
            }

        case STREAM_MODAL_DATA:
            return {
                ...state,
                modalData: action.payload,
            }
        case SORT_PRODUCTS:
            return {
                ...state,
                sortProductsArray: action.newProducts,
                sortStatus: action.payload
            }
        case CLEAR_SORT_ARRAY:
            return {
                sortProductsArray: [],
                sortStatus: ''
            }
        default:
            return state
    }
}

// Action Creators
function getProducts() {
    return {
        type: GET_PRODUCTS,
    }
}

function addProduct() {
    return {
        type: ADD_PRODUCT,
    }
}

function deleteProduct() {
    return {
        type: DELETE_PRODUCT,
    }
}

function editProduct() {
    return {
        type: EDIT_PRODUCT,
    }
}

function getProductsFail() {
    return {
        type: GET_PRODUCTS_FAILED
    }
}

function getProductsSuccess(payload) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        payload
    }
}

function getOneProductSuccess(payload) {
    return {
        type: GET_ONE_PRODUCT_SUCCESS,
        payload
    }
}

function getOneProductFailed() {
    return {
        type: GET_ONE_PRODUCT_SUCCESS
    }
}

function getCategorySuccess(payload) {
    return {
        type: GET_CATEGORY_SUCCESS,
        payload
    }
}

export function showModal(payload = initialState.modalData) {
    return {
        type: SHOW_PRODUCT_MODAL,
        payload
    }
}

export function closeModal() {
    return {
        type: CLOSE_PRODUCT_MODAL,
    }
}

export function streamModalData(payload) {
    return {
        type: STREAM_MODAL_DATA,
        payload,
    }
}

function clearSortArray() {
    return {
        type: CLEAR_SORT_ARRAY
    }
}

export function sortProducts(payload, products) {
    clearSortArray()
    let newProducts = products.map(products => products)
    if (payload === 'Price: Low to High') {
        newProducts.sort((a, b) => {
            if (a.salePrice > 0 && b.salePrice > 0) {
                return a.salePrice > b.salePrice ? 1 : -1
            }
            else if (a.salePrice > 0 && b.salePrice === 0) {
                return a.salePrice > b.price ? 1 : -1
            }
            else if (a.salePrice === 0 && b.salePrice > 0) {
                return a.price > b.salePrice ? 1 : -1
            }
            else return (a.price > b.price ? 1 : -1)
        })
    }
    else if (payload === "Price: High to Low") {
        newProducts.sort((a, b) => {
            if (a.salePrice > 0 && b.salePrice > 0) {
                return a.salePrice < b.salePrice ? 1 : -1
            }
            else if (a.salePrice > 0 && b.salePrice === 0) {
                return a.salePrice < b.price ? 1 : -1
            }
            else if (a.salePrice === 0 && b.salePrice > 0) {
                return a.price < b.salePrice ? 1 : -1
            }
            else return (a.price < b.price ? 1 : -1)
        })
    }
    else if (payload === "Sort by:") {
        clearSortArray()
    }
    return {
        type: SORT_PRODUCTS,
        payload,
        newProducts
    }
}

// Side Effects
export function initiateGetProducts() {
    return function sideEffect(dispatch) {
        dispatch(getProducts())
        fetch('http://localhost:8080/products/getAll', {
            method: "GET"
        }).then(response => {
            if (!response.ok) {
                return dispatch(getProductsFail())
            }

            response.json().then(products => {
                dispatch(getProductsSuccess(products))

            })
        }).catch(error => console.log(error))
    }
}

export function initiateGetOneProduct(id) {
    return function sideEffect(dispatch, getState) {
        dispatch(getProducts())
        fetch(`http://localhost:8080/products/getOne/${id}`, {
            method: "GET"
        }).then(response => {
            if (!response.ok) {
                return dispatch(getProductsFail())
            }

            response.json().then(product => {
                const match = (getState().productReducer.products.find(
                    element => element.id === product.id))
                if (match)
                    dispatch(getOneProductSuccess(match))
                else dispatch(getOneProductFailed())
            })
        }).catch(error => console.log(error))
    }
}

export function initiateGetByCategoryID(categoryId) {
    return function sideEffect(dispatch) {
        dispatch(getProducts())
        fetch(`http://localhost:8080/products/get/${categoryId}`, {
            method: "GET"
        }).then(response => {
            if (!response.ok) {
                return dispatch(getProductsFail())
            }

            response.json().then(products => {
                dispatch(getCategorySuccess(products))

            })
        }).catch(error => console.log(error))
    }
}

export function initiateAddProduct(payload) {
    return function sideEffect(dispatch) {
        dispatch(addProduct())
        payload = {...payload, availableOnDate: dateCorrection(payload.availableOnDate)}
        fetch(`http://localhost:8080/products/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("addProduct failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetProducts())
            } else {
                throw new Error("addProduct text parse failed")
            }
        }).catch(error => {
            console.log(error)
        })
    }
}

export function initiateDeleteProduct(id) {
    return function sideEffect(dispatch) {
        dispatch(deleteProduct())
        fetch(`http://localhost:8080/products/remove/${id}`, {
            method: "DELETE"
        }).then(response => {
            if (!response.ok) {
                throw new Error("deleteProduct failure")
            }
            return response.text()
        }).then(text => {
            if (text === "success") {
                dispatch(initiateGetProducts())
            } else {
                throw new Error("deleteProduct text parse failure")
            }
        }).catch(error => {
            console.log(error)
        })
    }
}

export function initiateEditProduct(payload) {
    return function sideEffect(dispatch) {
        dispatch(editProduct())
        payload = {...payload, availableOnDate: dateCorrection(payload.availableOnDate)}
        fetch(`http://localhost:8080/products/edit/`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("throw editProduct failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetProducts())
            } else {
                throw new Error("editProduct text parse failed")
            }
        }).catch(error => {
            console.log(error)
        })
    }
}

//Filter
export function checkProductExists(products, productId) {
    return products.some(product => product.id === productId)
}