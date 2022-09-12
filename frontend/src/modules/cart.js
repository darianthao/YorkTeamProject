// Actions
const SET_CART = 'shady-shack/cart/SET_CART'
const RESET_CART = 'shady-shack/cart/RESET_CART'
const ADD_TO_CART = 'shady-shack/cart/ADD_TO_CART'
const DELETE_CART_ITEM = 'shady-shack/cart/DELETE_CART_ITEM'
const UPDATE_QTY = 'shady-shack/cart/UPDATE_QTY'
const SET_CART_QTY = 'shady-shack/cart/SET_CART_QTY'
const SAVE_CART_REQUEST = 'shady-shack/cart/SAVE_CART_REQUEST'
const SAVE_SUCCESS = 'shady-shack/cart/SAVE_SUCCESS'
const SAVE_FAIL = 'shady-shack/cart/SAVE_FAIL'
const ORDER_INFO_SAVED = 'shady-shack/cart/ORDER_INFO_SAVED'

// Reducer
const initialState = {
    cartItems: [],
    cartQty: 0,
    fetchStatus: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                cartItems: action.payload
            }
        case RESET_CART:
            return {
                ...state,
                cartItems: initialState.cartItems
            }
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        case DELETE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.productId)
            }
        case UPDATE_QTY:
            return {
                ...state,
                cartItems: action.array
            }
        case SET_CART_QTY:
            return {
                ...state,
                cartQty: action.count
            }
        case SAVE_CART_REQUEST:
            return {
                ...state,
                fetchStatus: true
            }
        case SAVE_SUCCESS:
            return {
                ...state,
                fetchStatus: false
            }
        case SAVE_FAIL:
            return {
                ...state,
                fetchStatus: false
            }
        case ORDER_INFO_SAVED:
            return {
                ...state
            }
        default:
            return state
    }
}

// Action Creators
function setCart(payload) {
    return {
        type: SET_CART,
        payload
    }
}

function resetCart() {
    return {
        type: RESET_CART
    }
}

function addToCart(payload) {
    return {
        type: ADD_TO_CART,
        payload
    }
}

function deleteCartItem(productId) {
    return {
        type: DELETE_CART_ITEM,
        productId
    }
}

function saveCartRequest() {
    return {
        type: SAVE_CART_REQUEST
    }
}

function saveSuccess() {
    return {
        type: SAVE_SUCCESS
    }
}

function saveFail() {
    return {
        type: SAVE_FAIL
    }
}

function orderInfoSaved() {
    return {
        type: ORDER_INFO_SAVED
    }
}

function updateQty(array) {
    return {
        type: UPDATE_QTY,
        array
    }
}

function setCartQty(count) {
    return {
        type: SET_CART_QTY,
        count
    }
}

// Side Effects
export function initializeSetCart(payload, userId) {
    return function sideEffect(dispatch, getState) {
        //payload is array of objects [{productId: 0, quantity: 0, price: 0}, ...]
        //products is array of objects [{id:, ... }]
        const products = [...getState().productReducer.products]
        const guestCart = [...getState().cartReducer.cartItems]
        const userCart = []
        const cartArray = []
        payload.forEach(element => {
            if (products.some(productItem => element.productId === productItem.id)) {
                let productObj = products.filter(productItem => element.productId === productItem.id)[0]
                productObj = {...productObj, qty: element.quantity}
                userCart.push(productObj)
            }
        })
        guestCart.forEach(guestItem => {
            let index = userCart.findIndex(element => element.id === guestItem.id)
            if (index >= 0) {
                let userItem = userCart.splice(index, 1)
                let combinedItem = {...guestItem, qty: guestItem.qty + userItem[0].qty}
                cartArray.push(combinedItem)
            } else {
                cartArray.push(guestItem)
            }
        })
        userCart.forEach(remainingItem => {
            cartArray.push(remainingItem)
        })
        dispatch(setCart(cartArray))
        dispatch(computeCartQty())
        dispatch(saveUserCart(userId))
    }
}

export function initializeResetCart() {
    return function sideEffect(dispatch) {
        dispatch(resetCart())
        dispatch(computeCartQty())
    }
}

export function initiateAddToCart(product, userId) {
    return function sideEffect(dispatch, getState) {
        let cartItems = [...getState().cartReducer.cartItems] // careful to not access state array pointer!
        let index = cartItems.findIndex(element => element.id === product.id)
        if (index >= 0) {
            cartItems.splice(index, 1, product)
            dispatch(updateQty(cartItems))
        } else {
            dispatch(addToCart(product))
        }
        dispatch(computeCartQty())
        dispatch(saveUserCart(userId))
    }
}

export function initiateDeleteItem(productId, userId) {
    return function sideEffect(dispatch) {
        dispatch(deleteCartItem(productId))
        dispatch(computeCartQty())
        dispatch(saveUserCart(userId))
    }
}

function computeCartQty() {
    return function sideEffect(dispatch, getState) {
        const cartItems = [...getState().cartReducer.cartItems]
        let count = 0;
        cartItems.forEach(item => {
            count += item.qty
        })
        dispatch(setCartQty(count))
    }
}

function saveUserCart(userId) {
    return function sideEffect(dispatch, getState) {
        if (userId !== undefined) {
            let cartItems = getState().cartReducer.cartItems
            let userCart = cartItems.map((item) => {
                return {
                    productId: item.id,
                    quantity: item.qty,
                    price: item.price
                }
            })
            dispatch(saveCartRequest())
            fetch(`http://localhost:8080/users/editCart/${userId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userCart)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Server error status: ${response.status}`)
                }
                return response.text()
            }).then(text => {
                if (text === 'success') {
                    dispatch(saveSuccess())
                } else {
                    throw new Error('Server error: user cart not saved')
                }
            }).catch(error => {
                dispatch(saveFail())
                console.log(`Error in "saveUserCart"--> ${error.message}`)
            })
        }
    }
}

export function sendOrderHistory(userId, totalSum) {
    return function sideEffect(dispatch, getState) {
        if (totalSum > 0) {
            if (userId === undefined) {
                userId = 0
            }

            let cartItems = getState().cartReducer.cartItems
            let cartSnapshot = cartItems.map((item) => {
                return {
                    productId: item.id,
                    quantity: item.qty,
                    price: item.price,
                }
            })
            let orderInfo = {
                customerId: userId,
                cartSnapshot: cartSnapshot,
                priceSnapshot: totalSum
            }
            fetch('http://localhost:8080/orderHistory/checkout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(orderInfo)
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Order history not sent')
                }
                return response.text()
            }).then(text => {
                if (text === 'success') {
                    dispatch(orderInfoSaved())
                    dispatch(initializeResetCart())
                } else {
                    throw new Error('Something went wrong - order not saved')
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

