import {Button, Col} from "react-bootstrap";
import {connect} from "react-redux";
import {initiateAddToCart, initiateDeleteItem} from "../../modules/cart";
import {bindActionCreators} from "redux";
import {BsTrash} from "react-icons/bs";
import React from "react";


function CartItems({product, initiateDeleteItem, initiateAddToCart, currentUser}) {

    function handleDecrement(productQty) {
        if (productQty <= 0)
            return

        let dataProduct = {...product, qty: productQty}
        initiateAddToCart(dataProduct, currentUser)
    }

    function handleIncrement(productQty) {
        let dataProduct = {...product, qty: productQty}
        initiateAddToCart(dataProduct, currentUser)
    }

    return <>
        <Col className='mt-3'>
            <div className="d-flex  align-top">
                <div className="flex-shrink-0 d-flex justify-content-center">
                    <img className='cartImg img-fluid' src={product.image}/>
                </div>
                <div className="flex-grow-1 ms-3">
                    <h4>{product.name}</h4>
                    <div>
                        <Button className='qtyBtn' onClick={()=> handleDecrement(product.qty-1)}>-</Button>
                        <span>Quantity: {product.qty}</span>
                        <Button className='qtyBtn' onClick={()=> handleIncrement(product.qty+1)}>+</Button>
                    </div>
                    <Button className='removeBtn' variant='danger'
                            onClick={() => initiateDeleteItem(product.id, currentUser)}>
                        <BsTrash size='20px'/> Remove
                    </Button>
                    <div>{product.salePrice > 0 ?
                        <>
                            <h5>Price:
                                <span
                                className='ms-2 pe-2 cartSalePrice'>
                                        ${product.salePrice}
                                    </span>
                                <span
                                    className='cartOGPrice'>
                                        ${product.price}
                                    </span>
                            </h5>
                        </> : <><h5>Price: ${product.price}</h5></>}
                    </div>
                </div>
            </div>
        </Col>
        <hr/>
    </>
}

function mapStateToProps(state) {
    return {
        cartItems: state.cartReducer.cartItems,
        currentUser: state.userReducer.currentUser.id
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initiateDeleteItem, initiateAddToCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
