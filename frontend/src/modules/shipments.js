import {initiateGetProducts} from "./product";

const GET_SHIPMENTS = 'shady-shack/shipments/GET_SHIPMENTS'
const ADD_SHIPMENT = 'shady-shack/shipments/ADD_SHIPMENT'
const GET_SHIPMENTS_FAILED = 'shady-shack/shipments/GET_SHIPMENTS_FAILED'
const GET_SHIPMENTS_SUCCESS = 'shady-shack/shipments/GET_SHIPMENTS_SUCCESS'
const SHOW_SHIPMENT_MODAL = 'shady-shack/shipments/SHOW_SHIPMENT_MODAL'
const CLOSE_SHIPMENT_MODAL = 'shady-shack/shipments/CLOSE_SHIPMENT_MODAL'
const STREAM_MODAL_DATA = 'shady-shack/shipments/STREAM_MODAL_DATA'

// Reducer
const initialState = {
    shipments: [{id: 0,
        productId: 0,
        purchaseDate: "",
        pricePerItem: 0,
        quantity: 0}],
    fetchStatus: false,
    showModal: false,
    modalData : {id: 0,
        productId: 0,
        purchaseDate: "",
        pricePerItem: 0,
        quantity: 0}
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_SHIPMENTS:
            return {
                ...state,
                fetchStatus: true
            }
        case ADD_SHIPMENT:
            return {
                ...state,
                fetchStatus: true,
            }
        case GET_SHIPMENTS_FAILED:
            return {
                ...state,
                fetchStatus: false
            }
        case GET_SHIPMENTS_SUCCESS:
            return {
                ...state,
                fetchStatus: false,
                shipments: action.payload
            }

        case SHOW_SHIPMENT_MODAL:
            return {
                ...state,
                showModal: true
            }

        case CLOSE_SHIPMENT_MODAL:
            return {
                ...state,
                showModal: false
            }

        case STREAM_MODAL_DATA:
            return {
                ...state,
                modalData: action.payload,
            }
        default:
            return state
    }
}


// Action Creators
function getShipments() {
    return {
        type: GET_SHIPMENTS,
    }
}

function addShipments() {
    return {
        type: ADD_SHIPMENT,
    }
}


function getShipmentsFailed() {
    return {
        type: GET_SHIPMENTS_FAILED
    }
}

function getShipmentsSuccess(payload) {
    return {
        type: GET_SHIPMENTS_SUCCESS,
        payload
    }
}



export function showModal() {
    return {
        type: SHOW_SHIPMENT_MODAL
    }
}

export function closeModal() {
    return {
        type: CLOSE_SHIPMENT_MODAL
    }

}

export function streamModalData(payload) {
    return {
        type: STREAM_MODAL_DATA,
        payload
    }
}


// Side Effects
export function initiateGetShipments() {
    return function sideEffect(dispatch) {
        dispatch(getShipments())
        fetch('http://localhost:8080/shipmentHistory/getAll', {
            method: "GET"
        }).then(response => {
            if (!response.ok) {
                return dispatch(getShipmentsFailed())
            }

            response.json().then(shipments => {
                dispatch(initiateGetProducts())
                dispatch(getShipmentsSuccess(shipments))
            })
        }).catch(error => console.log(error))
    }
}



export function initiateAddShipment(payload) {
    return function sideEffect(dispatch) {
        dispatch(addShipments())
        fetch(`http://localhost:8080/shipmentHistory/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error("addShipment failed")
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetShipments())
            } else {
                throw new Error("addShipment text parse failed")
            }
        }).catch(error => {
            console.log(error)
        })
    }
}

