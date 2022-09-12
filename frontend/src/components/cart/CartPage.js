import {Link} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import CartItems from "./CartItems";
import {LinkContainer} from 'react-router-bootstrap'
import {MdArrowBackIosNew} from "react-icons/md";
import React from "react";

function CartPage({cartItems}) {
    let sum = 0;

    for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].salePrice > 0 ?
            sum += cartItems[i].salePrice * cartItems[i].qty
            :
            sum += cartItems[i].price * cartItems[i].qty
    }

    let totalSum = 10 + sum

    return <>
        <Container className='cartPage'>
            <div className='mt-5'>
                <Link to='/shop/products' className='continueLink'>
                    <MdArrowBackIosNew className='productArrow' size='18px'/>
                    Continue shopping
                </Link>
            </div>
            <Row xs={1} lg={2} className='mt-3 mb-5'>
                <Col>
                    {cartItems.map((product, index) => <CartItems key={index} product={product}/>)}
                </Col>
                <Col className='d-flex justify-content-center align-top mt-2'>
                    <div>
                        <h2>Order Summary</h2>
                        <h5>Subtotal: ${sum.toFixed(2)}</h5>
                        <h5>Shipping: {sum === 0 ? '$0.00' : '$10.00'}</h5>
                        <hr/>
                        <h4>Total: ${sum === 0 ? "0.00" : totalSum.toFixed(2)}</h4>
                        <LinkContainer to="/shop/cart/checkout">
                            <Button className='cartBtn' type='submit'>Continue to payment</Button>
                        </LinkContainer>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        cartItems: state.cartReducer.cartItems
    }
}

export default connect(mapStateToProps)(CartPage);