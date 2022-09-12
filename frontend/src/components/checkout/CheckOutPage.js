import {Button, Col, Container, Form, Row} from "react-bootstrap";
import CheckoutItems from "../checkout/CheckoutItems";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendOrderHistory} from "../../modules/cart";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {initiateGetActiveCoupons} from "../../modules/discount";
import {MdArrowBackIosNew} from "react-icons/md";
import FormStateSelector from "../../helpers/FormStateSelector";

function CheckOutPage({cartItems, sendOrderHistory, currentUser, initiateGetActiveCoupons, activeCoupons}) {
    const [couponCode, setCouponCode] = useState('')
    const [newSum, setNewSum] = useState(0)

    useEffect(initiateGetActiveCoupons, [])

    let sum = 0;

    for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].salePrice > 0 ? sum += cartItems[i].salePrice * cartItems[i].qty : sum += cartItems[i].price * cartItems[i].qty
    }

    let totalSum = 10 + sum - newSum

    function handleCouponSubmit(activeCoupons) {
        const couponData = activeCoupons.filter(coupon => coupon.couponCode === couponCode)
        if (couponData.length !== 0) {
            const discount = couponData[0].discount
            if (discount > 0) {
                setNewSum(sum * (discount / 100))
            }
        } else {
            setNewSum(0)
        }
    }

    const [fName, setFName] = useState(currentUser.firstName),
        [lName, setLName] = useState(currentUser.lastName),
        [shipAddress, setShipAddress] = useState(currentUser.address1),
        [shipAddress2, setShipAddress2] = useState(currentUser.address2),
        [shipCity, setShipCity] = useState(currentUser.city),
        [shipState, setShipState] = useState(currentUser.state),
        [shipZip, setShipZip] = useState(currentUser.zipCode),
        [ccNumber, setCCNumber] = useState(''),
        [cvvCode, setCVVCode] = useState(''),
        [billZip, setBillZip] = useState('');

    function handleStatePicker(e) {
        setShipState(e.target.value)
    }

    return <>
        <Container>
            <div className='mt-5'>
                <Link to='/shop/cart' className='continueLink'>
                    <MdArrowBackIosNew className='productArrow' size='18px'/>
                    Go back to cart
                </Link>
            </div>
            <Row xs={1} lg={2}>
                <Col className='mb-5'>
                    <h2 className='mt-3'>Cart Summary</h2>
                    {cartItems.map((product, index) => <CheckoutItems key={index} product={product}/>)}
                </Col>
                <Col xs={6}>
                    <Row className='my-3'>
                        <Col>
                            <div className='d-flex justify-content-start'>
                                <Form.Group className="my-3 px-2" controlId="couponCode">
                                    <Form.Label>
                                        <h2>Order Summary</h2>
                                        <h5>Subtotal: ${sum.toFixed(2)}</h5>
                                        <h5>Discount: ${newSum.toFixed(2)}</h5>
                                        <h5>Shipping: {sum === 0 ? '$0.00' : '$10.00'}</h5>
                                        <hr/>
                                        <h4>Total: ${sum === 0 ? "0.00" : totalSum.toFixed(2)}</h4></Form.Label>

                                </Form.Group>
                            </div>
                        </Col>
                        <Col className='mt-3'>
                            <h2>Coupon Code</h2>
                            <Form.Control className='mt-2' type="text" placeholder='Enter coupon code here'
                                          defaultValue={couponCode}
                                          onChange={event => setCouponCode(event.target.value)}/>

                            <Button className='applyBtn mt-3 d-block' variant="primary" type="submit"
                                    onClick={() => handleCouponSubmit(activeCoupons)}>Apply</Button>
                        </Col>

                        <hr/>
                    </Row>
                    <Row className='mt-3 mb-5'>
                        <Form>
                            <Form.Group>
                                <Form.Label><h2>Shipping information</h2></Form.Label>
                            </Form.Group>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control type="text"
                                                  value={fName}
                                                  onChange={(e) => setFName(e.target.value)}
                                                  placeholder="First name"/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control type="text"
                                                  value={lName}
                                                  onChange={(e) => setLName(e.target.value)}
                                                  placeholder="Last name"/>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St"
                                              value={shipAddress}
                                              onChange={(e) => setShipAddress(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control placeholder="Apartment, studio, or floor" value={shipAddress2}
                                              onChange={e => setShipAddress2(e.target.value)}/>
                            </Form.Group>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control placeholder="City"
                                                  value={shipCity}
                                                  onChange={(e) => setShipCity(e.target.value)}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <FormStateSelector value={shipState} changeFunction={handleStatePicker}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control placeholder="Zip code"
                                                  value={shipZip}
                                                  onChange={(e) => setShipZip(e.target.value)}/>
                                </Form.Group>
                            </Row>
                            <Form.Group>
                                <Form.Label><h2>Billing information</h2></Form.Label>
                            </Form.Group>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Credit Card Number</Form.Label>
                                    <Form.Control placeholder="FAKE CARD #, DO NOT USE REAL PAYMENT"
                                                  value={ccNumber}
                                                  onChange={(e) => setCCNumber(e.target.value)}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className='mt-2'>CVV Code</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="FAKE CVV"
                                                  value={cvvCode}
                                                  onChange={(e) => setCVVCode(e.target.value)}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className='mt-2'>Zip Code</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Zip code"
                                                  value={billZip}
                                                  onChange={(e) => setBillZip(e.target.value)}/>
                                </Form.Group>
                            </Row>
                            <div>
                                {!fName | !lName | !shipAddress | !shipCity | !shipState | !ccNumber | !cvvCode | !billZip ?
                                    <Row className='px-2'>
                                        <Button type='submit'
                                                className='paymentBtn'
                                                disabled={!fName | !lName | !shipAddress | !shipCity | !shipState | !ccNumber | !cvvCode | !billZip}
                                                onClick={() => sendOrderHistory(currentUser.id, totalSum)}>
                                            Place order</Button>
                                    </Row>
                                    :
                                    <Row>
                                        <div className='d-block'>
                                            <Link to='/shop/cart/confirmation'>
                                                <Button type='submit'
                                                        className='paymentBtn'
                                                        onClick={() => sendOrderHistory(currentUser.id, totalSum)}>
                                                    Place order</Button>
                                            </Link>
                                        </div>
                                    </Row>}
                            </div>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    </>
}

function mapStateToProps(state) {
    return {
        cartItems: state.cartReducer.cartItems,
        currentUser: state.userReducer.currentUser,
        activeCoupons: state.discountReducer.activeCoupons
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({sendOrderHistory, initiateGetActiveCoupons}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);

