import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/customBootstrap.css'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import userReducer from './modules/user'
import productReducer from './modules/product'
import categoryReducer from './modules/category'
import cartReducer from './modules/cart'
import discountReducer from './modules/discount'
import orderHistoryReducer from './modules/orderHistory'
import shipmentReducer from './modules/shipments'
import schedulingReducer from './modules/scheduling'
import ScrollToTop from "./helpers/ScrollToTop";

const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    next(action)
}

const rootReducer = combineReducers({
    userReducer,
    productReducer,
    categoryReducer,
    cartReducer,
    discountReducer,
    orderHistoryReducer,
    shipmentReducer,
    schedulingReducer
})
const middleware = applyMiddleware(asyncMiddleware)
const store = createStore(rootReducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop/>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

