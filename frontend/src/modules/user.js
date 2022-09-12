// Actions
import {initializeSetCart, initializeResetCart} from "./cart";

const REGISTER_REQUEST = 'shady-shack/user/REGISTER_REQUEST'
const REGISTER_SUCCESS = 'shady-shack/user/REGISTER_SUCCESS'
const RESET_REGISTER_SUCCESS = 'shady-shack/user/RESET_REGISTER_SUCCESS'
const REGISTER_FAILURE = 'shady-shack/user/REGISTER_FAILURE'
const LOGIN_REQUEST = 'shady-shack/user/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'shady-shack/user/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'shady-shack/user/LOGIN_FAILURE'
const LOGOUT = 'shady-shack/user/LOGOUT'
const CLOSE_MESSAGE_TOAST = 'shady-shack/user/CLOSE_MESSAGE_TOAST'

const GET_USERS = 'shady-shack/user/GET_USERS'
const ADD_USER = 'shady-shack/user/ADD_USER'
const DELETE_USER = 'shady-shack/user/DELETE_USER'
const EDIT_USER = 'shady-shack/user/EDIT_USER'
const FETCH_SUCCESS = 'shady-shack/user/FETCH_SUCCESS'
const FETCH_FAIL = 'shady-shack/user/FETCH_FAIL'
const SHOW_MODAL = 'shady-shack/user/SHOW_MODAL'
const CLOSE_MODAL = 'shady-shack/user/CLOSE_MODAL'
const STREAM_MODAL_DATA = 'shady-shack/user/STREAM_MODAL_DATA'
const FETCH_PROFILE_START = 'shady-shack/user/FETCH_PROFILE_START'
const FETCH_PROFILE_SUCCESS = 'shady-shack/user/FETCH_PROFILE_SUCCESS'
const FETCH_PROFILE_FAIL = 'shady-shack/user/FETCH_PROFILE_FAIL'
const START_EDIT_PROFILE = 'shady-shack/user/START_EDIT_PROFILE'
const FINISH_EDIT_PROFILE = 'shady-shack/user/FINISH_EDIT_PROFILE'
const SET_CUSTOMER_DATA = 'shady-shack/user/SET_CUSTOMER_DATA'
const START_DELETE_PROFILE = 'shady-shack/user/START_DELETE_PROFILE'
const EXIT_DELETE_PROFILE = 'shady-shack/user/EXIT_DELETE_PROFILE'
const DELETE_PROFILE_SUCCESS = 'shady-shack/user/DELETE_PROFILE_SUCCESS'
const DELETE_PROFILE_FAIL = 'shady-shack/user/DELETE_PROFILE_FAIL'

// Reducer
const initialState = {
    registerRequest: false,
    registerSuccess: false,
    loginRequest: false,
    messageToast: {showFlag: false, variant: '', title: '', message: ''},
    isLoggedIn: false,
    currentUser: {},
    users: [],
    fetchStatus: false,
    showModalFlag: false,
    modalData: {
        id: -1,
        accountType: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: ''
    },
    customerModalData: {
        id: -1,
        accountType: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: ''
    },
    fetchProfileStatus: false,
    showEditProfile: false,
    showDeleteProfile: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                registerRequest: true,
                messageToast: initialState.messageToast
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerRequest: false,
                registerSuccess: true,
                messageToast: {showFlag: true, variant: 'primary', title: 'Registration Successful', message: ''}
            }
        case RESET_REGISTER_SUCCESS:
            return {
                ...state,
                registerSuccess: false
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                registerRequest: false,
                messageToast: {showFlag: true, variant: 'danger', title: 'Registration Error', message: action.message}
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true,
                messageToast: initialState.messageToast
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginRequest: false,
                messageToast: {showFlag: true, variant: 'primary', title: 'Login Successful', message: ''},
                isLoggedIn: true
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loginRequest: false,
                messageToast: {showFlag: true, variant: 'danger', title: 'Login Error', message: action.message}
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                currentUser: initialState.currentUser,
                messageToast: {showFlag: true, variant: 'primary', title: 'Logged Out', message: ''}
            }
        case CLOSE_MESSAGE_TOAST:
            return {
                ...state,
                messageToast: initialState.messageToast
            }
        case GET_USERS:
            return {
                ...state,
                fetchStatus: true
            }
        case ADD_USER:
            return {
                ...state,
                fetchStatus: true
            }
        case DELETE_USER:
            return {
                ...state,
                fetchStatus: true
            }
        case EDIT_USER:
            return {
                ...state,
                fetchStatus: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                fetchStatus: false,
                users: action.payload
            }
        case FETCH_FAIL:
            return {
                ...state,
                fetchStatus: false,
                messageToast: {showFlag: true, variant: 'danger', title: action.title, message: action.message}
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
        case FETCH_PROFILE_START:
            return {
                ...state,
                fetchProfileStatus: true
            }
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                fetchProfileStatus: false,
                currentUser: action.payload,
                customerModalData: action.payload
            }
        case FETCH_PROFILE_FAIL:
            return {
                ...state,
                fetchProfileStatus: false
            }
        case START_EDIT_PROFILE:
            return {
                ...state,
                showEditProfile: true
            }
        case FINISH_EDIT_PROFILE:
            return {
                ...state,
                showEditProfile: false
            }
        case SET_CUSTOMER_DATA:
            return {
                ...state,
                customerModalData: action.payload
            }
        case START_DELETE_PROFILE:
            return {
                ...state,
                showDeleteProfile: true
            }
        case EXIT_DELETE_PROFILE:
            return {
                ...state,
                showDeleteProfile: false
            }
        case DELETE_PROFILE_SUCCESS:
            return {
                ...state,
                showDeleteProfile: false,
                currentUser: initialState.currentUser,
                customerModalData: initialState.customerModalData,
                isLoggedIn: false,
                messageToast: {showFlag: true, variant: 'primary', title: 'Account Successfully Deleted', message: ''}
            }
        case DELETE_PROFILE_FAIL:
            return {
                ...state,
                showDeleteProfile: false,
                messageToast: {
                    showFlag: true,
                    variant: 'danger',
                    title: 'Unable to Delete Account',
                    message: action.message
                }
            }
        default:
            return state
    }
}

// Action Creators
function registerRequest() {
    return {
        type: REGISTER_REQUEST
    }
}

function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    }
}

export function resetRegisterSuccess() {
    return {
        type: RESET_REGISTER_SUCCESS
    }
}

function registerFailure(message) {
    return {
        type: REGISTER_FAILURE,
        message
    }
}

function loginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

function loginFailure(message) {
    return {
        type: LOGIN_FAILURE,
        message
    }
}

function logout() {
    return {
        type: LOGOUT
    }
}

export function closeMessageToast() {
    return {
        type: CLOSE_MESSAGE_TOAST
    }
}

function getUsers() {
    return {
        type: GET_USERS
    }
}

function addUser() {
    return {
        type: ADD_USER
    }
}

function deleteUser() {
    return {
        type: DELETE_USER
    }
}

function editUser() {
    return {
        type: EDIT_USER
    }
}

function fetchSuccess(payload) {
    return {
        type: FETCH_SUCCESS,
        payload
    }
}

function fetchFail(message) {
    return {
        type: FETCH_FAIL,
        title: message.title,
        message: message.message
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

function fetchProfileStart() {
    return {
        type: FETCH_PROFILE_START
    }
}

function fetchProfileSuccess(payload) {
    return {
        type: FETCH_PROFILE_SUCCESS,
        payload
    }
}

function fetchProfileFail() {
    return {
        type: FETCH_PROFILE_FAIL
    }
}

export function startEditProfile() {
    return {
        type: START_EDIT_PROFILE
    }
}

export function finishEditProfile() {
    return {
        type: FINISH_EDIT_PROFILE
    }
}

export function setCustomerData(data) {
    return {
        type: SET_CUSTOMER_DATA,
        payload: data
    }
}

export function startDeleteProfile() {
    return {
        type: START_DELETE_PROFILE
    }
}

export function exitDeleteProfile() {
    return {
        type: EXIT_DELETE_PROFILE
    }
}

function deleteProfileSuccess() {
    return {
        type: DELETE_PROFILE_SUCCESS
    }
}

function deleteProfileFail(message) {
    return {
        type: DELETE_PROFILE_FAIL,
        message
    }
}

// Side Effects
export function initiateLogin(credentials) {
    return function sideEffect(dispatch) {
        dispatch(loginRequest())
        if (credentials.email === '' || credentials.password === '') {
            dispatch(loginFailure("Email and password are required"))
            return
        }
        fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server error status: ${response.status}`)
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetCurrentUser(credentials.email))
                dispatch(loginSuccess())
            } else if (text === 'fail') {
                throw new Error('Incorrect email or password')
            } else {
                throw new Error('Server error: unexpected response')
            }
        }).catch(loginError => {
            dispatch(loginFailure(loginError.message))
        })
    }
}

export function initiateRegister(customerInfo) {
    return function sideEffect(dispatch) {
        dispatch(registerRequest())
        if (customerInfo.email === '' || customerInfo.password === '') {
            dispatch(registerFailure("Email and password are required"))
            return
        }
        fetch('http://localhost:8080/users/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customerInfo)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server error status: ${response.status}`)
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(registerSuccess())
            } else if (text === 'email already exists') {
                throw new Error('Email address is already in use, please choose another.')
            } else {
                throw new Error('Server error: unexpected response')
            }
        }).catch(registerError => {
            dispatch(registerFailure(registerError.message))
        })
    }
}

export function initiateLogout() {
    return function sideEffect(dispatch) {
        dispatch(logout())
        dispatch(initializeResetCart())
    }
}

export function initiateGetUsers() {
    return function sideEffect(dispatch) {
        dispatch(getUsers())
        fetch('http://localhost:8080/users/getAll', {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server error status: ${response.status}`)
            }
            return response.json()
        }).then(users => {
            dispatch(fetchSuccess(users))
        }).catch(error => {
            dispatch(fetchFail({title: "Get Users Failed:", message: error.message}))
        })
    }
}

export function initiateAddUser(payload) {
    return function sideEffect(dispatch) {
        dispatch(addUser())
        fetch('http://localhost:8080/users/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server error status: ${response.status}`)
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetUsers())
            } else if (text === 'email already exists') {
                throw new Error('Email address is already in use, please choose another.')
            } else {
                throw new Error('Server error: unexpected response')
            }
        }).catch(error => {
            dispatch(fetchFail({title: "Add User Failed:", message: error.message}))
        })
    }
}

export function initiateDeleteUser(id) {
    return function sideEffect(dispatch) {
        dispatch(deleteUser())
        fetch(`http://localhost:8080/users/remove/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server error status: ${response.status}`)
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetUsers())
            } else if (text === 'user does not exist') {
                throw new Error('User not found in database.')
            } else {
                throw new Error('Server error: unexpected response')
            }
        }).catch(error => {
            dispatch(fetchFail({title: "Delete User Failed:", message: error.message}))
        })
    }
}

export function initiateEditUser(payload) {
    return function sideEffect(dispatch, getState) {
        dispatch(editUser())
        fetch('http://localhost:8080/users/edit', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server error status: ${response.status}`)
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetUsers())
                if (payload.id === getState().userReducer.currentUser.id) {
                    dispatch(initiateGetCurrentUser(payload.email)) // updates current user object for admin self-edit
                }
            } else if (text === 'email address unavailable') {
                throw new Error('Email address is already in use, please choose another.')
            } else if (text === 'user does not exist') {
                throw new Error('User not found in database.')
            } else {
                throw new Error('Server error: unexpected response')
            }
        }).catch(error => {
            dispatch(fetchFail({title: "Edit User Failed:", message: error.message}))
        })
    }
}

export function initiateGetCurrentUser(email) {
    return function sideEffect(dispatch) {
        dispatch(fetchProfileStart())
        fetch(`http://localhost:8080/users/get/${email}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server error status: ${response.status}`)
            }
            return response.json()
        }).then(user => {
            dispatch(fetchProfileSuccess(user))
            dispatch(initializeSetCart(user.cart, user.id))
        }).catch(error => {
            dispatch(fetchProfileFail({title: "Get Current User Failed:", message: error.message}))
        })
    }
}

export function initiateEditCustomer(payload) {
    return function sideEffect(dispatch) {
        dispatch(editUser())
        fetch('http://localhost:8080/users/edit', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server error status: ${response.status}`)
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(initiateGetCurrentUser(payload.email))
            } else if (text === 'email address unavailable') {
                throw new Error('Email address is already in use, please choose another.')
            } else if (text === 'user does not exist') {
                throw new Error('User not found in database.')
            } else {
                throw new Error('Server error: unexpected response')
            }
        }).catch(error => {
            dispatch(fetchFail({title: "Edit Profile Failed:", message: error.message}))
        })
    }
}

export function initiateDeleteOwnAccount(id) {
    return function sideEffect(dispatch) {
        fetch(`http://localhost:8080/users/remove/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server error status: ${response.status}`)
            }
            return response.text()
        }).then(text => {
            if (text === 'success') {
                dispatch(deleteProfileSuccess())
            } else if (text === 'user does not exist') {
                throw new Error('User not found in database.')
            } else {
                throw new Error('Server error: unexpected response')
            }
        }).catch(error => {
            dispatch(deleteProfileFail(error.message))
        })
    }
}