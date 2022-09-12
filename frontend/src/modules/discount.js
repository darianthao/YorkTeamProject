// Actions
import {dateCorrection} from "../helpers/dateCorrection";

const SHOW_MODAL = 'shady-shack/discount/SHOW_MODAL'
const CLOSE_MODAL = 'shady-shack/discount/CLOSE_MODAL'
const ADDING_COUPON = 'shady-shack/discount/ADDING_COUPON'
const ADD_COUPON = 'shady-shack/discount/ADD_COUPON'
const ADD_COUPON_FAILED = 'shady-shack/discount/ADD_COUPON_FAILED'
const GETTING_COUPON = 'shady-shack/discount/GETTING_COUPON'
const GETTING_COUPON_FAILED = 'shady-shack/discount/GETTING_COUPON_FAILED'
const COUPONS_UPDATED = 'shady-shack/discount/COUPONS_UPDATED'
const DELETING_COUPON = 'shady-shack/discount/DELETING_COUPON'
const DELETE_COUPON_FAILED = 'shady-shack/discount/DELETE_COUPON_FAILED'
const EDITING_COUPON = 'shady-shack/discount/EDITING_COUPON'
const EDIT_COUPON_FAILED = 'shady-shack/discount/EDIT_COUPON_FAILED'
const EDIT_COUPON = 'shady-shack/discount/EDIT_COUPON'
const SHOW_EDIT_MODAL = 'shady-shack/discount/SHOW_EDIT_MODAL'
const CLOSE_EDIT_MODAL = 'shady-shack/discount/CLOSE_EDIT_MODAL'
const ACTIVE_COUPONS_UPDATED = 'shady-shack/discount/ACTIVE_COUPONS_UPDATED'
const STREAM_MODAL_DATA = 'shady-shack/discount/STREAM_MODAL_DATA'


// Reducer
const initialState = {
    showModalFlag: false,
    modalData: {
        couponCode: "",
        discount: "",
        startDate: "",
        endDate: ""
    },
    gettingCoupon: false,
    coupons: [],
    activeCoupons: [],
    showEditModalFlag: false,
    editCoupon: {
        couponName: '',
        discount: '',
        startDate: '',
        endDate: ''
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                showModalFlag: true
            }

        case CLOSE_MODAL:
            return {
                ...state,
                showModalFlag: false,
                modalData: {
                    couponCode: "",
                    discount: "",
                    startDate: "",
                    endDate: ""
                }
            }

        case ADDING_COUPON:
            return {
                ...state,
                showModalFlag: false,
            }
        case ADD_COUPON:
            return {
                ...state,
                modalData: {
                    couponName: "",
                    discountAmount: "",
                    startDate: "",
                    endDate: ""
                },
                showModalFlag: false
            }

        case GETTING_COUPON:
            return {
                ...state,
                gettingCoupon: true
            }

        case GETTING_COUPON_FAILED:
            return {
                ...state
            }

        case COUPONS_UPDATED:
            return {
                ...state,
                coupons: action.payload
            }
        case DELETING_COUPON:
            return {
                ...state,
            }

        case DELETE_COUPON_FAILED:
            return {
                ...state,
            }

        case EDITING_COUPON:
            return {
                ...state,
            }

        case EDIT_COUPON_FAILED:
            return {
                ...state,
            }
        case EDIT_COUPON:
            return {
                ...state,
                showEditModalFlag: true
            }
        case SHOW_EDIT_MODAL:
            return {
                ...state,
                showEditModalFlag: true,
                modalData: action.payload
            }

        case CLOSE_EDIT_MODAL:
            return {
                ...state,
                showEditModalFlag: false
            }

        case ACTIVE_COUPONS_UPDATED:
            return {
                ...state,
                activeCoupons: action.payload
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
export function showModal() {
    return {
        type: SHOW_MODAL,
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
    }
}

export function addingCoupon() {
    return {
        type: ADDING_COUPON,
    }
}

export function addCoupon(coupon) {
    return {
        type: ADD_COUPON,
        payload: coupon
    }
}

function addCouponFailed() {
    return {
        type: ADD_COUPON_FAILED
    }
}

function gettingCoupon() {
    return {
        type: GETTING_COUPON
    }
}

function gettingCouponFailed() {
    return {
        type: GETTING_COUPON_FAILED
    }
}

function couponsUpdated(coupons) {
    return {
        type: COUPONS_UPDATED,
        payload: coupons
    }
}

function deletingCoupon() {
    return {
        type: DELETING_COUPON
    }
}

function deleteCouponFailed() {
    return {
        type: DELETE_COUPON_FAILED
    }

}

function editingCoupon() {
    return {
        type: EDITING_COUPON
    }
}

function editCouponFailed() {
    return {
        type: EDIT_COUPON_FAILED
    }
}

function activeCouponsUpdated(payload) {
    return {
        type: ACTIVE_COUPONS_UPDATED,
        payload
    }
}

export function editCoupon() {
    return {
        type: EDIT_COUPON
    }
}

export function showEditModal(coupon) {
    return {
        type: SHOW_EDIT_MODAL,
        payload: coupon
    }
}

export function closeEditModal() {
    return {
        type: CLOSE_EDIT_MODAL
    }
}

export function streamModalData(payload) {
    return {
        type: STREAM_MODAL_DATA,
        payload
    }
}

//SideEffects

export function initiateGetCoupons() {
    return function sideEffect(dispatch) {
        dispatch(gettingCoupon())
        fetch("http://localhost:8080/coupons/getAll", {
            method: "GET",
        }).then(
            response => {
                if (!response.ok)
                    return dispatch(gettingCouponFailed())
                response.json().then(
                    coupons => {
                        dispatch(couponsUpdated(coupons))
                    }
                )
            }
        ).catch(error => console.log(error))
    }

}

export function initiateAddCoupon(couponInfo) {
    return function sideEffect(dispatch) {
        dispatch(addingCoupon())
        fetch("http://localhost:8080/coupons/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(couponInfo)

        }).then(
            response => {

                if (!response.ok)
                    return dispatch(addCouponFailed())
                response.text().then(
                    text => {

                        if (text === "success")
                            dispatch(initiateGetCoupons())
                        else
                            dispatch(addCouponFailed())
                    }
                ).catch(error => console.log(error))
            }
        )
    }
}

export function initiateDeleteCoupon(couponId) {
    return function sideEffect(dispatch) {
        dispatch(deletingCoupon())
        fetch(`http://localhost:8080/coupons/remove/${couponId}`, {
            method: "DELETE"
        }).then(
            response => {
                if (!response.ok)
                    return dispatch(deleteCouponFailed())
                response.text().then(
                    text => {
                        if (text === "success")
                            dispatch(initiateGetCoupons())
                        else
                            dispatch(deleteCouponFailed())
                    }
                )
            }
        ).catch(error => console.log(error))
    }

}

export function initiateEditCoupon(coupon) {
    return function sideEffect(dispatch) {
        dispatch(editingCoupon(coupon))
        coupon = {...coupon, startDate: dateCorrection(coupon.startDate), endDate: dateCorrection(coupon.endDate)}
        fetch("http://localhost:8080/coupons/edit", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(coupon)
        }).then(response => {
                if (!response.ok)
                    return dispatch(editCouponFailed())
                response.text().then(
                    text => {
                        if (text === "success")
                            dispatch(initiateGetCoupons())
                        else
                            dispatch(editCouponFailed())
                    }
                )
            }
        )
    }
}

export function initiateGetActiveCoupons() {
    return function sideEffect(dispatch) {
        dispatch(gettingCoupon())
        fetch("http://localhost:8080/coupons/getAllActive", {
            method: "GET",
        }).then(
            response => {
                if (!response.ok)
                    return dispatch(gettingCouponFailed())
                response.json().then(
                    activeCoupons => {
                        dispatch(activeCouponsUpdated(activeCoupons))
                    }
                )
            }
        ).catch(error => console.log(error))
    }
}

