import {initiateGetProducts} from "./product";
import {dateCorrection} from "../helpers/dateCorrection";

//GET
const GET_SCHEDULED_PRICES = 'shady-shack/scheduling/GET_SCHEDULED_PRICES'

//GET CHECKS
const GET_SCHEDULED_PRICES_SUCCESS = 'shady-shack/scheduling/GET_SCHEDULED_PRICES_SUCCESS'
const GET_SCHEDULED_PRICES_FAILED = 'shady-shack/scheduling/GET_SCHEDULED_PRICES_FAILED'
const GET_SCHEDULED_SALES_SUCCESS = 'shady-shack/scheduling/GET_SCHEDULED_SALES_SUCCESS'
const GET_SCHEDULED_MAPPRICES_SUCCESS = 'shady-shack/scheduling/GET_SCHEDULED_MAPPRICES_SUCCESS'

//SET MODAL MODE
const SET_MODAL_MODE = 'shady-shack/scheduling/SET_MODAL_MODE'

//ADD
const ADD_SCHEDULED_PRICE= 'shady-shack/scheduling/ADD_SCHEDULED_PRICE'

//EDIT
const EDIT_SCHEDULED_PRICE= 'shady-shack/scheduling/EDIT_SCHEDULED_PRICE'

//MODALS
const SHOW_PRICE_MODAL = 'shady-shack/scheduling/SHOW_PRICE_MODAL'
const CLOSE_PRICE_MODAL = 'shady-shack/scheduling/CLOSE_PRICE_MODAL'
const STREAM_PRICE_MODAL_DATA = 'shady-shack/scheduling/STREAM_PRICE_MODAL_DATA'

// Reducer
const initialState = {
    modalMode:"Price",
    prices: [{id: 0,
        productId: 0,
        startDate: "",
        endDate: "",
        price: 0}],
    sales: [{id: 0,
        saleName:"",
        productId: 0,
        startDate: "",
        endDate: 0,
        price: 0}],
    mapPrices: [{id: 0,
        productId: 0,
        startDate: "",
        endDate: "",
        price: 0}],

    fetchStatus: false,
    showPriceModal: false,
    showSaleModal: false,
    showMapPriceModal: false,


    priceModalData : {id: 0,
        productId: 0,
        startDate: "",
        endDate: "",
        price: 0},

    saleModalData : {id: 0,
        saleName:"",
        productId: 0,
        startDate: "",
        endDate: "",
        price: 0},

    mapPriceModalData : {
        id:0,
        productId: 0,
        startDate: "",
        endDate: "",
        price: 0}
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_MODAL_MODE:
            return {
                ...state,
                modalMode: action.payload
            }
        case GET_SCHEDULED_PRICES:
            return {
                ...state,
                fetchStatus: true
            }
        case ADD_SCHEDULED_PRICE:
            return {
                ...state,
                fetchStatus: true,
            }

        case EDIT_SCHEDULED_PRICE:
            return {
                ...state,
                fetchStatus: true,
            }
        case GET_SCHEDULED_PRICES_FAILED:
            return {
                ...state,
                fetchStatus: false
            }
        case GET_SCHEDULED_PRICES_SUCCESS:
            return {
                ...state,
                fetchStatus: false,
                prices: action.payload
            }
        case GET_SCHEDULED_SALES_SUCCESS:
            return {
                ...state,
                fetchStatus: false,
                sales: action.payload
            }
        case GET_SCHEDULED_MAPPRICES_SUCCESS:
            return {
                ...state,
                fetchStatus: false,
                mapPrices: action.payload
            }

        case SHOW_PRICE_MODAL:
            return {
                ...state,
                showPriceModal: true,
               priceModalData: action.payload
            }

        case CLOSE_PRICE_MODAL:
            return {
                ...state,
                showPriceModal: false
            }

        case STREAM_PRICE_MODAL_DATA:
            return {
                ...state,
                priceModalData: action.payload,
            }
        default:
            return state
    }
}


// Action Creators
function getScheduledPrices() {
    return {
        type: GET_SCHEDULED_PRICES,
    }
}

function addScheduledPrice() {
    return {
        type: ADD_SCHEDULED_PRICE
    }
}

function editScheduledPrice(){
    return{
        type:EDIT_SCHEDULED_PRICE
    }
}


function getScheduledPricesFailed() {
    return {
        type: GET_SCHEDULED_PRICES_FAILED
    }
}

function getScheduledPricesSuccess(payload) {
    return {
        type: GET_SCHEDULED_PRICES_SUCCESS,
        payload
    }
}

function getScheduledSalesSuccess(payload) {
    return {
        type: GET_SCHEDULED_SALES_SUCCESS,
        payload
    }
}

function getScheduledMapPricesSuccess(payload) {
    return {
        type: GET_SCHEDULED_MAPPRICES_SUCCESS,
        payload
    }
}


export function showPriceModal(payload = initialState.priceModalData) {
    return {
        type: SHOW_PRICE_MODAL,
       payload
    }
}

export function closePriceModal() {
    return {
        type: CLOSE_PRICE_MODAL
    }

}

export function streamPriceModalData(payload) {
    return {
        type: STREAM_PRICE_MODAL_DATA,
        payload
    }
}

export function setModalMode(payload) {
    return {
        type: SET_MODAL_MODE,
        payload
    }
}


// Side Effects

//Prices
export function initiateGetScheduledPrices() {
    return function sideEffect(dispatch) {
        dispatch(getScheduledPrices())
        fetch('http://localhost:8080/prices/getAll', {
            method: "GET"
        }).then(response => {
            if (!response.ok) {
                return dispatch(getScheduledPricesFailed())
            }

            response.json().then(prices => {
                dispatch(getScheduledPricesSuccess(prices))
                //Update prices in the local products with the new price
                dispatch(initiateGetProducts())

            })
        }).catch(error => console.log(error))
    }
}

export function initiateAddScheduledPrice(payload) {
    return function sideEffect(dispatch) {
        dispatch(addScheduledPrice())
        payload = {...payload, startDate: dateCorrection(payload.startDate), endDate: dateCorrection(payload.endDate)}
        fetch(`http://localhost:8080/prices/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("addPrice failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetScheduledPrices())
            } else {
                throw new Error("addprice text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(getScheduledPricesFailed())
        })
    }
}

export function initiateEditScheduledPrice(payload) {
    return function sideEffect(dispatch) {
        dispatch(editScheduledPrice())
        payload = {...payload, startDate: dateCorrection(payload.startDate), endDate: dateCorrection(payload.endDate)}
        fetch(`http://localhost:8080/prices/edit`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("editPrice failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetScheduledPrices())
            } else {
                throw new Error("editprice text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(getScheduledPricesFailed())
        })
    }
}

export function initiateDeleteScheduledPrice(payload) {
    return function sideEffect(dispatch) {
        dispatch(editScheduledPrice())
        fetch(`http://localhost:8080/prices/remove/` + payload, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("delete Price failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetScheduledPrices())
            } else {
                throw new Error("delete price text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(getScheduledPricesFailed())
        })
    }
}
//Sales
export function initiateGetScheduledSales() {
    return function sideEffect(dispatch) {
        dispatch(getScheduledPrices())
        fetch('http://localhost:8080/sales/getAll', {
            method: "GET"
        }).then(response => {
            if (!response.ok) {
                return dispatch(getScheduledPricesFailed())
            }

            response.json().then(sales => {
                dispatch(getScheduledSalesSuccess(sales))

                //Update prices in the local products with the new sale
                dispatch(initiateGetProducts())
            })
        }).catch(error => console.log(error))
    }
}



export function initiateAddScheduledSale(payload) {
    return function sideEffect(dispatch) {
        dispatch(addScheduledPrice())
        payload = {...payload, startDate: dateCorrection(payload.startDate), endDate: dateCorrection(payload.endDate)}
        fetch(`http://localhost:8080/sales/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("addSale failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetScheduledSales())
            } else {
                throw new Error("addsale text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(getScheduledPricesFailed())
        })
    }
}


export function initiateEditScheduledSale(payload) {
    return function sideEffect(dispatch) {
        dispatch(editScheduledPrice())
        payload = {...payload, startDate: dateCorrection(payload.startDate), endDate: dateCorrection(payload.endDate)}
        fetch(`http://localhost:8080/sales/edit`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("editSale failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetScheduledSales())
            } else {
                throw new Error("editsales text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(getScheduledPricesFailed())
        })
    }
}

export function initiateDeleteScheduledSale(payload) {
    return function sideEffect(dispatch) {
        dispatch(editScheduledPrice())
        fetch(`http://localhost:8080/sales/remove/` + payload, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("delete Sale failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetScheduledSales())
            } else {
                throw new Error("delete sale text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(getScheduledPricesFailed())
        })
    }
}

//MAP Prices
export function initiateGetScheduledMapPrices() {
    return function sideEffect(dispatch) {
        dispatch(getScheduledPrices())
        fetch('http://localhost:8080/maps/getAll', {
            method: "GET"
        }).then(response => {
            if (!response.ok) {
                return dispatch(getScheduledPricesFailed())
            }

            response.json().then(maps => {
                dispatch(getScheduledMapPricesSuccess(maps))

                //Update prices in the local products with the new Map price
                dispatch(initiateGetProducts())
            })
        }).catch(error => console.log(error))
    }
}



export function initiateAddScheduledMapPrice(payload) {
    return function sideEffect(dispatch) {
        dispatch(addScheduledPrice())
        payload = {...payload, startDate: dateCorrection(payload.startDate), endDate: dateCorrection(payload.endDate)}
        fetch(`http://localhost:8080/maps/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("addMapPrice failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetScheduledMapPrices())
            } else {
                throw new Error("addMap price text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(getScheduledPricesFailed())
        })
    }
}


export function initiateEditScheduledMapPrice(payload) {
    return function sideEffect(dispatch) {
        dispatch(editScheduledPrice())
        payload = {...payload, startDate: dateCorrection(payload.startDate), endDate: dateCorrection(payload.endDate)}
        fetch(`http://localhost:8080/maps/edit`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("edit map Price failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetScheduledMapPrices())
            } else {
                throw new Error("edit map price text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(getScheduledPricesFailed())
        })
    }
}

export function initiateDeleteScheduledMapPrice(payload) {
    return function sideEffect(dispatch) {
        dispatch(editScheduledPrice())
        fetch(`http://localhost:8080/maps/remove/` + payload, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("delete Map failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetScheduledMapPrices())
            } else {
                throw new Error("delete map price text parse failed")
            }
        }).catch(error => {
            console.log(error)
            dispatch(getScheduledPricesFailed())
        })
    }
}

