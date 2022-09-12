//ACTION
const GETTING_ORDER_HISTORY = 'shady-shack/orderHistory/GETTING_ORDER_HISTORY'
const GET_ORDER_HISTORY = 'shady-shack/orderHistory/GET_ORDER_HISTORY'



//REDUCER
const initialState = {
    orderHistory: [
        {
            id: '',
            customerId: '',
            cartSnapshot: [
                {
                    productId: '',
                    quantity: '',
                    price: ''
                }
            ],
            orderDate: '',
            priceSnapshot: ''
        }
    ]
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GETTING_ORDER_HISTORY:
            return {
                ...state
            }

        case GET_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: action.payload
            }

        default:
            return state
    }

}


//ACTION_CREATOR
function gettingOrderHistory() {
    return {
        type: GETTING_ORDER_HISTORY
    }
}

function getOrderHistory(orderHistoryInfo) {
    return {
        type: GET_ORDER_HISTORY,
        payload: orderHistoryInfo
    }
}

//SIDE_EFFECT

export function initiateGetOrderHistory(id){
    return function sideEffect(dispatch) {
        dispatch(gettingOrderHistory())
        fetch(`http://localhost:8080/orderHistory/getByCustomerId/${id}`, {
            method: "GET",
        }).then(
            response => {
                if (!response.ok)
                    throw new Error("getOrderHistory Failed")
                return response.json().then(
                    orderHistoryInfo => {
                        dispatch(getOrderHistory(orderHistoryInfo))
                    }
                )
            }
        ).catch(error => console.log(error))
    }
}
